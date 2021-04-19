import firebase from "firebase";

export default {
  state: {
    savedImages: {},
  },
  getters: {
    savedImages: (state: any) => state.savedImages,
  },
  mutations: {
    setImages(state: any, payload: any) {
      state.savedImages = payload;
    },
  },
  actions: {
    getImages(state: any) {
      return firebase
        .database()
        .ref(`${state.rootState.userId}/`)
        .on("value", (dataSnapshot) => {
          state.commit("setImages", dataSnapshot.val());
        });
    },
    onSaveImage(state: any, image: any) {
      return firebase
        .database()
        .ref(`${state.rootState.userId}/`)
        .push(image)
        .catch((err) => alert(err.message));
    },
  },
};
