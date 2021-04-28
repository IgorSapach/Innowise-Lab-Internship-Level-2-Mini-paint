import { GetterTree, MutationTree } from 'vuex';
import { MutationTypes } from '../mutation-types';

export const state: drawingOptionsType = {
  drawingOptions: {
    drawLineWidth: 1,
    lineColor: '#000000',
    activeTool: 'pencil',
  },
};
export type drawingOptionsType = {
  drawingOptions: {
    drawLineWidth: number;
    lineColor: string;
    activeTool: string;
  };
};

export type Getters = {
  drawingOptions(
    state: State
  ): {
    drawLineWidth: number;
    lineColor: string;
    activeTool: string;
  };
};

export const getters: GetterTree<State, State> & Getters = {
  drawingOptions: (state) => {
    return state.drawingOptions;
  },
};

export type MutationPayload = {
  [MutationTypes.SET_ACTIVE_TOOL]: string;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ACTIVE_TOOL](state, payload: string) {
    state.drawingOptions.activeTool = payload;
  },
};

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: State,
    payload: MutationPayload[Property]
  ) => void;
};

type State = typeof state;
