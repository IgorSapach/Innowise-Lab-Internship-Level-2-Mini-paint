import { ComputedRef } from 'vue';

export interface canvasContext {
  ctx?: CanvasRenderingContext2D | null;
  canvasSize: ComputedRef<{ width: number; height: number }>;
}

export interface cursorProperties {
  cursorStartPos: {
    x: number;
    y: number;
  };
  cursorPosition: {
    x: number;
    y: number;
  };
}
