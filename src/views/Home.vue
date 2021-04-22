<template>
  <div class="main">
    <transition name="fade">
      <div v-if="!haveImages" class="loading" />
      <div v-else class="gallery">
        <div v-for="item in images" :key="item" class="gallery__item">
          <img :src="item" class="gallery__item_image" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from '../store/store';

import { ActionTypes } from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();

    const images = computed(() => {
      return store.getters.savedImages;
    }

    const haveImages = computed(() => {
      for (let _key in store.getters.savedImages) {
        return true;
      }
      return false;
    });

    onMounted(() => store.dispatch(ActionTypes.GET_IMAGES, store.getters.userId));

    return { images, haveImages };
  },
});
</script>
