import { defineTheme } from '@cordisjs/vitepress/client'
import Home from './VPHome.vue'

import './index.scss'

export default defineTheme({
  layouts: {
    home: Home,
  },
})
