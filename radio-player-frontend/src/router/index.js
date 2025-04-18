import { createRouter, createWebHistory } from 'vue-router'
import RadioView from '@/views/RadioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RadioView,
    },
  ],
})

export default router
