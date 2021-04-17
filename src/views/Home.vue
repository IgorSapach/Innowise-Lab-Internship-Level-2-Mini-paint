<template>
  <div>
    <div v-if="haveImages" class="gallery">
      <div v-for="item in images" :key="item" class="gallery__item">
        <img :src="item" class="gallery__item_image" />
      </div>
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
      return store.getters.savedUsersImages;
    });
    const haveImages = computed(() => {
      for (let key in store.getters.savedUsersImages) {
        return true;
      }
      return false;
    });
    return { images, haveImages };
  },
});
</script>
