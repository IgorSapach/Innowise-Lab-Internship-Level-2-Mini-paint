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

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import * as ToolNames from "@/const/draw-tool-names";
import { EventBus } from "@/EventBus";

export default defineComponent({
  data() {
    return {
      painting: false,
      canvas: null,
      ctx: null,
      sursorStartPos: {
        x: null,
        y: null,
      },
      tempImage: [],
    };
  },
  setup() {
    const store = useStore();
    const drawingProperties = store.state.drawingOptions;

    return { drawingProperties };
  },
  computed: {
    bounds() {
      return {
        left: this.canvas.getBoundingClientRect().left,
        top: this.canvas.getBoundingClientRect().top,
      };
    },
  },
  methods: {
    startPainting(cursorPosition) {
      this.painting = true;
      this.sursorStartPos = getDrawingCoordinates(cursorPosition, this.bounds);
      this.tempImage = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.draw(cursorPosition);
    },
    finishedPainting() {
      this.painting = false;
      this.ctx.beginPath();
    },
    draw(cursorPosition) {
      if (!this.painting) return;
      this.ctx.lineCap = "round";
      this.ctx.fillStyle = this.drawingProperties.lineColor;
      this.ctx.strokeStyle = this.drawingProperties.lineColor;
      this.ctx.lineWidth = this.drawingProperties.drawLineWidth;
      const canvasSize = {
        with: this.canvas.width,
        height: this.canvas.height,
      };
      switch (this.$store.getters["activeTool"]) {
        case ToolNames.PENCIL: {
          pencil(this.ctx, cursorPosition, this.bounds);
          break;
        }
        case ToolNames.FILL_RECT: {
          fillRect(
            this.ctx,
            cursorPosition,
            this.sursorStartPos,
            canvasSize,
            this.tempImage,
            this.bounds
          );
          break;
        }
        case ToolNames.RECT: {
          strokeRect(
            this.ctx,
            cursorPosition,
            this.sursorStartPos,
            canvasSize,
            this.tempImage,
            this.bounds
          );
          break;
        }
        case ToolNames.CIRCLE: {
          circle(
            this.ctx,
            cursorPosition,
            this.sursorStartPos,
            canvasSize,
            this.tempImage,
            this.bounds
          );
          break;
        }
        case ToolNames.FILL_CIRCLE: {
          circle(
            this.ctx,
            cursorPosition,
            this.sursorStartPos,
            canvasSize,
            this.tempImage,
            this.bounds,
            true
          );
          break;
        }
      }
    },
    onSave() {
      this.$store.dispatch("onSaveImage", this.canvas);
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight / 1.2;
    this.canvas.width = window.innerWidth / 1.5;

    EventBus.on("save-image", () => {
      this.onSave();
    });
  },
});
//TODO Move this functions to service, optimize call parameters
function getDrawingCoordinates(cursorPosition, bounds) {
  return {
    x: parseInt(cursorPosition.x - bounds.left),
    y: parseInt(cursorPosition.y - bounds.top),
  };
}
function pencil(ctx, cursorPosition, bounds) {
  ctx.lineTo(
    getDrawingCoordinates(cursorPosition, bounds).x,
    getDrawingCoordinates(cursorPosition, bounds).y
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    getDrawingCoordinates(cursorPosition, bounds).x,
    getDrawingCoordinates(cursorPosition, bounds).y
  );
  return ctx;
}
function fillRect(
  ctx,
  cursorPosition,
  sursorStartPos,
  canvas,
  tempImage,
  bounds
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(tempImage, 0, 0);

  ctx.fillRect(
    sursorStartPos.x,
    sursorStartPos.y,
    getDrawingCoordinates(cursorPosition, bounds).x - sursorStartPos.x,
    getDrawingCoordinates(cursorPosition, bounds).y - sursorStartPos.y
  );
  return ctx;
}
function strokeRect(
  ctx,
  cursorPosition,
  sursorStartPos,
  canvas,
  tempImage,
  bounds
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(tempImage, 0, 0);
  ctx.strokeRect(
    sursorStartPos.x,
    sursorStartPos.y,
    getDrawingCoordinates(cursorPosition, bounds).x - sursorStartPos.x,
    getDrawingCoordinates(cursorPosition, bounds).y - sursorStartPos.y
  );
  return ctx;
}
function circle(
  ctx,
  cursorPosition,
  sursorStartPos,
  canvas,
  tempImage,
  bounds,
  isFill
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(tempImage, 0, 0);
  ctx.beginPath();
  const radius = Math.sqrt(
    Math.pow(
      sursorStartPos.x - getDrawingCoordinates(cursorPosition, bounds).x,
      2
    ) +
      Math.pow(
        sursorStartPos.y - getDrawingCoordinates(cursorPosition, bounds).y,
        2
      )
  );
  ctx.arc(sursorStartPos.x, sursorStartPos.y, radius, 0, 2 * Math.PI);
  if (isFill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
  ctx.closePath();
  return ctx;
}
</script>
