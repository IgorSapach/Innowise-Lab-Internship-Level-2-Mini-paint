import { GetterTree, MutationTree, Module } from 'vuex';

import { RootState } from './../index';
import { MutationTypes } from '../mutation-types';

export type drawingOptionsType = {
  drawingOptions: {
    drawLineWidth: number;
    lineColor: string;
    activeTool: string;
  };
};

export const state: drawingOptionsType = {
  drawingOptions: {
    drawLineWidth: 1,
    lineColor: '#000000',
    activeTool: 'pencil',
  },
};

type DrawingOptionsState = typeof state;

export type Getters = {
  drawingOptions(
    state: DrawingOptionsState
  ): {
    drawLineWidth: number;
    lineColor: string;
    activeTool: string;
  };
};

export const getters: GetterTree<DrawingOptionsState, RootState> & Getters = {
  drawingOptions: (state) => {
    return state.drawingOptions;
  },
};

export type MutationPayload = {
  [MutationTypes.SET_ACTIVE_TOOL]: string;
};

export const mutations: MutationTree<DrawingOptionsState> & Mutations = {
  [MutationTypes.SET_ACTIVE_TOOL](state, payload: string) {
    state.drawingOptions.activeTool = payload;
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
