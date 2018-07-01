<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

    <input type="button" value="增加" @click="incre">
    <input type="button" value="减少" @click="decre">
    <input type="button" value="偶数才能点击增加" @click="clickOdd">
    <input type="button" value="异步请求" @click="clickAsync">
    <hr>
    <div>现在的数字：{{count}}
    </div>
  </div>
</template>

<script>
//引入vuex的方法
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: mapActions([
    'incre',  //传到store.js文件 actions中
    'decre',
    'clickOdd',
    'clickAsync'
  ]),
  computed: mapGetters([
    'count'
  ])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
