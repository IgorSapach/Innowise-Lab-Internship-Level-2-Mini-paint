import { createStore } from "vuex";
import firebase from "firebase";
import user from "./user";

export default createStore({
  actions: {
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
  },
  modules: {
    user,
  },
});
