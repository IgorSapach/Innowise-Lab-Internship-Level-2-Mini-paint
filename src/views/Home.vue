<template>
  <div v-if="haveImages">
    <div v-for="item in images" :key="item">
      <img :src="item" />
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const images = computed(() => {
      console.log(store.getters.savedUsersImages);
      return store.getters.savedUsersImages;
    });
    const haveImages = computed(() => {
      return store.getters.haveImages;
    });

    return { images, haveImages };
  },
});
</script>
