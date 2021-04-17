<template>
  <div class="body__item">
    <task-bar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import taskBar from "../src/components/task-bar/TaskBar.vue";

export default defineComponent({
  name: "App",
  components: {
    taskBar,
  },
  mounted() {
    this.$store.dispatch("init");
  },
});
</script>
