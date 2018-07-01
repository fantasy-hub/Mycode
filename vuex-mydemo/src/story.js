import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//数据
var state = {
    count: 10
}

//commit提交的内容，传入mutations中。mutations主要处理数据变化
const mutations = {
    incre(state){
        state.count++;
    },
    decre(state){
        state.count--;
    }
}

//actions 处理要做的事情，异步请求、判断、流程控制
const actions = {
    incre: ({commit})=>{
        commit('incre')  //提交 增加
    },
    decre: ({commit})=>{
        commit('decre')
    },
    clickOdd: ({commit,state})=>{
        if(state.count%2 == 0){
            commit('incre')
        }
    },
    clickAsync: ({commit})=>{
        new Promise((resolve)=>{
            setTimeout(function(){
                commit('decre');
                // resolve();
            }, 2000);
        });
    }
}

const getters = {
    count(state){
        return  state.count;
    }
}

//导出Store对象
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})