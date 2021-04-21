<template>
  <div class="auth">
    <div class="auth__body">
      <div class="auth__header">SignUp</div>
      <form @submit.prevent="signUp" class="auth__form">
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
          <button
            type="button"
            class="auth__form_button button auth_button"
            @click="signUp"
          >
            SignUp
          </button>
        </div>
        <div class="auth__footer">
          <div class="auth__footer_title">Have an account already?</div>
          <button type="button" class="button auth_button" @click="goToLogIn">
            LogIn
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/store';
import router from '@/router';
import { ActionTypes } from '../store/action-types';

export default defineComponent({
  setup() {
    const form = {
      email: '',
      password: '',
    };

    const store = useStore();
    const signUp = function () {
      store
        .dispatch(ActionTypes.SIGN_UP, form)
        .then(() => router.push({ name: 'home' }));
    };
    const goToLogIn = () => {
      router.push({ name: 'logIn' });
    };
    return {
      signUp,
      form,
      goToLogIn,
    };
  },
});
</script>
