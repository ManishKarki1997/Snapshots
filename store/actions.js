const action = {
    fetchSnapshots({ commit }, payload) {
        this.$axios.$get('http://localhost:3000/api/snap?pageSize=1?pageNumber=1').then(res => {
            commit('setInitialSnapshots', res);
        })
    },
    login({ commit }, payload) {
        return this.$axios.$post('/user/login', payload);
    },

}

export default action