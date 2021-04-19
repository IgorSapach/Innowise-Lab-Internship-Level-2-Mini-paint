import { createStore } from "vuex";
import firebase from "firebase";
import router from "@/router";
import drawingOptions from "./drawing-options";
import user from "./user";

export default createStore({
  state: {
    userId: "",
  },
  getters: {
    isAuth: (state: { userId: string }) => state.userId !== "",
    userId: (state: { userId: string }) => state.userId,
  },
  mutations: {
    setUserId(state: { userId: string }, payload: string) {
      state.userId = payload;
    },
  },
  actions: {
    init({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setUserId", user.uid);
          router.push({ name: "home" }); //Ask with Andrei about 'firebase.Unsubscribe'
        }
      });
    },
    signUp({ commit }, userCredentials: { email: string; password: string }) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((resp: any) => {
          commit("setUserId", resp.user.uid);
        })
        .catch((err) => alert(err.message));
    },
    logIn({ commit }, userCredentials: { email: string; password: string }) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((resp: any) => {
          commit("setUserId", resp.user.uid);
        })
        .catch((err) => alert(err.message));
    },
    logOff({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUserId", "");
          router.push({ name: "authentication" });
        });
    },
  },
  modules: {
    drawingOptions,
    user,
  },
});
