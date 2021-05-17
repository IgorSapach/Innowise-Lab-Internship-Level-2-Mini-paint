import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import { userModule } from './modules/user';
import { drawingOptionsModule } from './modules/drawingOptions';
import { userWalkThroughModule } from './modules/userWalkThrough';

import { firebaseConfig } from './firebaseParams';
import firebase from 'firebase';

export type RootState = {
  userId: string;
  savedImages: { string: HTMLImageElement } | null;
  drawingOptions: {
    drawLineWidth: number;
    lineColor: string;
    activeTool: string;
  };
};

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  actions: {
    [ActionTypes.INIT]({ commit }) {
      return new Promise<void>((resolve, reject) => {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit(`user/${MutationTypes.SET_USER_ID}`, user.uid);
            resolve();
          }
          reject();
          store.commit(`user/${MutationTypes.SET_SHOW_LOADER}`, false);
        });
      });
    },
  },
  modules: {
    user: userModule,
    userWalkThrough: userWalkThroughModule,
    drawingOptions: drawingOptionsModule,
  },
});

export function useStore(): Store<RootState> {
  return baseUseStore(key);
}
