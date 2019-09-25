<template>
  <div class="lg:px-16 lg:py-8 px-6 py-4 flex flex-col">
    <h6 class="text-xl mb-3" v-if="users && users.length>0">Users</h6>
    <div class="w-full flex justify-between lg:px-4 px-2 text-center mb-8 user-wrapper">
      <div v-for="(user,index) in users" :key="user._id" class="user">
        <img
          :src="user.profileImageURL"
          alt="User Profile Image"
          class="w-12 h-12 rounded-full mx-auto"
        />
        <h6 class="info-title">{{user.name}}</h6>
        <p class="info-subtitle">@{{user.username}}</p>
        <button class="primary-button mt-2" @click="followUser(user._id,index)">Follow</button>
      </div>
    </div>
    <h6 class="text-xl mb-1" v-if="snapshots && snapshots.length>0">Snapshots</h6>
    <div class="discover-grid w-full">
      <div v-for="snapshot in snapshots" :key="snapshot._id" class="discover-grid-item">
        <div class="discover-grid-item-image-wrapper relative">
          <img :src="snapshot.imageURL" alt="snapshot" />
          <div class="grid-item-overlay cursor-pointer" @click="viewImage(snapshot._id)">
            <h6 class="text-white">{{snapshot.title}}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../plugins/sweetalert";

export default {
  data() {
    return {
      pageNumber: 1,
      snapshots: [],
      users: []
    };
  },
  methods: {
    viewImage(snapId) {
      this.$router.push(`/snap/${snapId}`);
    },
    async followUser(followUserId, index) {
      const result = await this.$store.dispatch("followUser", {
        followUserId,
        user: this.$store.state.user._id
      });
      if (!result.error) {
        this.$store.commit("followUser", result);
        Toast.fire({
          type: "success",
          title: "You're following the user now."
        });
      } else {
        Toast.fire({
          type: "error",
          title: result.errorLog
        });
      }
      this.$delete(this.users, index);
    }
  },

  async created() {
    const data = await this.$axios.$get(
      `/discover?pageNumber=${this.pageNumber}`
    );
    this.snapshots = data.snaps;
    // Do not display the logged in user in the discover page
    this.users = data.users.filter(
      user => user._id != this.$store.state.user._id
    );
  }
};
</script>