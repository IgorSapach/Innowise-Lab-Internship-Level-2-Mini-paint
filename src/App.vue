<template>
  <div><router-view /></div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    if (localStorage.getItem("userId")) {
      let userId = JSON.parse(localStorage.getItem("userId"));
      store.commit("setUserId", userId.userId);
      store.commit("setUserIsAuth", true);
      router.push({
        name: "paint",
        params: { uid: store.getters.userId },
      });
    }
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
