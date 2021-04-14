/* eslint-disable @typescript-eslint/no-this-alias */
<template>
  <div class="p-2">
    <canvas
      ref="canvas"
      id="drawing-pad"
      width="300"
      height="300"
      class="drawing"
      @mousedown="startPainting"
      @mousemove="draw"
      @mouseup="finishedPainting"
      @mouseleave="finishedPainting"
    >
      This is an interactive drawind pad.
    </canvas>
    <div><button @click="onSave">save</button></div>
    <instruments />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import instruments from "../components/intruments/InstrumentsPanel";
import { useStore } from "vuex";

//TODO refactor to setup()
export default defineComponent({
  components: { instruments },
  data() {
    return {
      vueCanvas: null,
      painting: false,
      canvas: null,
      ctx: null,
      drawLineWidth: "1",
      lineColor: "#000000",
    };
  },
  setup() {
    const store = useStore();
    const drawingProperties = store.state.drawingOptions;
    return { drawingProperties };
  },
  methods: {
    startPainting(e) {
      this.painting = true;

      this.draw(e);
    },
    finishedPainting() {
      this.painting = false;
      this.ctx.beginPath();
    },
    draw(e) {
      //fill rect прямоугольник //arc круг
      if (!this.painting) return;
      this.ctx.lineCap = "round";
      this.ctx.fillStyle = this.drawingProperties.lineColor;
      this.ctx.strokeStyle = this.drawingProperties.lineColor;
      this.ctx.lineWidth = this.drawingProperties.drawLineWidth;
      let bounds = this.canvas.getBoundingClientRect();
      this.ctx.lineTo(e.clientX - bounds.left, e.clientY - bounds.top);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX - bounds.left, e.clientY - bounds.top);
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
  },
});
</script>

<style scoped>
.drawing {
  border: 1px solid red;
  cursor: crosshair;
}
.p-2 {
  padding: 2rem;
}
</style>
