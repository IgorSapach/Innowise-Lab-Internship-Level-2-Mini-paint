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
import { computed, defineComponent, onMounted } from 'vue';

import taskBar from '../src/components/task-bar/TaskBar.vue';
import { EventBus } from './EventBus';
import { useStore } from './store';
import { ActionTypes } from './store/action-types';
import { MutationTypes } from './store/mutation-types';

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
    const getUserInfo = () => {
      if (isAuth.value) {
        store.dispatch(`user/${ActionTypes.GET_USER_INFO}`).then((resp) => {
          if (resp)
            store.commit(
              `userWalkThrough/${MutationTypes.SET_WALKTHROUGH}`,
              resp
            );
          EventBus.emit('walkThroughAnimation');
        });
      }
    };

    onMounted(() => {
      EventBus.on('get-user-info', () => {
        getUserInfo();
      });
      getUserInfo();
    });

    return { isAuth, showLoader };
  },
});
</script>
