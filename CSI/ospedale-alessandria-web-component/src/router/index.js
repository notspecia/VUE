import { createRouter, createWebHistory } from 'vue-router'
import CounterPage from '@/views/CounterPage.vue'
import TestPage from '@/views/TestPage.vue'

// ROUTING USATO SOLO IN APP.VUE NON NEI WEB COMPONENT IN Sè
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CounterPage
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage
    }
  ]
})

export default router
