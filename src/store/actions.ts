import { ActionTree, ActionContext } from 'vuex';
import { state, State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import firebase from 'firebase';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.INIT]({ commit }, undefined): Promise<void>;

  [ActionTypes.SIGN_UP](
    { commit },
    userCredentials: {
      email: string;
      password: string;
    }
  ): Promise<void>;

  [ActionTypes.LOG_IN](
    { commit }: AugmentedActionContext,
    userCredentials: { email: string; password: string }
  ): Promise<void>;

  [ActionTypes.LOG_OFF](
    { commit }: AugmentedActionContext,
    undefined
  ): Promise<void>;

  [ActionTypes.GET_IMAGES](
    { commit }: AugmentedActionContext,
    userId: string
  ): void;

  [ActionTypes.ON_SAVE_IMAGE](
    { commit }: AugmentedActionContext,
    image: string
  ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.INIT]({ commit }) {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit(MutationTypes.SET_USER_ID, user.uid);
        }
        resolve();
      });
    });
  },

  [ActionTypes.SIGN_UP]({ commit }, userCredentials) {
    return new Promise((resolve) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((resp: firebase.auth.UserCredential | null) => {
          if (resp && resp.user)
            commit(MutationTypes.SET_USER_ID, resp.user.uid);
        })
        .catch((err) => alert(err.message));
      resolve();
    });
  },

  [ActionTypes.LOG_IN]({ commit }, userCredentials) {
    return new Promise((resolve) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((resp) => {
          if (resp && resp.user)
            commit(MutationTypes.SET_USER_ID, resp.user.uid);
          resolve();
        })
        .catch((err) => alert(err.message));
    });
  },

  [ActionTypes.LOG_OFF]({ commit }) {
    return new Promise((resolve) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit(MutationTypes.SET_USER_ID, '');
        });
      resolve();
    });
  },

  [ActionTypes.GET_IMAGES]({ commit }, userId) {
    firebase
      .database()
      .ref(`${userId}/`)
      .on('value', (dataSnapshot) => {
        // console.log(dataSnapshot.val());
        commit(MutationTypes.SET_IMAGES, dataSnapshot.val());
      });
  },

  [ActionTypes.ON_SAVE_IMAGE](image) {
    return new Promise((resolve) => {
      firebase
        .database()
        .ref(`${state.userId}/`)
        .push(image)
        .catch((err) => alert(err.message));
      resolve();
    });
  },
};
