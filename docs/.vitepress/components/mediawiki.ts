import requests from './requests';
import { dict, isString, isNumber } from './util';
import { toFormData } from 'axios';
import * as http from 'http';
import * as https from 'https';

export interface WikiSMTPConfig {
  host: string,
  bot?: {
    username?: string,
    password?: string
  },
  ua?: string
}

export interface MediaWikiStatus {
  status: number,
  message: string,
}

export class MediaWiki {
  private host: string;
  private username: string;
  private password: string;
  private ua: string;

  private initialized = false; // 是否初始化
  private site: dict = {}; // 站点信息
  private namespaces: dict = {}; // 命名空间
  private writeapi: boolean = false; // 是否有写api
  private cookies = '';

  private tokens: dict = {}; // 令牌
  private groups = []; // 组
  private rights: string[] = []; // 权限
  private block: object | boolean = false;
  private hasmsg: boolean = false;
  public logged_in: boolean = false; // 是否登录

  private httpsAgent: https.Agent | null = null;

  constructor(config: WikiSMTPConfig) {
    this.host = config.host;
    this.ua = config.ua || '';
    this.username = config.bot!.username || '';
    this.password = config.bot!.password || '';
  }

  public async login() {
    const args: dict = {
      lgname: this.username,
      lgpassword: this.password,
      lgdomain: this.host
    };
    args['lgtoken'] = await this.get_token('login');

    let res = await this.post('login', args);
    if (res['login']['result'] === 'NeedToken') {
      args['lgtoken'] = res['login']['token'];
      res = await this.post('login', args);
    }
    if (res['login']['result'] !== 'Success') {
      console.log(res['login']['result'] + ", " + res['login']['reason']);
      if (res['login']['result'] == 'Failed') {
        let reason = res['login']['reason'];
        if (reason == 'Unable to continue login. Your session most likely timed out.') {
          reason = '无法继续登录, 你的会话很可能超时.';
        }
        if (reason == 'Incorrect username or password entered. Please try again.') {
          reason = '账号或密码错误, 请确认后重试';
        }
        console.error(`登录失败 ${reason}`);
      }
    }
    await this.site_init();
  }

  public getPage(name: string) {
    return new this.Page(this, name);
  }

  public static strip_namespace(title: string): string {
    if (title.substring(0, 1) === ':') {
      title = title.substring(1);
    }
    return title.substring(title.indexOf(':') + 1);
  }

  private Page = class {
    private site: MediaWiki;
    public name: string | number;
    public _info: dict = {};
    public namespace: number = 0;
    public page_title: string = '';
    public base_title: string = '';
    public base_name: string = '';

    public redirect: boolean = false; //是否是重定向页面
    public exists: boolean = false;
    public protection: dict = {};
    public pageid: number | null = null;
    public contentmodel: string = 'null';
    public restrictiontypes = [];
    public length = 0;

    constructor(site: MediaWiki, name: number | string) {
      this.site = site;
      this.name = name;
    }

    async initialize() {
      let info: dict;
      if (isNumber(this.name)) {
        info = await this.site.get('query', {
          prop: 'info',
          pageids: this.name,
          inprop: 'protection',
        });
      } else {
        info = await this.site.get('query', {
          prop: 'info',
          titles: this.name,
          inprop: 'protection',
        });
      }
      info = info['query']['pages']
      info = Object.values(info)[0];
      this._info = info;
      // console.log(info);

      if ('invalid' in info) {
        raise(info['invalidreason']);
      }
      this.namespace = info['ns'] || 0;
      this.name = info['title'] || '';
      if (this.namespace) {
        this.page_title = MediaWiki.strip_namespace(String(this.name));
      } else {
        this.page_title = String(this.name);
      }
      this.base_title = this.page_title.split('/')[0];
      this.base_name = String(this.name).split('/')[0]

      // console.log(info);
      this.exists = !('missing' in info);
      this.redirect = 'redirect' in info;

      let protection: dict = {};
      for (const i in info['protection']) {
        let v: dict = info['protection'][i];
        if (v) {
          protection[v['type']] = [v['level'], v['expiry']];
        }
      }
      this.protection = protection;
      this.restrictiontypes = info['restrictiontypes'];

      this.pageid = info['pageid'] || null;
      this.contentmodel = info['contentmodel'] || '';
      this.length = info['length'] || 0;
    }

    public can(action: string) {
      let level: string = (this.protection[action] || [action])[0];
      if (level == 'sysop') {
        level = 'editprotected'
      }
      return this.site.rights.indexOf(level) !== -1;
    }

    public async text(): Promise<string> {
      if (!this.can('read')) {
        raise('页面读取错误: 无 read 权限');
      }
      if (!this.exists) {
        return '';
      }

      let revs = await this.site.get('query', {
        titles: this.name,
        prop: 'revisions',
        rvprop: 'content|timestamp',
        rvlimit: 1,
        rvslots: 'main',
        rvdir: 'older',
        rvstart: (new Date()).toISOString(),
      });
      // console.log(revs);
      try {
        revs = Object.values(revs['query']['pages'] as object)[0]['revisions'];
        return revs[0]['slots']['main']['*'];
      } catch (e) {
        raise('获取页面内容失败');
        return '';
      }
    }
    
  }

  public async site_init(): Promise<void> {
    if (this.initialized === true) {
      let info = await this.get('query', {
        meta: 'userinfo',
        uiprop: 'groups|rights',
      })
      let userinfo: dict = info['query']['userinfo'];
      this.logged_in = !('anon' in userinfo);
      this.groups = userinfo['groups'] || [];
      this.rights = userinfo['rights'] || [];
      this.tokens = {};
      return;
    }

    let meta = await this.get('query', {
      meta: 'siteinfo|userinfo',
      siprop: 'general|namespaces',
      uiprop: 'groups|rights',
    })
    this.site = meta['query']['general'];
    let namespaces = meta['query']['namespaces'];
    for (const k in namespaces) {
      const n = namespaces[k];
      this.namespaces[n['id']] = n['*'];
    }
    this.writeapi = 'writeapi' in this.site;

    // User info
    let userinfo = meta['query']['userinfo'];
    this.logged_in = !('anon' in userinfo);
    this.groups = userinfo['groups'] || [];
    this.rights = userinfo['rights'] || [];
    this.initialized = true;
  }

  private async get_token(type: string, force?: boolean) {
    if (['watch', 'patrol', 'rollback', 'userrights', 'login'].indexOf(type) === -1) {
      type = 'csrf';
    }
    if (this.tokens[type] === undefined || force) {
      const res = await this.raw_api('query', 'GET', {
        meta: 'tokens',
        type: type
      });
      this.handle_api_result(res);
      this.tokens[type] = res['query']['tokens'][type + 'token'];
    }
    return this.tokens[type];
  }

  private async post(action: string, args = {}): Promise<dict> {
    return await this.api(action, 'POST', args);
  }

  private async get(action: string, args = {}): Promise<dict> {
    return await this.api(action, 'GET', args);
  }

  private async api(action: string, http_method?: string, args: dict = {}): Promise<dict> {
    if (action === 'query' && !('continue' in args)) {
      args['continue'] = '';
    }

    if (action === 'query') {
      if ('meta' in args) {
        args['meta'] += '|userinfo';
      } else {
        args['meta'] = 'userinfo';
      }
      if ('uiprop' in args) {
        args['uiprop'] += '|blockinfo|hasmsg';
      } else {
        args['uiprop'] = 'blockinfo|hasmsg';
      }
    }

    let info = await this.raw_api(action, http_method, args);
    if (!info) {
      info = {};
    }
    this.handle_api_result(info);
    return info;
  }

  private handle_api_result(info: dict) {
    if (!info['query']) {
      return;
    }
    const userinfo = info['query']['userinfo'];
    if (userinfo) {
      if ('blockedby' in userinfo) {
        this.block = {
          blockedby: userinfo['blockedby'],
          blockreason: userinfo['blockreason']
        };
      }
      this.hasmsg = 'messages' in userinfo;
      this.logged_in = !('anon' in userinfo);
    }
    if ('warnings' in info) {
      console.log(`warnings: ${userinfo['warnings']}`);
      // for (const warning in info['warnings']) {
      //   console.log(warning, )
      //   if ("*" in info['warnings'][warning]) {
      //     console.warn(info['warnings'][warning]['*']);
      //   }
      // }
    }
    if ('error' in info) {
      throw Error(`API错误: ${userinfo['error']}`);
    }
  }

  private async raw_api(action: string, http_method?: string, args: dict = {}): Promise<dict> {
    args['action'] = action;
    args['format'] = 'json';
    return await this.raw_call('api', args, http_method);
  }

  private async raw_call(script: string, data: dict, http_method?: string): Promise<dict> {
    if (http_method === undefined) {
      http_method = 'POST';
    }
    let headers: dict = {
      "Host": this.host,
      "Content-Type": "multipart/form-data;",
      "User-Agent": this.ua,
      "Connection": 'keep-alive',
      "Accept-Encoding": "gzip, deflate, br",
    };
    if (this.cookies !== '') {
      headers.cookie = this.cookies;
    }

    let params: dict = {}
    if (http_method == 'GET') {
      params = data;
      data = {};
    }
    if (this.httpsAgent === null) {
      this.httpsAgent = new https.Agent({
        keepAlive: true,
        timeout: 60000,
      });
    }

    const url = 'https://' + this.host + '/' + script + '.php';
    return await requests.request({
      url: url,
      method: http_method,
      headers: headers,
      params: params,
      data: toFormData(data),
      httpsAgent: this.httpsAgent,
      auth: {
        username: this.username,
        password: this.password
      }
    }).then((r) => {
      if (r.status === 200) {
        // console.log(r.request);
        if (isString(r.data)) {
          if (r.data.indexOf('MediaWiki API is not enabled for this site.') !== -1) {
            raise('这个站点未启用 MediaWiki API');
          }
          raise('无法获取有效的json数据');
        }
        let cookies = this.cookies;
        for (const i in r.request.res.headers['set-cookie']) {
          cookies += r.request.res.headers['set-cookie'][i].split(';')[0] + '; ';
        }
        this.cookies = cookies;
        return r.data;
      }
      raise(http_method + ' [' + r.status + ']: ' + r.statusText);
    });
  }

}
