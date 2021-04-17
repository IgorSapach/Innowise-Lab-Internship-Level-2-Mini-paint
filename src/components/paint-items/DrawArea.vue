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
      switch (this.$store.getters["activeTool"]) {
        case ToolNames.PENCIL: {
          this.ctx.lineTo(
            getDrawingCoordinates(cursorPosition, this.bounds).x,
            getDrawingCoordinates(cursorPosition, this.bounds).y
          );
          this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.moveTo(
            getDrawingCoordinates(cursorPosition, this.bounds).x,
            getDrawingCoordinates(cursorPosition, this.bounds).y
          );
          break;
        }
        case ToolNames.RECT: {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.putImageData(this.tempImage, 0, 0);

          this.ctx.strokeRect(
            this.sursorStartPos.x,
            this.sursorStartPos.y,
            getDrawingCoordinates(cursorPosition, this.bounds).x -
              this.sursorStartPos.x,
            getDrawingCoordinates(cursorPosition, this.bounds).y -
              this.sursorStartPos.y
          );
          // this.ctx.stroke();
          // this.ctx.fill();
          break;
        }
        case ToolNames.CIRCLE: {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.putImageData(this.tempImage, 0, 0);
          this.ctx.beginPath();
          const radius = Math.sqrt(
            Math.pow(
              this.sursorStartPos.x -
                getDrawingCoordinates(cursorPosition, this.bounds).x,
              2
            ) +
              Math.pow(
                this.sursorStartPos.y -
                  getDrawingCoordinates(cursorPosition, this.bounds).y,
                2
              )
          );
          this.ctx.arc(
            this.sursorStartPos.x,
            this.sursorStartPos.y,
            radius,
            0,
            2 * Math.PI
          );
          this.ctx.stroke();
          // this.ctx.fill();
          this.ctx.closePath();
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
function getDrawingCoordinates(cursorPosition, bounds) {
  return {
    x: parseInt(cursorPosition.x - bounds.left),
    y: parseInt(cursorPosition.y - bounds.top),
  };
}
</script>
