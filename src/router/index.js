import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Employee',
    component: () => import('../components/views/Content.vue')
   },
   {
    path: '/customer',
    name: 'Customer',
    component: () => import('../components/HelloWorld.vue')
   }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
