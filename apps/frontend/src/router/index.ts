import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('auth_token')
  if (to.name === 'dashboard' && !token) return { name: 'login' }
  if (to.name === 'login' && token) return { name: 'dashboard' }
})

export default router
