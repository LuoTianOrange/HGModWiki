import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "皓际大冒险Mod教程",
  base: "/HGModWiki/",
  description: "A VitePress Site",
  head: [
    [
      "meta",
      {
        name:"referrer",
        content:"no-referrer"
      }
    ],
  ],
  themeConfig: {
    sidebar: 'auto',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '开始', link: '/介绍/什么是MOD' },
      { text: '基础内容', link: '/了解参数' },
      { text: '小工具', link: '/JSON快速制作器' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是MOD', link: '/介绍/什么是MOD' },
          { text: '快速入门', link: '/介绍/快速入门' }
        ]
      },
      {
        text: '基础内容',
        items: [
          { text: '了解参数', link: '/基础内容/了解参数' },
          { text: '多物品', link: '/基础内容/多物品' },
          { text: '自定义弹幕', link: '/基础内容/自定义弹幕' },
          { text: '异常处理', link: '/基础内容/异常处理' },
        ]
      },
      // {
      //   text: '进阶内容',
      //   items: [

      //   ]
      // },
      {
        text: '小工具',
        items: [
          { text: 'JSON快速制作器', items: [
            { text: 'CM', link: '/小工具/JSON快速制作器/CM' },
            { text: 'WSITEM', link: '/小工具/JSON快速制作器/WSITEM'},
            { text: 'WSAMMO', link: '/小工具/JSON快速制作器/WSAMMO'},
          ] },
          { text: '物品大分类ID', link: '/小工具/物品大分类ID' },
          { text: '武器小分类ID', link: '/小工具/武器小分类ID' },
          { text: '建筑小分类ID', link: '/小工具/建筑小分类ID' },
          { text: '伤害类型ID', link: '/小工具/伤害类型ID' },
          { text: '弹幕ID', link: '/小工具/弹幕ID' },
          { text: '物品ID', link: '/小工具/物品ID' },
          { text: '工作站ID', link: '/小工具/工作站ID' },
          { text: '随机生成器', link: '/小工具/随机生成器' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LuoTianOrange/HGModWiki' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 200 200"><defs><style>.cls-1 {fill: #67676c;fill-rule: evenodd;}</style></defs><path id="形状_316_1" data-name="形状 316 1" class="cls-1" d="M71.429,3L179.592,19.108,0,190.926ZM186.735,23.4Q193.367,75.481,200,127.568L9.184,192l6.122-7.517Z" /></svg>',
        },
        link: 'https://hgadventure.huijiwiki.com/wiki/',
        ariaLabel: 'cool link'
      }
    ]
  }
})
