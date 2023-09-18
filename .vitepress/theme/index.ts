import { defineTheme } from '@koishijs/vitepress/client'
import { defineAsyncComponent } from 'vue'

export default defineTheme({
  layouts: {
    home: defineAsyncComponent(() => import('./VPHome.vue')),
  },
})
