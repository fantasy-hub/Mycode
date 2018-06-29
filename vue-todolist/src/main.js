import Vue from 'vue'
import App from './App.vue'
import AV from 'leancloud-storage'

var APP_ID = 'vhWbPkYgAIof0ll7XLiWoXpU-gzGzoHsz';
var APP_KEY = '5lDmKMG2sAUuamLMLza37lpL';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

Vue.filter('normalTime', function (t) {
  let time = new Date(t);
  let yy = time.getFullYear(),
      mm = time.getMonth() + 1,
      dd = time.getDate(),
      hh = time.getHours(),
      ms = time.getMinutes(),
      sc = time.getSeconds(),
      dt = [];
  dt.push(yy, mm, dd, hh, ms, sc);
  for (var i = 0; i < dt.length; i++) {
    if (dt[i] < 10) {
      dt[i] = '0' + dt[i]
    }
  }
  let tpl = dt[0] + '.' + dt[1] + '.' + dt[2] + '. ' + dt[3] + ':' + dt[4] + ':' + dt[5];
  return tpl;
});

new Vue({
  el: '#app',
  render: h => h(App)
});