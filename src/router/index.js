import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      name:'Validator',
      path:'/validator',
      component:() => import('@/views/validator/Index.vue')
    }
  ]
})

export default router