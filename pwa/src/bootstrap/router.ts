import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../screens/Home.vue'),
  },
  {
    path: '/birds',
    name: 'Birds',
    component: () => import('../screens/Birds.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ClientError',
    component: () => import('../screens/generic/ClientError.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
