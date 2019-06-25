// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('jwt');
  console.log(token)
  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading:"/static/loading-svg/loading-bars.svg"
})
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
