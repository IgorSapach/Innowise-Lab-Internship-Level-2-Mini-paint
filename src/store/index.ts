import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { userModule } from './modules/user';
import { drawingOptionsModule } from './modules/drawingOptions';

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
  modules: {
    user: userModule,
    drawingOptions: drawingOptionsModule,
  },
});

export function useStore() {
  return baseUseStore(key);
}
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
