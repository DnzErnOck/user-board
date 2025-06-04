import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users.vue')
    },
    {
        path: '/user/:id',
        name: 'UserEdit',
        component: () => import('../views/UserEdit.vue')
      }
      
  ]
})

export default router 