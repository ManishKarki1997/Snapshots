<template>
  <div class="lg:px-16 px-6 py-4 flex justify-center items-center">
    <div class="gallery-item lg:w-8/12 w-full">
      <div class="gallery-item-image-wrapper relative">
        <img class="rounded" :src="snapshot.imageURL" alt="snapshot" />
        <div class="gallery-item-overlay">
          <h6 class="text-white">{{snapshot.title}}</h6>
        </div>
      </div>
      <div class="gallery-item-info py-1 lg:flex lg:justify-between">
        <div class="flex mr-2" v-if="snapshot.user">
          <img class="w-8 h-8 rounded-full mr-2" :src="snapshot.user.profileImageURL" alt />
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
          <div class="flex items-center" v-if="snapshot.comments">
            <i class="far fa-comments cursor-pointer mr-1"></i>
            <p>{{snapshot.comments.length}}</p>
          </div>
        </div>
      </div>
      <form class="mt-8" action="#" @submit.prevent="commentOnPost(snapshot._id)">
        <div class="flex flex-col">
          <label for="comment">Comment</label>
          <input
            class="mt-2 rounded-sm shadow px-2 py-1 w-full"
            type="text"
            name="comment"
            id="comment"
            v-model="comment"
            placeholder="Type Something..."
          />
        </div>
      </form>
      <div class="mt-8">
        <div v-for="comment in snapshot.comments" :key="comment._id" class="flex">
          <div class="flex mr-8 mb-4 items-center">
            <img
              class="rounded-full h-8 w-8 mr-2"
              :src="comment.user.profileImageURL"
              alt="Profile Image"
            />
            <p>{{comment.user.name}}</p>
          </div>
          <h6 class="text-gray-700 mt-1">{{comment.comment}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snapshot: {},
      isLiked: false,
      comment: ""
    };
  },
  methods: {
    async fetchSnapshot() {
      const result = await this.$axios.$get(`/snap/${this.$route.params.id}`);
      this.snapshot = result;
      this.isLiked =
        result.likers.indexOf(this.$store.state.user._id) > -1 ? true : false;
    },
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
        this.snapshot.likes = result.likes;
        this.isLiked = !result.likers.indexOf(this.$store.state.user._id);
        this.$forceUpdate();
      }
    },
    async commentOnPost(snapId) {
      const result = await this.$axios.$post(
        "/comment",
        {
          comment: this.comment,
          snapId
        },
        {
          headers: { "auth-token": this.$store.state.token }
        }
      );
      this.snapshot.comments.push(result);
      this.comment = "";
      this.$forceUpdate();
    }
  },
  created() {
    this.fetchSnapshot();
  }
};
</script>
<style scoped>
.gallery-item .gallery-item-image-wrapper {
  height: 28rem;
}
.snapLiked {
  color: rgb(250, 79, 0);
}
</style>