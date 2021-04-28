import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex';

import * as moduleUser from './modules/user';
import * as moduleDrawingOptions from './modules/drawingOptions';

const initialState = { ...moduleUser.state, ...moduleDrawingOptions.state };
export type State = typeof initialState;

export const store = createStore({
  state: { ...moduleUser.state, ...moduleDrawingOptions.state },
  getters: { ...moduleUser.getters, ...moduleDrawingOptions.getters },
  mutations: { ...moduleUser.mutations, ...moduleDrawingOptions.mutations },
  actions: { ...moduleUser.actions },
});

type MutationPayload = moduleUser.MutationPayload &
  moduleDrawingOptions.MutationPayload;
type ActionsPayload = moduleUser.ActionsPayload;
type Getters = moduleUser.Getters & moduleDrawingOptions.Getters;

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & {
  dispatch<K extends keyof ActionsPayload>(
    key: K,
    payload: ActionsPayload[K][0],
    options?: DispatchOptions
  ): ActionsPayload[K][1];
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore(): Store {
  return store as Store;
}
