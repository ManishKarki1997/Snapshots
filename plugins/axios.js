import Vue from 'vue';
import axiosPlugin from 'axios';

Vue.prototype.$axios = () => {
    axiosPlugin.create({
        baseURL: `https://snapshots-api.manishkarki247.now.sh/api`
    });
}