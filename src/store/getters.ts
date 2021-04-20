import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  userId(state: State): string;
  isAuth(state: State): boolean;
  savedImages(state: State): { image?: HTMLImageElement };
  drawingOptions(
    state: State
  ): {
    drawLineWidth: number;
    lineColor: string;
    activeTool: string;
  };
};

export const getters: GetterTree<State, State> & Getters = {
  userId: (state) => {
    return state.userId;
  },
  isAuth: (state) => {
    return state.userId !== '';
  },
  savedImages: (state) => {
    return state.savedImages;
  },
  drawingOptions: (state) => {
    return state.drawingOptions;
  },
};
