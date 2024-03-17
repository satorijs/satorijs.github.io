import { defineConfig } from '@cordisjs/vitepress'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'

export default defineConfig({
  title: 'Satori',
  description: 'The Universal Messenger Protocol',

  locales: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },

  themeConfig: {
    socialLinks: {
      github: 'https://github.com/satorijs',
    },
  },
})
