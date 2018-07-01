import {INCRE} from './types.js'

import getters from './getters.js'

const state = {
    count: 20
}

const mutations = {
    //[] 变量是方括号
    [INCRE](state){
        state.count++;
    }
}

export default {
    state,
    mutations,
    getters
}