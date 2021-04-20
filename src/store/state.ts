export const state = {
  counter: 0,
  userId: "",
  savedImages: {},
  drawingOptions: {
    drawLineWidth: 1,
    lineColor: "#000000",
    activeTool: "pencil",
  },
};
export type State = typeof state;
