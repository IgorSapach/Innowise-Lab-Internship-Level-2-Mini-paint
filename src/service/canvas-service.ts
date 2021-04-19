import { canvasContext, cursorProperties } from "@/interface/types";

function getDrawingCoordinates(
  cursorPosition: { x: number; y: number },
  bounds: { left: number; top: number }
): { x: number; y: number } {
  return {
    x: cursorPosition.x - bounds.left,
    y: cursorPosition.y - bounds.top,
  };
}

function pencil(
  canvas: canvasContext,
  properties: cursorProperties
): CanvasRenderingContext2D | null {
  if (!canvas.ctx) return null;
  canvas.ctx.lineTo(properties.cursorPosition.x, properties.cursorPosition.y);
  canvas.ctx.stroke();
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(properties.cursorPosition.x, properties.cursorPosition.y);
  return canvas.ctx;
}

function rect(
  canvas: canvasContext,
  properties: cursorProperties,
  isFill = false
): CanvasRenderingContext2D | null {
  if (!canvas.ctx) return null;
  if (isFill) {
    canvas.ctx.fillRect(
      properties.cursorStartPos.x,
      properties.cursorStartPos.y,
      properties.cursorPosition.x - properties.cursorStartPos.x,
      properties.cursorPosition.y - properties.cursorStartPos.y
    );
  } else {
    canvas.ctx.strokeRect(
      properties.cursorStartPos.x,
      properties.cursorStartPos.y,
      properties.cursorPosition.x - properties.cursorStartPos.x,
      properties.cursorPosition.y - properties.cursorStartPos.y
    );
  }
  return canvas.ctx;
}

function circle(
  canvas: canvasContext,
  properties: cursorProperties,
  isFill = false
): CanvasRenderingContext2D | null {
  if (!canvas.ctx) return null;
  canvas.ctx.beginPath();
  const radius = Math.sqrt(
    Math.pow(properties.cursorStartPos.x - properties.cursorPosition.x, 2) +
      Math.pow(properties.cursorStartPos.y - properties.cursorPosition.y, 2)
  );
  canvas.ctx.arc(
    properties.cursorStartPos.x,
    properties.cursorStartPos.y,
    radius,
    0,
    2 * Math.PI
  );
  if (isFill) {
    canvas.ctx.fill();
  } else {
    canvas.ctx.stroke();
  }
  canvas.ctx.closePath();
  return canvas.ctx;
}

export { getDrawingCoordinates, pencil, rect, circle };
