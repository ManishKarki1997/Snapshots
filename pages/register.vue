<template>
  <div class="lg:px-16 px-6 py-4 flex justify-center items-center lg:mt-12">
    <form action="#" class="lg:w-11/12 w-full" @submit.prevent="signup">
      <div class="flex flex-col mb-4">
        <label for="title">Name</label>
        <input
          class="rounded-sm shadow lg:w-2/6 px-2 py-1 w-full"
          type="text"
          name="name"
          id="name"
          v-model="user.name"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="title">Email</label>
        <input
          class="rounded-sm shadow lg:w-2/6 px-2 py-1 w-full"
          type="email"
          name="email"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="title">Username</label>
        <input
          class="rounded-sm shadow lg:w-2/6 px-2 py-1 w-full"
          type="text"
          name="username"
          id="username"
          v-model="user.username"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="title">Password</label>
        <input
          class="rounded-sm shadow lg:w-2/6 px-2 py-1 w-full"
          type="password"
          name="password"
          id="password"
          v-model="user.password"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="title">Repeat Password</label>
        <input
          class="rounded-sm shadow lg:w-2/6 px-2 py-1 w-full"
          type="password"
          name="repeatpassword"
          id="repeatpassword"
          v-model="repeatPassword"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" @change="onFileChanged" />
      </div>
      <div class="flex items-center w-full">
        <input
          :disabled="isPosting"
          class="cursor-pointer px-4 py-1 bg-blue-800 rounded-sm mr-2 text-white"
          type="submit"
          value="Register"
        />
        <img v-if="isPosting" class="h-6 w-6" src="/Images/5.gif" alt="Loading Bar" />
      </div>
    </form>
  </div>
</template>

<script>
import Toast from "../plugins/sweetalert";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        username: "",
        profileImageURL: "",
        password: ""
      },
      repeatPassword: "",
      image: null,
      isPosting: false
    };
  },
  methods: {
    onFileChanged(event) {
      this.image = event.target.files[0];
    },
    async signup() {
      if (
        this.user.name === "" ||
        this.user.password === "" ||
        this.user.email === "" ||
        this.user.username === "" ||
        this.image == null
      ) {
        return this.throwErrorMessage("Please fill in all fields");
      }
      if (this.user.password !== this.repeatPassword)
        return this.throwErrorMessage("Passwords do not match!");

      this.isPosting = true;
      let formData = new FormData();
      formData.append("file", this.image);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      const savedImage = await this.$axios.$post(
        `${process.env.CLOUDINARY_URL}/upload`,
        formData
      );
      this.user.profileImageURL = savedImage.url;

      const result = await this.$axios.$post("/user", this.user);

      if (result.error) {
        return this.throwErrorMessage(result.errorLog);
      } else {
        this.user = {};
        this.$store.commit("setUser", {
          user: result.result,
          token: result.token
        });
        setTimeout(() => {
          Toast.fire({
            type: "success",
            title: "Successfully signed up. Redirecting..."
          });
          this.$router.push("/");
        }, 1000);
      }
    },
    throwErrorMessage(msg) {
      Toast.fire({
        type: "error",
        title: msg
      });
    }
  }
};
</script>