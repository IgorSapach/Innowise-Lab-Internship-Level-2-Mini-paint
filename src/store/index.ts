import { createStore } from "vuex";
import firebaseApp from "../main";

export default createStore({
  state: {
    isAuth: false,
    userId: "",
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
  },
  actions: {
    signUp({ commit }, vm) {
      return firebaseApp
        .auth()
        .createUserWithEmailAndPassword(vm.email, vm.password)
        .then((resp: any) => {
          commit("setUserIsAuth", true);
          commit("setUserId", resp.user.uid);
        })
        .catch((err) => alert(err.message));
    },
    logIn({ commit }, vm) {
      return firebaseApp
        .auth()
        .signInWithEmailAndPassword(vm.email, vm.password)
        .then((resp: any) => {
          console.log(resp);
          commit("setUserIsAuth", true);
          commit("setUserId", resp.user.uid);
        })
        .catch((err) => alert(err.message));
    },
  },
});
