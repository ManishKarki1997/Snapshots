<template>
  <div class="lg:mt-12 mt-8">
    <div class="follow-wrapper" v-if="followers && followers.length>0">
      <div v-for="user in followers" :key="user._id" class="lg:mr-6 relative follow">
        <img
          :src="user.profileImageURL"
          alt="User Profile Image"
          class="w-16 h-16 rounded-full mx-auto"
        />
        <h6 class="info-title">{{user.name}}</h6>
        <p class="info-subtitle">@{{user.username}}</p>
      </div>
    </div>
    <div v-else>
      <p>No Followers Yet</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      followers: []
    };
  },
  created() {
    this.followers = this.$store.state.user.followers;
    console.log(this.$store.state.user.followers);
  }
};
</script>