import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
    state:{
        count:10
    },
    getters:{
        getCount(state)
        {
            return state.count > 0 ? state.count : "count值有问题"
        }
    },
    mutations:{
        addCount(state,num)
        {
            state.count+=num
        }
    },
    actions:{
        //网络请求



    }
})