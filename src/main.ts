import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useStore } from './store/store';
import dotenv from 'dotenv';
import firebase from 'firebase';

import { ActionTypes } from './store/action-types';

import DKToast from 'vue-dk-toast';
import '@/assets/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATA_BASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(router).use(DKToast).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
dotenv.config();

const store = useStore();
store.dispatch(ActionTypes.INIT, null).then(() => router.push({ name: 'home' }));
