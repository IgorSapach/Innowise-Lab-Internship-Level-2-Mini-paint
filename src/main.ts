import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';

import { ActionTypes } from './store/action-types';

import DKToast from 'vue-dk-toast';
import '@/assets/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, far);

try {
  store
    .dispatch(ActionTypes.INIT)
    .then(() => {
      router.push({ name: 'home' });
    })
    .catch((err) => {
      if (err == null) console.log('User is unauthorized');
    });
} finally {
  createApp(App)
    .use(store, key)
    .use(router)
    .use(DKToast)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
}
