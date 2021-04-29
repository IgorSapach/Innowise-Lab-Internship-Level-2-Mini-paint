import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { userModule } from './modules/user';
import { drawingOptionsModule } from './modules/drawingOptions';

const state = {};
export type RootState = typeof state;

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
