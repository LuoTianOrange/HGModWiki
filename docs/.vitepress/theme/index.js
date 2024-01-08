// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import './custom.css';
import "element-plus/dist/index.css";
import elementplus from "element-plus"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueClipboard from 'vue-clipboard2'
import FromTojson from "../components/FromTojson.vue"
export default {
    ...DefaultTheme,
    enhanceApp: async ({ app, router, siteData }) => {
        // app is the Vue 3 app instance from `createApp()`. router is VitePress'
        // custom router. `siteData`` is a `ref`` of current site-level metadata.
        app.use(elementplus);
        app.use(VueClipboard);
        app.use(ElementPlusIconsVue);
        app.component('FromTojson', FromTojson)
    },
};
