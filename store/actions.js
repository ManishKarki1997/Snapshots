const action = {
    fetchSnapshots({
        commit
    }, payload) {
        this.$axios.$get('/snap?pageSize=1?pageNumber=1').then(res => {
            commit('setInitialSnapshots', res);
        })
    },
    login({
        commit
    }, payload) {
        return this.$axios.$post('/user/login', payload);
    },
    followUser({
        commit,
        state
    }, payload) {
        return this.$axios.$post('/user/follow', payload, {
            headers: {
                "auth-token": state.token
            }
        });
    },
    deleteSnap({
        commit,
        state
    }, snapId) {
        commit('deleteSnap', snapId);
        return this.$axios.$delete(`/snap/${snapId}`, {
            headers: {
                "auth-token": state.token
            }
        })
    }

}

export default action