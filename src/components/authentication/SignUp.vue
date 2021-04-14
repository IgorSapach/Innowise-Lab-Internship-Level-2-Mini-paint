<template>
  <div class="p-2">
    <h3 class="login-title">SignUp</h3>
    <form @submit.prevent>
      <div class="mb-1">
        <input
          type="text"
          placeholder="Email"
          v-model="signUpUserCredentionals.email"
        />
      </div>
      <div class="mb-1">
        <input
          type="password"
          placeholder="Password"
          v-model="signUpUserCredentionals.password"
        />
      </div>
      <button class="login-button button" @click="signUp">SignUp</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  setup() {
    let signUpUserCredentionals = {
      email: "",
      password: "",
    };

    const store = useStore();
    const signUp = function () {
      store.dispatch("signUp", signUpUserCredentionals).finally(() => {
        router.push({ name: "paint", params: { uid: store.getters.userId } });
      });
    };
    return {
      signUp,
      signUpUserCredentionals,
    };
  },
});
</script>
