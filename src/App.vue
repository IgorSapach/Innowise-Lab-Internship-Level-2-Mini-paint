<template>
  <div><router-view /></div>
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
<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  color: #bebebe;
  font-family: Helvetica, Arial, Lucida Grande, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
