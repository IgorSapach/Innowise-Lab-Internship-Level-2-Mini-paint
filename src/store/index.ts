import { createStore } from "vuex";
import firebase from "firebase";
import router from "@/router";
import drawingOptions from "./drawing-options";

export default createStore({
  state: {
    isAuth: false,
    userId: "",
    key: "",
    savedUserImages: {},
  },
  getters: {
    isAuth: (state) => state.isAuth,
    userId: (state) => state.userId,
  },
  mutations: {
    setUserIsAuth(state, payload) {
      state.isAuth = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setKey(state, payload) {
      state.key = payload;
    },
    setUserImages(state, payload) {
      // console.log(payload);
      state.savedUserImages = payload;
    },
  },
  actions: {
    init({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setUserId", user.uid);
          dispatch("getUserImages").then(() => {
            router.push({ name: "home" });
          });
        }
      });
    },
    signUp({ commit }, vm) {
      return firebaseApp
        .auth()
        .createUserWithEmailAndPassword(vm.email, vm.password)
        .then((resp: any) => {
          commit("setUserIsAuth", true);
          commit("setUserId", resp.user.uid);
          localStorage.setItem(
            "userId",
            JSON.stringify({ userId: resp.user.uid })
          );
        })
        .catch((err) => alert(err.message));
    },
    logIn({ commit }, vm) {
      return firebaseApp
        .auth()
        .signInWithEmailAndPassword(vm.email, vm.password)
        .then((resp: any) => {
          commit("setUserIsAuth", true);
          commit("setUserId", resp.user.uid);
          localStorage.setItem(
            "userId",
            JSON.stringify({ userId: resp.user.uid })
          );
        })
        .catch((err) => alert(err.message));
    },

    onSaveImage({ commit, state }, vm) {
      // if (state.key == "") {
      // console.log(firebaseApp.database().ref("user"));
      // commit("setKey", firebaseApp.database().ref().push().key);
      // const image = vm.toDataURL();

      // console.log(state.key);
      firebaseApp.database().ref(`${state.userId}/`).push(vm.toDataURL());
      // firebaseApp.database().ref().push();
      // .then((resp) => console.log(resp));
      // }
    },
    getUserImages({ state, commit }) {
      return firebaseApp
        .database()
        .ref(`${state.userId}/`)
        .on("value", function (dataSnapshot) {
          commit("setUserImages", dataSnapshot.val());
        });
    },
  },
  modules: {
    drawingOptions,
  },
});

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
