import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
require('@/mock/index.js')
// declare let JQuery: (selector: string) => any
// JQuery('#app')

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
