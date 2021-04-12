import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import dotenv from "dotenv";

createApp(App).use(store).use(router).mount("#app");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_DATA_API_KEY,
  authDomain: process.env.FIREBASE_DATA_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATA_DATA_BASE_URL,
  projectId: process.env.FIREBASE_DATA_PROJECT_ID,
  storageBucket: process.env.FIREBASE_DATA_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_DATA_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_DATA_APP_ID,
  measurementId: process.env.FIREBASE_DATA_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
