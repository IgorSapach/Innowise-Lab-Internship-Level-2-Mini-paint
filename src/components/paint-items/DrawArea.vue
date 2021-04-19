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
import { computed, defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import * as ToolNames from "@/const/draw-tool-names";
import { EventBus } from "@/EventBus";
import { getDrawingCoordinates } from "@/service/canvas-service";
import router from "@/router";

export default defineComponent({
  setup() {
    let painting = false;
    const canvas = ref<HTMLCanvasElement | null>(null);
    let ctx: any = null;
    let cursorStartPos: any = {
      x: null,
      y: null,
    };
    let tempImageData: any = [];

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
      tempImageData = ctx.getImageData(
        0,
        0,
        canvasSize.value.width,
        canvasSize.value.height
      );
      draw(cursorPosition);
    };
    const draw = function (cursorPosition: { x: number; y: number }) {
      if (!painting) return;
      ctx.lineCap = "round";
      ctx.fillStyle = drawingProperties.lineColor;
      ctx.strokeStyle = drawingProperties.lineColor;
      ctx.lineWidth = drawingProperties.drawLineWidth;
      const cursorValues = {
        cursorStartPos: cursorStartPos,
        cursorPosition: getDrawingCoordinates(cursorPosition, bounds.value),
        isFill: false,
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
      ctx.beginPath();
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
//TODO Move this functions to service, optimize call parameters
function pencil(canvas: any, properties: any) {
  canvas.ctx.lineTo(properties.cursorPosition.x, properties.cursorPosition.y);
  canvas.ctx.stroke();
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(properties.cursorPosition.x, properties.cursorPosition.y);
  return canvas.ctx;
}
function rect(canvas: any, properties: any, isFill = false) {
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
function circle(canvas: any, properties: any, isFill = false) {
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
</script>
