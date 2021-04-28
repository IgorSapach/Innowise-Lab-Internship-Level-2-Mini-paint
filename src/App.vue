<template>
  <div class="body__item">
    <task-bar v-if="isAuth" />
    <router-view />
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
    const isAuth = computed(() => {
      return store.getters.isAuth;
    });

    return { isAuth };
  },
});
</script>
