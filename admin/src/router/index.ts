import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { getToken } from '@/api/request'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    public?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: () => import('@/views/login/index.vue'), meta: { title: '登录', public: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({ history: createWebHashHistory(), routes })

router.beforeEach((to) => {
  const token = getToken()
  if (to.meta.public) {
    if (token && to.name === 'login') return { path: '/dashboard' }
    return true
  }
  if (!token) return { path: '/login', query: { redirect: to.fullPath } }
  return true
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - 校园活动管理后台` : '校园活动管理后台'
})

export default router
