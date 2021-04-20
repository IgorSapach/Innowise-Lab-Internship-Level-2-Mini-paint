<template>
  <div class="auth">
    <div class="auth__body">
      <div class="auth__header">LogIn</div>
      <form @submit.prevent="logIn" class="auth__form">
        <div class="auth__form_item">
          <input
            class="auth__form_input"
            type="text"
            placeholder="Email"
            v-model="form.email"
          />
        </div>
        <div class="auth__form_item">
          <input
            class="auth__form_input"
            type="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
        <div class="auth__form_item">
          <button type="button" class="auth__form_button button" @click="logIn">
            login
          </button>
        </div>
      </form>
      <div class="auth__footer">
        <div class="auth__footer_title">Need an account?</div>
        <button type="button" class="button" @click="goToSignUp">SignUp</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/store';
import router from '@/router';
import { ActionTypes } from '../store/action-types';

export default defineComponent({
  setup() {
    const form = {
      email: '',
      password: '',
    };

    const store = useStore();
    const logIn = function () {
      store.dispatch(ActionTypes.LOG_IN, form).then(() => {
        router.push({ name: 'home' });
      });
    };
    const goToSignUp = function () {
      router.push({ name: 'signUp' });
    };
    return {
      logIn,
      form,
      goToSignUp,
    };
  },
});
</script>
