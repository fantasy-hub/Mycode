import Vue from 'vue'
import App from './App.vue'
import store from './store'  //从main中引入核心文件store.js

new Vue({
  store,  //store:store，挂载到Vue身上，创建的Vue的实例拥有store的方法
  el: '#app',
  render: h => h(App)
})
