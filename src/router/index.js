import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList';
import Cart from '../views/Cart';
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
      // children:[
      //   {
      //     path:'title',
      //     component: Title
      //   },
      //   {
      //     path: 'img',
      //     component: Image
      //   }
      // ]
    },
    {
      path:'/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
