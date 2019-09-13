<template>
  <div class="lg:px-16 px-6 py-4 flex justify-center items-center lg:mt-32">
    <form action="#" @submit.prevent="login" class="lg:w-4/12 w-full shadow px-4 py-3 h-48">
      <div class="flex flex-col mb-3">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          name="username"
          id="username"
          class="px-2 py-1 shadow rounded-sm"
        />
      </div>
      <div class="flex flex-col mb-3">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
          id="password"
          class="px-2 py-1 shadow rounded-sm"
        />
      </div>
      <div>
        <input
          type="submit"
          value="Login"
          class="cursor-pointer px-3 py-1 rounded-sm bg-blue-800 hover:bg-blue-700 text-white shadow"
        />
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      if (this.user.password === "" || this.user.username === "") {
        return Toast.fire({
          type: "error",
          title: "Fields must not be empty!"
        });
      }
      if (this.user.password.length < 8) {
        return Toast.fire({
          type: "error",
          title: "Password must be at least 8 characters long"
        });
      }

      const result = await this.$store.dispatch("login", this.user);
      if (!result.error) {
        this.$store.commit("setUser", {
          user: result.user,
          token: result.token
        });
        Toast.fire({
          type: "success",
          title: "Logged In. Redirecting..."
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } else {
        Toast.fire({
          type: "error",
          title: result.errorLog
        });
      }
    }
  }
};
</script>