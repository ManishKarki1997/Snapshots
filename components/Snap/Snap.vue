<template>
  <div :class="view">
    <div class="gallery-item-image-wrapper relative">
      <img class="rounded" :src="snapshot.imageURL" alt="snapshot" />
      <div class="gallery-item-overlay" @click="viewSnapshot(snapshot._id)">
        <h6 class="text-white">{{snapshot.title}}</h6>
      </div>
    </div>
    <div class="gallery-item-info py-1 flex justify-between">
      <div class="flex mr-2">
        <img
          class="w-8 h-8 rounded-full mr-2"
          :src="snapshot.user.profileImageURL"
          alt="User Profile"
        />
        <h6>{{snapshot.user.name}}</h6>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-2">
          <i
            :class="{snapLiked:isLiked}"
            class="far fa-heart cursor-pointer mr-1"
            @click="likeSnap(snapshot._id)"
          ></i>
          <p>{{snapshot.likes}}</p>
        </div>
        <div class="flex items-center">
          <i class="far fa-comments cursor-pointer mr-1" @click="viewSnapshot(snapshot._id)"></i>
          <p>{{snapshot.comments.length}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../../plugins/sweetalert";

export default {
  props: ["snapshot", "index", "hasLiked", "view"],
  data() {
    return {
      isLiked: this.$props.hasLiked
    };
  },
  methods: {
    async likeSnap(snapId) {
      if (!this.$store.state.isLoggedIn) {
        return Toast.fire({
          type: "error",
          title: "You must be logged in to like the snapshot"
        });
      }
      const result = await this.$axios.$post(
        "/snap/like",
        { snapId },
        {
          headers: { "auth-token": this.$store.state.token }
        }
      );
      if (result.error) {
        Toast.fire({
          type: "error",
          title: result.errorLog
        });
      } else {
        this.$props.snapshot.likes = result.likes;
        this.isLiked = !result.likers.indexOf(this.$store.state.user._id);
        this.$forceUpdate();
      }
    },
    viewSnapshot(snapId) {
      this.$router.push(`/snap/${snapId}`);
    }
  }
};
</script>

<style  scoped>
.snapLiked {
  color: rgb(250, 79, 0);
}
</style>