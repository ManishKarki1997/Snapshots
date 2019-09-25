<template>
  <div class="lg:px-16 px-6 py-4">
    <div class="grid" v-if="snapshots && snapshots.length>0">
      <div v-for="snapshot in snapshots" :key="snapshot._id" class="grid-item">
        <div class="grid-item-image-wrapper relative">
          <img :src="snapshot.imageURL" alt="snapshot" />
          <div class="grid-item-overlay cursor-pointer" @click="viewImage(snapshot._id)">
            <h6 class="text-white">{{snapshot.title}}</h6>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You Have Not Shared Anything Yet</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snapshots: []
    };
  },
  methods: {
    viewImage(snapId) {
      this.$router.push(`/snap/${snapId}`);
    }
  },
  created() {
    this.snapshots = this.$store.state.user.snaps;
  }
};
</script>