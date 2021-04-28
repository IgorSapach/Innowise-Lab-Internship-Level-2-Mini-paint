<template>
  <div class="auth">
    <div class="auth__body">
      <div class="auth__header">LogIn</div>
      <form @submit.prevent class="auth__form">
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
            type="submit"
            class="auth__form_button button auth_button"
            @click="logIn"
          >
            login
          </button>
        </div>
      </form>
      <div class="auth__footer">
        <div class="auth__footer_title">Need an account?</div>
        <button type="button" class="button auth_button" @click="goToSignUp">
          SignUp
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import router from '@/router';
import { ActionTypes } from '../store/action-types';
import { inject } from 'vue';
import type { Toast } from 'vue-dk-toast';

export default defineComponent({
  setup() {
    const form = {
      email: '',
      password: '',
    };
    const toast = inject<Toast>('$toast');

    const store = useStore();

    const logIn = function () {
      store
        .dispatch(ActionTypes.LOG_IN, form)
        .then(() => {
          router.push({ name: 'home' });
        })
        .catch((err) => {
          if (toast)
            toast(err, {
              positionY: 'top',
              type: 'error',
            });
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
