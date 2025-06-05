import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../views/Posts.vue'
import Users from '../views/Users.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/user/:id',
      name: 'UserEdit',
      component: () => import('../views/UserEdit.vue')
    }
  ]
})

export default router 