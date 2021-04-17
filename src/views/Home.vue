<template>
  <div>
    <div><button @click="openDrawingPad">open drawing pad</button></div>
    <div v-if="haveImages" class="gallery">
      <div v-for="item in images" :key="item" class="gallery__item">
        <img :src="item" class="gallery__item_image" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const images = computed(() => {
      return store.getters.savedUsersImages;
    });
    const haveImages = computed(() => {
      for (let key in store.getters.savedUsersImages) {
        return true;
      }
      return false;
    });
    const openDrawingPad = function () {
      if (store.getters.userId) {
        this.$router.push({
          name: "paint",
          params: { uid: store.getters.userId },
        });
      }
    };
    onMounted(() => {
      store.dispatch("init");
    });

    return { images, haveImages, openDrawingPad };
  },
});
</script>
