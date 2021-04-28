import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex';
import { MutationTypes } from '../mutation-types';
import { ActionTypes } from '../action-types';
import firebase from 'firebase';

export const state: {
  userId: string;
  savedImages: { string: HTMLImageElement } | null;
} = {
  userId: '',
  savedImages: null,
};

export type Getters = {
  userId(state: State): string;
  isAuth(state: State): boolean;
  savedImages(state: State): { string: HTMLImageElement } | null;
};

export const getters: GetterTree<State, State> & Getters = {
  userId: (state) => {
    return state.userId;
  },
  isAuth: (state) => {
    return state.userId !== '';
  },
  savedImages: (state) => {
    return state.savedImages;
  },
};

export type MutationPayload = {
  [MutationTypes.SET_USER_ID]: string;
  [MutationTypes.SET_IMAGES]: { string: HTMLImageElement } | null;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER_ID](state, payload: string) {
    state.userId = payload;
  },
  [MutationTypes.SET_IMAGES](
    state,
    payload: { string: HTMLImageElement } | null
  ) {
    state.savedImages = payload;
  },
};

export type ActionsPayload = {
  [ActionTypes.INIT]: [payload: undefined, returnVal: Promise<void>];

  [ActionTypes.SIGN_UP]: [
    payload: {
      email: string;
      password: string;
    },
    returnVal: Promise<void | string>
  ];

  [ActionTypes.LOG_IN]: [
    payload: {
      email: string;
      password: string;
    },
    returnVal: Promise<void | string>
  ];

  [ActionTypes.LOG_OFF]: [payload: undefined, returnVal: Promise<void>];

  [ActionTypes.GET_IMAGES]: [payload: string, returnVal: Promise<void>];

  [ActionTypes.ON_SAVE_IMAGE]: [payload: string, returnVal: Promise<void>];
};

export const actions: Actions = {
  [ActionTypes.INIT]({ commit }) {
    return new Promise<void>((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit(MutationTypes.SET_USER_ID, user.uid);
        }
        resolve();
      });
    });
  },

  [ActionTypes.SIGN_UP]({ commit }, userCredentials) {
    return new Promise<void>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((resp: firebase.auth.UserCredential | null) => {
          if (resp && resp.user)
            commit(MutationTypes.SET_USER_ID, resp.user.uid);
          resolve();
        })
        .catch((err) => reject(err.message));
    });
  },

  [ActionTypes.LOG_IN]({ commit }, userCredentials) {
    return new Promise<void>((resolve, reject) => {
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
        .catch((err) => reject(err.message));
    });
  },

  [ActionTypes.LOG_OFF]({ commit }) {
    return new Promise<void>((resolve) => {
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
    return new Promise<void>((resolve) => {
      firebase
        .database()
        .ref(`${userId}/`)
        .on('value', (dataSnapshot) => {
          commit(MutationTypes.SET_IMAGES, dataSnapshot.val());
          resolve();
        });
    });
  },

  [ActionTypes.ON_SAVE_IMAGE]({ getters }, image) {
    return new Promise<void>((resolve) => {
      firebase
        .database()
        .ref(`${getters.userId}/`)
        .push(image)
        .catch((err) => alert(err.message));
      resolve();
    });
  },
};

type Actions = {
  [Property in keyof ActionsPayload]: (
    augContext: AugmentedActionContext,
    payload: ActionsPayload[Property][0]
  ) => ActionsPayload[Property][1];
};

type AugmentedActionContext = {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & Omit<ActionContext<State, State>, 'commit'>;

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: State,
    payload: MutationPayload[Property]
  ) => void;
};

type State = typeof state;