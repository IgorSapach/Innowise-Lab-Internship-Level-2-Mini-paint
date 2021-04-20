import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
  [MutationTypes.SET_USER_ID](state: S, payload: string): void;
  [MutationTypes.SET_IMAGES](
    state: S,
    payload: { string: HTMLImageElement }
  ): void;
  [MutationTypes.SET_ACTIVE_TOOL](state: S, payload: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_COUNTER](state, payload: number) {
    state.counter = payload;
  },
  [MutationTypes.SET_USER_ID](state, payload: string) {
    state.userId = payload;
  },
  [MutationTypes.SET_IMAGES](state, payload: { string: HTMLImageElement }) {
    state.savedImages = payload;
  },
  [MutationTypes.SET_ACTIVE_TOOL](state, payload: string) {
    state.drawingOptions.activeTool = payload;
  },
};
