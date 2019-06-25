import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList';
import Cart from '../views/Cart';
Vue.use(Router)

const router = new Router({
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
      meta: {
        requireAuth: true
      },
      component: Cart
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireAuth)) {
//     console.log(localStorage.getItem('jwt'))
    // if (localStorage.getItem('jwt')) {
    //   next()
    // } else {
    //   next({path:'/'})
    // }
//   }
// })
export default router;
