<template>
  <div class="body__item">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {
    this.$store.dispatch("init");
  },
});
</script>
