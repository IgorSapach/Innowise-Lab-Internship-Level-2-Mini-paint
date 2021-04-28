import { createStore, Store as VuexStore } from 'vuex';

import { user } from './modules/user';
import * as moduleDrawingOptions from './modules/drawingOptions';

const initialState = { ...moduleDrawingOptions.state };

export type RootState = typeof initialState;

export const store = createStore({
  modules: {
    user,
  },
});

export type Store = Omit<
  VuexStore<RootState>,
  'getters' | 'commit' | 'dispatch'
>;

export function useStore(): Store {
  return store as Store;
}
