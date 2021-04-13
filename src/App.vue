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
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.align-items-center {
  align-items: center;
}
.justify-content-center {
  justify-content: center;
}
input {
  border: none;
  padding: 0.6em 0.1em 0.5em 0.75em;
  font-size: 0.85em;
  line-height: 1.1em;
  -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 12%) inset,
    0 1px 2px rgb(0 0 0 / 12%) inset;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 12%), inset 0 1px 2px rgb(0 0 0 / 12%);
  border-radius: 2px;
  font-weight: 500;
  min-width: 250px;
}
button {
  width: 100%;
}
.p-2 {
  padding: 2rem;
}
.mb-1 {
  margin-bottom: 1rem;
}
.form-button.button,
.form-button .button {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#2f3235),
    to(#282a2d)
  );
  background: -o-linear-gradient(#2f3235, #282a2d);
  background: linear-gradient(#2f3235, #282a2d);
  border-color: #111 #111 #000;
  border-width: 1px;
  border-style: solid;
  font-size: 0.9em;
  -webkit-box-shadow: 0 1px 0 0 rgb(0 0 0 / 50%),
    0 1px 0 0 hsl(0deg 0% 100% / 5%) inset;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 50%), inset 0 1px 0 0 hsl(0deg 0% 100% / 5%);
}
.full-height {
  height: 100vh;
}
</style>
