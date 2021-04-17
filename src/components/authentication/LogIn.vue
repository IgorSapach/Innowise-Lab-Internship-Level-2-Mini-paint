<template>
  <form @submit.prevent class="auth__form">
    <div class="auth__form_item">
      <input
        class="auth__form_input"
        type="text"
        placeholder="Email"
        v-model="logInUserCredentionals.email"
      />
    </div>
    <div class="auth__form_item">
      <input
        class="auth__form_input"
        type="password"
        placeholder="Password"
        v-model="logInUserCredentionals.password"
      />
    </div>
    <div class="auth__form_item">
      <button class="auth__form_button button" @click="logIn">login</button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let logInUserCredentionals = {
      email: "",
      password: "",
    };

    const store = useStore();
    const logIn = function () {
      store.dispatch("logIn", logInUserCredentionals);
    };
    return {
      logIn,
      logInUserCredentionals,
    };
  },
});
</script>
