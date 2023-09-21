import { defineTheme } from '@koishijs/vitepress/client'
import { defineAsyncComponent } from 'vue'

import './index.scss'

export default defineTheme({
  layouts: {
    home: defineAsyncComponent(() => import('./VPHome.vue')),
  },
})
