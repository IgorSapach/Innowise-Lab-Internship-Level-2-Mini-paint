<template>
  <div class="body__item">
    <task-bar v-if="isAuth" />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <div class="loading" v-if="showLoader"></div>
        <component v-else :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import taskBar from '../src/components/task-bar/TaskBar.vue';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
    taskBar,
  },
  setup() {
    const store = useStore();

    const showLoader = computed(() => {
      return store.getters['user/showLoader'];
    });

    const isAuth = computed(() => {
      return store.getters['user/isAuth'];
    });

    return { isAuth, showLoader };
  },
});
</script>
