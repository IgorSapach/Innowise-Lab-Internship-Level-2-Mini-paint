import { GetterTree, MutationTree, Module } from 'vuex';

import { RootState } from './../index';
import { MutationTypes } from '../mutation-types';

export type drawingOptionsType = {
  lineWidth: number;
  lineColor: string;
  activeTool: string;
};

export const state: drawingOptionsType = {
  lineWidth: 1,
  lineColor: '#000000',
  activeTool: 'pencil',
};

type DrawingOptionsState = typeof state;

export type Getters = {
  lineWidth(state: DrawingOptionsState): number;

  lineColor(state: DrawingOptionsState): string;

  activeTool(state: DrawingOptionsState): string;
};

export const getters: GetterTree<DrawingOptionsState, RootState> & Getters = {
  lineWidth: (state) => {
    return state.lineWidth;
  },
  lineColor: (state) => {
    return state.lineColor;
  },
  activeTool: (state) => {
    return state.activeTool;
  },
};

export type MutationPayload = {
  [MutationTypes.SET_ACTIVE_TOOL]: string;
  [MutationTypes.SET_LINE_COLOR]: string;
  [MutationTypes.SET_LINE_WIDTH]: number;
};

export const mutations: MutationTree<DrawingOptionsState> & Mutations = {
  [MutationTypes.SET_ACTIVE_TOOL](state, payload: string) {
    state.activeTool = payload;
  },
  [MutationTypes.SET_LINE_COLOR](state, payload: string) {
    state.lineColor = payload;
  },
  [MutationTypes.SET_LINE_WIDTH](state, payload: number) {
    state.lineWidth = payload;
  },
};

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: DrawingOptionsState,
    payload: MutationPayload[Property]
  ) => void;
};

export const drawingOptionsModule: Module<DrawingOptionsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};
