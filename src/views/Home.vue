<template>
  <div class="main">
    <transition name="fade">
      <div class="loading" v-if="!showLoader"></div>
      <div v-else class="gallery">
        <div v-for="item in images" :key="item" class="gallery__item">
          <img :src="item" class="gallery__item_image" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from '../store';

import { ActionTypes } from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    let showLoader = ref(false);

    const images = computed(() => {
      if (store.getters['user/savedImages'])
        return store.getters['user/savedImages'];
      return {};
    });

    onMounted(() => {
      store
        .dispatch(
          `user/${ActionTypes.GET_IMAGES}`,
          store.getters['user/userId']
        )
        .then(() => {
          showLoader.value = true;
        });
    });

    return { images, showLoader };
  },
});
</script>
