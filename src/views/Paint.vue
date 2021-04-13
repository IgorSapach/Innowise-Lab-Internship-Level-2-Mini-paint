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
    <div><input type="color" id="color" v-model="lineColor" /></div>
    <div>
      <input type="range" min="1" max="100" v-model="drawLineWidth" />
      {{ drawLineWidth + "px" }}
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
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
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.lineWidth = this.drawLineWidth;
      let bounds = this.canvas.getBoundingClientRect();
      this.ctx.lineTo(e.clientX - bounds.left, e.clientY - bounds.top);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX - bounds.left, e.clientY - bounds.top);
    },
  },
  mounted() {
    this.canvas = document.getElementById("drawing-pad");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight / 1.2;
    this.canvas.width = window.innerWidth / 1.5;
    // Resize canvas
  },
  // data() {
  //   return {
  //     canvas: null,
  //     context: null,
  //     isDrawing: null,
  //     startX: 0,
  //     startY: 0,
  //     points: [],
  //   };
  // },methods: {
  //   mousedown(e){
  //     var vm = this.context
  //     var rect
  //   }
  // },
  // mounted() {
  //   var vm = this.context;
  //   vm.canvas = vm.$refs.canvas;
  //   vm.context = vm.canvas.getContext("2d");
  //   vm.canvas.addEventListener("mousedown", vm.mousedown);
  //   vm.canvas.addEventListener("mousemove", vm.mousemove);
  //   document.addEventListener('mouseup', vm.mouseup);
  // },
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
