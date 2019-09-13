<template>
  <header class="lg:px-16 px-4 py-1 lg:flex lg:justify-center lg:items-center shadow">
    <div class="lg:w-2/12">
      <nuxt-link to="/">
        <h6>Snapshots.</h6>
      </nuxt-link>
    </div>
    <div class="lg:w-7/12 w-full">
      <input
        class="px-2 shadow lg:w-10/12 h-8"
        type="search"
        name="search"
        id="search"
        placeholder="Search"
      />
    </div>
    <ul class="lg:flex lg:w-3/12">
      <li v-if="!isLoggedIn">
        <nuxt-link to="/login">Login</nuxt-link>
      </li>
      <li v-if="!isLoggedIn">
        <nuxt-link to="/register">Register</nuxt-link>
      </li>
      <li v-if="isLoggedIn">
        <nuxt-link
          to="/create"
          class="px-2 bg-blue-900 hover:bg-blue-800 text-white rounded py-1"
        >Create</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/discover">
          <i class="fas fa-globe-americas"></i>
        </nuxt-link>
      </li>
      <li v-if="isLoggedIn">
        <i class="far fa-bell cursor-pointer"></i>
      </li>
      <li>
        <nuxt-link to="/profile" v-if="isLoggedIn">
          <img
            class="rounded-full w-6 h-6 object-cover"
            :src="this.$store.state.user.profileImageURL"
            alt="Profile Image"
          />
        </nuxt-link>
      </li>
      <li v-if="isLoggedIn">
        <i class="fas fa-sign-out-alt cursor-pointer" @click="logOut"></i>
      </li>
    </ul>
  </header>

  <!-- <div class="px-4 py-4 flex flex-col" id="navigation">
        <div class="mb-8">
            <h5 class="text-xl">Snapshots.</h5>
        </div>
        <div class="profile flex flex-col items-center">
            <img class="rounded-full w-6 h-6 object-cover"  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/be47c50a-b433-459f-b1c7-6fdf8ec394d3/d91ba5f-e093dfed-e6fd-4467-83b1-fa3e1a0b958b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JlNDdjNTBhLWI0MzMtNDU5Zi1iMWM3LTZmZGY4ZWMzOTRkM1wvZDkxYmE1Zi1lMDkzZGZlZC1lNmZkLTQ0NjctODNiMS1mYTNlMWEwYjk1OGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LMjpyvDBKGexOfP2TnhKT3-uhxl7KhDAX3MHrHtT_xo" alt="profile picture">
            <h6 class="font-bold">Manish Karki</h6>
            <p>@manishkarki247</p>
        </div>
  </div>-->
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logOut() {
      this.$store.commit("logOut");
    }
  }
};
</script>

<style scoped>
header {
  height: 3rem;
}
ul li {
  margin-left: 16px;
}
#navigation {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100vh;
}
</style>