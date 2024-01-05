import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VitePressTest",
  base: "/HGModWiki/",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '开始', link: '/什么是MOD' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是MOD', link: '/什么是MOD' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
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
