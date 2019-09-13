<template>
  <div>
    <!-- <Navbar class="lg:w-2/12 bg-gray-200" /> -->
    <Navbar />

    <!-- <nuxt class="lg:w-10/12 ml-50 lg:px-4 lg:py-4" /> -->
    <nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>

<style>
body {
  font-family: "Roboto";
  letter-spacing: 0.8px;
  color: rgb(27, 27, 27);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Lato";
}

.ml-50 {
  margin-left: 14rem;
}
</style>
