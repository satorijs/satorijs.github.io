import { resolve } from 'path'
import { DefaultTheme, defineConfig } from 'vitepress'

const sidebar: DefaultTheme.SidebarItem[] = [{
  text: 'Protocol',
  items: [
    { text: 'Overview', link: '/protocol/index.md' },
  ],
}, {
  text: 'Resources',
  items: [
    { text: 'Channel', link: '/resources/channel.md' },
    { text: 'Guild', link: '/resources/guild.md' },
    { text: 'Guild Member', link: '/resources/member.md' },
    { text: 'Guild Role', link: '/resources/role.md' },
    { text: 'Message', link: '/resources/message.md' },
    { text: 'Reaction', link: '/resources/reaction.md' },
    { text: 'User', link: '/resources/user.md' },
  ],
}]

export default defineConfig({
  title: 'Satori',
  description: 'The Universal Messenger Protocol',

  themeConfig: {
    editLink: {
      text: '在 GitHub 编辑此页面',
      pattern: 'https://github.com/satorijs/satorijs.github.io/edit/main/docs/:path',
    },
    nav: [
      { text: 'Protocol', link: '/protocol/', activeMatch: '^/(protocol|resources)/' },
    ],
    sidebar: {
      '/protocol/': sidebar,
      '/resources/': sidebar,
    },
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/satorijs',
    }],
  },

  vite: {
    resolve: {
      dedupe: ['vue'],
      alias: {
        '@theme-default': 'vitepress/dist/client/theme-default',
        './VPHome.vue': resolve(__dirname, 'theme/VPHome.vue'),
      },
    },
  },
})
