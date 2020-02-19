import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Print',
    component: () => import('@/views/Print.vue')
  },
  {
    path: '/code',
    name: 'Code',
    component: () => import('@/views/Print.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/Help.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/Feedback.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue'),
    meta: {
      requireLevel: 1
    }
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/System.vue'),
    meta: {
      requireLevel: 9
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireLevel) {
    if(store.state.user.level >= to.meta.requireLevel)
      next()
    else
      next({
        path: "/"
      })
  } else next()
})

export default router
