<template>
  <div v-if="haveImages">
    <div v-for="item in images" :key="item">
      <div v-for="elem in item" :key="elem">
        <!-- {{elem}} -->
        <img :src="elem" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  // computed: {
  //   images() {
  //     console.log(this.$store.getters["savedUsersImages"])
  //     return this.$store.getters["savedUsersImages"];
  //   },
  //   haveImages() {
  //     return this.$store.getters["haveImages"];
  //   },
  // },
  setup() {
    const store = useStore();
    const images = computed(() => {
      return store.getters.savedUsersImages;
    });
    const haveImages = computed(() => {
      return store.getters.haveImages;
    });

    return { images, haveImages };
  },
});
</script>
