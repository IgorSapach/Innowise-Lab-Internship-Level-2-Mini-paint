import { Module, MutationTree } from 'vuex';

import { MutationTypes } from '../mutation-types';
import { RootState } from './../index';

export const state: {
  walkThrough: { string: boolean } | null;
} = {
  walkThrough: { string: false },
};

type UserState = typeof state;

export type Getters = {
  walkThrough(state: UserState): { string: boolean } | null;
};

export const getters: Getters = {
  walkThrough: (state) => {
    return state.walkThrough;
  },
};

export type MutationPayload = {
  [MutationTypes.SET_WALKTHROUGH]: { string: boolean } | null;
};

export const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.SET_WALKTHROUGH](state, payload: { string: boolean } | null) {
    state.walkThrough = payload;
  },
};

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: UserState,
    payload: MutationPayload[Property]
  ) => void;
};

export const userWalkThroughModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};
