<template>
  <div class="lg:px-16 px-6 py-4">
    <div class="lg:flex mb-4 hidden">
      <p @click="changeViewMode('compact')" class="mr-2 cursor-pointer primary-button">Compact</p>
      <p @click="changeViewMode('free')" class="cursor-pointer primary-button">Free</p>
    </div>
    <div class="gallery-grid">
      <Snap
        v-for="(snapshot,index) in snapshots"
        :key="snapshot._id"
        :snapshot="snapshot"
        :index="index"
        :hasLiked="snapshot.likers.indexOf($store.state.user._id)>-1?true:false"
        :view="layoutMode"
      />
    </div>
  </div>
</template>

<script>
import Snap from "~/components/Snap/Snap";

export default {
  components: {
    Snap
  },
  data() {
    return {
      snapshots: [],
      layoutMode: this.$store.state.viewMode
    };
  },

  methods: {
    changeViewMode(mode) {
      this.layoutMode = mode;
      this.$store.commit("changeMode", mode);
    },
    async fetchSnapshots() {
      const snapshots = await this.$axios.$get(`/snap?pageNumber=1`);
      this.snapshots = snapshots;
    }
  },
  created() {
    this.fetchSnapshots();
  }
};
</script>

<style>
.free {
  grid-column: span 7;
}
.free .gallery-item-image-wrapper {
  height: 28rem;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 2rem;
}
.compact {
  grid-column: span 4;
}
/* .gallery-item {
  grid-column: span 4;
} */
.gallery-item-image-wrapper {
  height: 16rem;
  cursor: pointer;
  overflow: hidden;
  object-fit: cover;
}
.gallery-item-image-wrapper img {
  width: 100%;
  height: 100%;
}
.gallery-item-image-wrapper:hover .gallery-item-overlay {
  opacity: 1;
}
.gallery-item-overlay {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  width: 100%;
  height: 100%;
  transition: all 0.2s;
}

@media only screen and (max-width: 470px) {
  .gallery-grid {
    grid-column-gap: 0;
  }
  .free,
  .compact {
    grid-column: span 12;
  }
}
</style>
