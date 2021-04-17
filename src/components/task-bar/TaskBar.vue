<template>
  <div class="taskBar">
    <div class="taskBar__item">
      <button class="taskBar__item_button button" @click="goTo">
        Open {{ currentRoute }}
      </button>
    </div>
    <div class="taskBar__item">
      <button class="taskBar__item_button button" @click="logOff">
        LogOff
      </button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  setup() {
    const store = useStore();
    const currentRoute = computed(() => {
      return router.currentRoute.value.name;
    });
    const goTo = function () {
      if (store.getters.userId && currentRoute.value === "home") {
        router.push({
          name: "paint",
          params: { uid: store.getters.userId },
        });
      } else if (store.getters.userId && currentRoute.value === "paint") {
        router.push({
          name: "home",
        });
      }
    };
    const logOff = () => {
      store.dispatch("logOff");
    };
    return { goTo, logOff, currentRoute };
  },
});
</script>
