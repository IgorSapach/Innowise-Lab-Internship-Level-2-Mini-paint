<template>
  <div class="p-2">
    <h3 class="login-title">Login</h3>
    <form @submit.prevent>
      <div class="mb-1">
        <input
          type="text"
          placeholder="Email"
          v-model="logInUserCredentionals.email"
        />
      </div>
      <div class="mb-1">
        <input
          type="password"
          placeholder="Password"
          v-model="logInUserCredentionals.password"
        />
      </div>
      <button class="login-button button" @click="logIn">login</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  setup() {
    let logInUserCredentionals = {
      email: "",
      password: "",
    };
    const store = useStore();
    const logIn = function () {
      store.dispatch("logIn", logInUserCredentionals).finally(() => {
        router.push({ name: "paint", params: { uid: store.getters.userId } });
      });
    };
    return {
      logIn,
      logInUserCredentionals,
    };
  },
});
</script>
