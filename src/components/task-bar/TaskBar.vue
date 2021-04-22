<template>
  <div class="taskBar">
    <div class="taskBar__item">
      <button class="taskBar__item_button button" @click="goTo">
        Open {{ currentRoute === 'home' ? 'paint' : 'home' }}
      </button>
    </div>
    <div class="taskBar__item">
      <button class="taskBar__item_button button" @click="logOff">LogOff</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store/store';
import router from '@/router';

import { ActionTypes } from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();

    const currentRoute = computed(() => {
      return router.currentRoute.value.name;
    });

    const goTo = function () {
      if (store.getters.userId && currentRoute.value === 'home') {
        router.push({
          name: 'paint',
          params: { uid: store.getters.userId },
        });
      } else if (store.getters.userId && currentRoute.value === 'paint') {
        router.push({
          name: 'home',
        });
      }
    };

    const logOff = () => {
      store.dispatch(ActionTypes.LOG_OFF, null).then(() => {
        router.push({ name: 'logIn' });
      });
    };

    return { goTo, logOff, currentRoute };
  },
});
</script>
