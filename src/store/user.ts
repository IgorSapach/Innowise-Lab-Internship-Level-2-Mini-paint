import firebase from "firebase";
import { Ref } from "vue";

export default {
  state: {
    savedImages: {},
  },
  getters: {
    savedImages: (state: { savedImages: { string: HTMLImageElement } }) =>
      state.savedImages,
  },
  mutations: {
    setImages(
      state: { savedImages: { string: HTMLImageElement } },
      payload?: { string: HTMLImageElement }
    ): void {
      if (payload) state.savedImages = payload;
    },
  },
  actions: {
    getImages(state: any): void {
      firebase
        .database()
        .ref(`${state.rootState.userId}/`) //Ask with Andrei about ts "Property 'rootState' does not exist on type '{ savedImages: { string: HTMLImageElement; }; }"
        .on("value", (dataSnapshot) => {
          state.commit("setImages", dataSnapshot.val());
        });
    },
    onSaveImage(state: any, image: Ref<HTMLCanvasElement | null>) {
      if (image) {
        return firebase
          .database()
          .ref(`${state.rootState.userId}/`) //Ask with Andrei about ts "Property 'rootState' does not exist on type '{ savedImages: { string: HTMLImageElement; }; }"
          .push(image)
          .catch((err) => alert(err.message));
      }
    },
  },
};
