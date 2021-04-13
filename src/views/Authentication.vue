<template>
  <div class="main d-flex flex-column align-items-center justify-content">
    <div class="auth-container">
      <component :is="showLoginForm"></component>
      <div class="d-flex p-2">
        Need an account?<button @click="loginForm = !loginForm">
          {{ loginForm ? "SignUp" : "LogIn" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    LogIn,
    SignUp,
  },
  data() {
    return {
      loginForm: true,
    };
  },
  computed: {
    showLoginForm() {
      return this.loginForm ? "LogIn" : "SignUp";
    },
  },
});
</script>

<style>
.main {
  background: radial-gradient(#25292b, #181c1d);
  height: 100vh;
}
.auth-container {
  border-radius: 3px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.login-button {
  height: 1.5rem;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 3px;
}
.login-title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
</style>
