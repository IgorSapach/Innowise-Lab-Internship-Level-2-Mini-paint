<template>
  <canvas
    ref="canvas"
    id="drawing-pad"
    class="drawing"
    @mousedown="startPainting({ x: $event.clientX, y: $event.clientY })"
    @mousemove="draw({ x: $event.clientX, y: $event.clientY })"
    @mouseup="finishedPainting"
    @mouseleave="finishedPainting"
  >
    This is an interactive drawind pad.
  </canvas>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import * as ToolNames from "@/const/draw-tool-names.js";
import { EventBus } from "@/EventBus.js";
import router from "@/router";

import {
  getDrawingCoordinates,
  pencil,
  rect,
  circle,
} from "@/service/canvas-service";

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

    const startPainting = function (cursorPosition: { x: number; y: number }) {
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
      ctx.lineCap = "round";
      ctx.fillStyle = drawingProperties.lineColor;
      ctx.strokeStyle = drawingProperties.lineColor;
      ctx.lineWidth = drawingProperties.drawLineWidth;
      const cursorValues = {
        cursorStartPos: cursorStartPos,
        cursorPosition: getDrawingCoordinates(cursorPosition, bounds.value),
      };
      if (store.getters.activeTool !== ToolNames.PENCIL)
        ctx.putImageData(tempImageData, 0, 0);
      switch (store.getters.activeTool) {
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

    const finishedPainting = function () {
      painting = false;
      if (ctx) ctx.beginPath();
    };

    const onSave = () => {
      if (canvas.value)
        store.dispatch("onSaveImage", canvas.value.toDataURL()).then(() => {
          router.push({ name: "home" });
        });
    };

    onMounted(() => {
      ctx = canvas.value ? canvas.value.getContext("2d") : null;
      if (canvas.value) canvas.value.height = window.innerHeight / 1.2;
      if (canvas.value) canvas.value.width = window.innerWidth / 1.5;

      EventBus.on("save-image", () => {
        onSave();
      });
    });

    return {
      drawingProperties,
      canvas,
      ctx,
      bounds,
      canvasSize,
      canvasValues,
      startPainting,
      draw,
      finishedPainting,
      onSave,
    };
  },
});
</script>
