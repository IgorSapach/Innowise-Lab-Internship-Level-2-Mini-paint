function getDrawingCoordinates(
  cursorPosition: { x: number; y: number },
  bounds: { left: number; top: number }
): { x: number; y: number } {
  return {
    x: cursorPosition.x - bounds.left,
    y: cursorPosition.y - bounds.top,
  };
}
export { getDrawingCoordinates };
