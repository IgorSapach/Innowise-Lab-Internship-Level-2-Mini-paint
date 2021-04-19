<template>
  <div class="auth">
    <div class="auth__body">
      <div class="auth__header">
        {{ loginForm ? "Login" : "SignUp" }}
      </div>
      <component :is="showLoginForm" class="auth__item"></component>
      <div class="auth__footer">
        <div class="auth__footer_title">Need an account?</div>
        <button class="button" @click="loginForm = !loginForm">
          {{ loginForm ? "SignUp" : "LogIn" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
