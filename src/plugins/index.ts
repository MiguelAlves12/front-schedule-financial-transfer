/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'

// Types
import type { App } from 'vue'
import { createPinia } from 'pinia'
import router from '@/routers'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function registerPlugins (app: App) {
  const pinia = createPinia()
  app.use(VueSweetalert2)
  app.use(vuetify)
  app.use(pinia)
  app.use(router)
}
