import { viteBundler } from 'vuepress'
import theme from './theme'

module.exports = {
  base: '/',
  title: 'Satori',

  theme: theme({
    navbar: [{
      text: 'API',
      link: '/api/',
    }],

    sidebar: {
      '/api/': [{
        text: 'Overview',
        link: '/api/',
      }, {
        text: 'Core API',
        children: [
          '/api/bot.md',
          '/api/adapter.md',
          '/api/session.md',
          '/api/events.md',
        ],
      }],
    },

    docsRepo: 'satorijs/satori',
    docsDir: 'docs',
    editLinkText: '帮助我们改善此页面',
    contributors: false,
  }),

  bundler: viteBundler({
    viteOptions: {
      server: {
        fs: {
          strict: false,
        },
      },
    },
  }),
}
