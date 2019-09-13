import Vue from 'vue';
import axiosPlugin from 'axios';

Vue.prototype.$axios=()=>{
    axiosPlugin.create({
        baseURL:`http://localhost:3000/api`
    });
}
