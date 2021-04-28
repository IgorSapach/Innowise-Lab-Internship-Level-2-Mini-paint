<template>
  <canvas
    ref="canvas"
    id="drawing-pad"
    class="drawing"
    @mousedown="mouseEventHandler"
    @mousemove="mouseEventHandler"
    @mouseup="mouseEventHandler"
    @mouseleave="setStopDraw"
    @touchstart="touchEventHandler"
    @touchmove="touchEventHandler"
    @touchend="setStopDraw"
  >
    This is an interactive drawind pad.
  </canvas>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from '@/store';
import * as ToolNames from '@/const/draw-tool-names.js';
import { EventBus } from '@/EventBus.js';
import router from '@/router';

import { ActionTypes } from '@/store/action-types';

import {
  getDrawingCoordinates,
  pencil,
  rect,
  circle,
} from '@/service/canvas-service';

export default defineComponent({
  setup() {
    let painting = false;
    const canvas = ref<HTMLCanvasElement | null>(null);
    let ctx: CanvasRenderingContext2D | null = null;
    let cursorStartPos: { x: number; y: number } = {
      x: 0,
      y: 0,
    };
    let tempImageData: ImageData;

    const store = useStore();
    const drawingProperties = store.state.drawingOptions;

    const bounds = computed(() => {
      if (canvas.value !== null) {
        return {
          left: canvas.value.getBoundingClientRect().left,
          top: canvas.value.getBoundingClientRect().top,
        };
      }
      return { left: 0, top: 0 };
    });
    const canvasSize = computed(() => {
      if (canvas.value !== null)
        return {
          width: canvas.value.width,
          height: canvas.value.height,
        };
      return { width: 0, height: 0 };
    });
    const canvasValues = computed(() => {
      return {
        ctx: ctx,
        canvasSize: canvasSize,
      };
    });

    const setStartPosition = function (cursorPosition: {
      x: number;
      y: number;
    }) {
      painting = true;
      cursorStartPos = getDrawingCoordinates(cursorPosition, bounds.value);

      if (ctx)
        tempImageData = ctx.getImageData(
          0,
          0,
          canvasSize.value.width,
          canvasSize.value.height
        );
      draw(cursorPosition);
    };

    const draw = function (cursorPosition: { x: number; y: number }) {
      if (!painting || ctx === null) return;

      ctx.lineCap = 'round';
      ctx.fillStyle = drawingProperties.lineColor;
      ctx.strokeStyle = drawingProperties.lineColor;
      ctx.lineWidth = drawingProperties.drawLineWidth;

      const cursorValues = {
        cursorStartPos: cursorStartPos,
        cursorPosition: getDrawingCoordinates(cursorPosition, bounds.value),
      };

      if (drawingProperties.activeTool !== ToolNames.PENCIL)
        ctx.putImageData(tempImageData, 0, 0);

      switch (drawingProperties.activeTool) {
        case ToolNames.PENCIL: {
          pencil(canvasValues.value, cursorValues);
          break;
        }
        case ToolNames.FILL_RECT: {
          rect(canvasValues.value, cursorValues, true);
          break;
        }
        case ToolNames.RECT: {
          rect(canvasValues.value, cursorValues);
          break;
        }
        case ToolNames.FILL_CIRCLE: {
          circle(canvasValues.value, cursorValues, true);
          break;
        }
        case ToolNames.CIRCLE: {
          circle(canvasValues.value, cursorValues);
          break;
        }
      }
    };

    const setStopDraw = function () {
      painting = false;
      if (ctx) ctx.beginPath();
    };

    const onSave = () => {
      if (canvas.value) {
        store.dispatch(ActionTypes.ON_SAVE_IMAGE, canvas.value.toDataURL());
        router.push({ name: 'home' });
      }
    };
    const onClear = () => {
      if (ctx)
        ctx.clearRect(0, 0, canvasSize.value.width, canvasSize.value.height);
    };
    const mouseEventHandler = (event) => {
      if (event.type === 'mousedown')
        setStartPosition({ x: event.clientX, y: event.clientY });

      if (event.type === 'mousemove')
        draw({ x: event.clientX, y: event.clientY });

      if (event.type === 'mouseup') setStopDraw();
    };
    const touchEventHandler = (event) => {
      if (event.type === 'touchstart')
        event.touches.forEach((touch) => {
          setStartPosition({ x: touch.clientX, y: touch.clientY });
        });

      if (event.type === 'touchmove')
        event.touches.forEach((touch) => {
          draw({ x: touch.clientX, y: touch.clientY });
        });
    };
    const setCanvasProperties = () => {
      if (canvas.value == null) return;
      ctx = canvas.value ? canvas.value.getContext('2d') : null;
      canvas.value.height = window.innerHeight / 1.4;
      if (window.innerWidth < 1200) {
        canvas.value.width = window.innerWidth;
      } else {
        if (canvas.value) canvas.value.width = window.innerWidth / 1.5;
      }
    };

    onMounted(() => {
      setCanvasProperties();
      EventBus.on('save-image', () => {
        onSave();
      });
      EventBus.on('clear-draw-area', () => {
        onClear();
      });
    });

    return {
      drawingProperties,
      canvas,
      ctx,
      bounds,
      canvasSize,
      canvasValues,
      setStopDraw,
      onSave,
      mouseEventHandler,
      touchEventHandler,
    };
  },
});
</script>
