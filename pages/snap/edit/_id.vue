<template>
  <div class="lg:px-16 py-2 px-6">
    <form action="#" @submit.prevent="post" class="w-full lg:mt-4 mt-2">
      <div class="flex flex-col mb-4">
        <label for="title">Title</label>
        <input
          class="rounded-sm shadow lg:w-2/6 px-2 py-1 w-full"
          type="text"
          name="title"
          id="title"
          v-model="snapshot.title"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="snapshot">Snapshot</label>
        <input type="file" name="snapshot" id="snapshot" @change="onFileChanged" />
      </div>
      <div class="flex items-center w-full">
        <input :disabled="isPosting" class="primary-button mr-4" type="submit" value="Post" />
        <img v-if="isPosting" class="h-6 w-6" src="/Images/5.gif" alt="Loading Bar" />
      </div>
    </form>
  </div>
</template>

<script>
import Toast from "../../../plugins/sweetalert";

export default {
  data() {
    return {
      isLiked: false,
      creatorHimself: false,
      snapshot: {
        title: "",
        imageURL: "",
        snapId: ""
      },
      image: null,
      isPosting: false
    };
  },
  methods: {
    async fetchSnapshot() {
      this.snapshot.snapId = this.$route.params.id;
      const result = await this.$axios.$get(`/snap/${this.$route.params.id}`);
      this.snapshot.title = result.title;
      this.isLiked =
        result.likers.indexOf(this.$store.state.user._id) > -1 ? true : false;
      this.creatorHimself = result.user._id === this.$store.state.user._id;
    },
    onFileChanged(event) {
      this.image = event.target.files[0];
    },
    async post() {
      if (this.snapshot.title === "" || this.image == null) {
        return this.throwErrorMessage("Please fill in all fields");
      }
      this.isPosting = true;
      let formData = new FormData();
      formData.append("file", this.image);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      const savedImage = await this.$axios.$post(
        `${process.env.CLOUDINARY_URL}/upload`,
        formData
      );
      this.snapshot.imageURL = savedImage.url;
      const result = await this.$axios.$put("/snap", this.snapshot, {
        headers: { "auth-token": this.$store.state.token }
      });
      console.log(result);
      if (result.error) {
        return this.throwErrorMessage(result.errorLog);
      } else {
        setTimeout(() => {
          Toast.fire({
            type: "success",
            title: "Successfully Edited! Redirecting..."
          });
          this.$router.go(-1);
          //   this.$router.push("/");
        }, 1000);
      }
    },
    throwErrorMessage(msg) {
      Toast.fire({
        type: "error",
        title: msg
      });
    },
    fetch({ store, redirect }) {
      if (!store.state.isLoggedIn) {
        return redirect("/");
      }
    }
  },
  created() {
    this.fetchSnapshot();
  }
};
</script>