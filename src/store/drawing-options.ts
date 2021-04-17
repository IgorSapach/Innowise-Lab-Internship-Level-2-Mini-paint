export default {
  state: {
    drawLineWidth: "1",
    lineColor: "#000000",
    activeTool: "pencil",
  },
  getters: {
    activeTool: (state: { activeTool: string }) => state.activeTool,
  },
  mutations: {
    setActiveTool(
      state: { activeTool: { activeTool: string } },
      payload: { activeTool: string }
    ) {
      state.activeTool = payload;
    },
  },
  actions: {},
};
