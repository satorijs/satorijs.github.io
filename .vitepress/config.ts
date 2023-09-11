import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Satori Protocol',
  description: 'The Universal Messenger Protocol',

  themeConfig: {
    editLink: {
      text: '在 GitHub 编辑此页面',
      pattern: 'https://github.com/satorijs/satorijs.github.io/edit/main/docs/:path',
    },
    nav: [
      { text: 'API', link: '/api/' }
    ],
    sidebar: {
      '/api/': [{
        text: 'API',
        items: [
          { text: 'Overview', link: '/api/' },
          { text: 'Adapter', link: '/api/adapter.md' },
          { text: 'Bot', link: '/api/bot.md' },
          { text: 'Events', link: '/api/events.md' },
          { text: 'Session', link: '/api/session.md' },
        ]
      }]
    },
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/satorijs',
    }],
  },
})
