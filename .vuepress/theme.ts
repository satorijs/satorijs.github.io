import type { Theme } from '@vuepress/core'
import { defaultTheme } from '@vuepress/theme-default'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import zoom from '@vuepress/plugin-medium-zoom'

export default (options: DefaultThemeOptions): Theme => ({
  name: 'vuepress-theme-local',
  extends: defaultTheme(options),

  layouts: {
    Layout: require.resolve('./layouts/Layout.vue'),
  },

  plugins: [
    zoom({
      selector: '.theme-default-content :not(a) > img:not(.no-zooming)',
    }),
  ],
})
