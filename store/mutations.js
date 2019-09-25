import Vue from 'vue'
const mutation = {
    setInitialSnapshots(state, payload) {
        state.snapshots = payload;
    },
    setUser(state, payload) {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
    },
    logOut(state, payload) {
        state.user = {};
        state.token = "";
        state.isLoggedIn = false;
    },
    changeMode(state, payload) {
        state.viewMode = payload;
    },
    postCreated(state, payload) {
        state.user.snaps.push(payload);
    },
    followUser(state, payload) {
        state.user.following.push(payload);
    },
    unfollowUser(state, payload) {
        Vue.delete(state.user.following, payload);
    },
    deleteSnap(state, payload) {
        state.user.snaps = state.user.snaps.filter(snap => snap._id != payload);

    }

}

export default mutation