<template>
  <form @submit.prevent class="auth__form">
    <div class="auth__form_item">
      <input
        class="auth__form_input"
        type="text"
        placeholder="Email"
        v-model="signUpUserCredentionals.email"
      />
    </div>
    <div class="auth__form_item">
      <input
        class="auth__form_input"
        type="password"
        placeholder="Password"
        v-model="signUpUserCredentionals.password"
      />
    </div>
    <div class="auth__form_item">
      <button class="auth__form_button button" @click="signUp">SignUp</button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let signUpUserCredentionals = {
      email: "",
      password: "",
    };

    const store = useStore();
    const signUp = function () {
      store.dispatch("signUp", signUpUserCredentionals);
    };
    return {
      signUp,
      signUpUserCredentionals,
    };
  },
});
</script>
