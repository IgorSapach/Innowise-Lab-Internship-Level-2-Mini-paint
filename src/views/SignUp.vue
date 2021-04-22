<template>
  <div class="auth">
    <div class="auth__body">
      <div class="auth__header">SignUp</div>
      <form class="auth__form" @submit.prevent>
        <div class="auth__form_item">
          <input v-model="form.email" class="auth__form_input" type="text" placeholder="Email" />
        </div>
        <div class="auth__form_item">
          <input v-model="form.password" class="auth__form_input" type="password" placeholder="Password" />
        </div>
        <div class="auth__form_item">
          <button type="submit" class="auth__form_button button auth_button" @click="signUp">SignUp</button>
        </div>
      </form>
      <div class="auth__footer">
        <div class="auth__footer_title">Have an account already?</div>
        <button type="button" class="button auth_button" @click="goToLogIn">LogIn</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/store';
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

    const signUp = function () {
      store
        .dispatch(ActionTypes.SIGN_UP, form)
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
