<template>
  <div class="lg:px-16 px-6 py-4">
    <div class="follow-wrapper w-full" v-if="following && following.length>0">
      <div v-for="(user,index) in following" :key="user._id" class="relative follow w-full my-3">
        <img
          :src="user.profileImageURL"
          alt="User Profile Image"
          class="w-16 h-16 rounded-full mx-auto"
        />
        <h6 class="info-title">{{user.name}}</h6>
        <p class="info-subtitle">@{{user.username}}</p>
        <div
          class="rounded-sm text-white py-1 bg-black my-2 cursor-pointer"
          @click="unFollow(user._id,index)"
        >Unfollow</div>
      </div>
    </div>
    <div v-else>
      <p>Not Following Anyone Yet</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      following: []
    };
  },
  created() {
    this.following = this.$store.state.user.following;
  },
  methods: {
    async unFollow(followUserId, index) {
      const result = await this.$store.dispatch("followUser", {
        followUserId,
        user: this.$store.state.user._id
      });
      // this.$store.commit("unFollowUser", result);
      this.$store.commit("unfollowUser", index);
    }
  }
};
</script>