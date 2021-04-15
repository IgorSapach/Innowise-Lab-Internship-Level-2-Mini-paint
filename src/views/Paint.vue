<template>
  <div class="d-flex justify-content-center align-items-center height-100">
    <draw-area />
    <instruments />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import instruments from "../components/paint-items/InstrumentsPanel";
import DrawArea from "../components/paint-items/DrawArea";

export default defineComponent({
  components: { DrawArea, instruments },
});
</script>

<style scoped>
.drawing {
  border: 1px solid red;
  cursor: crosshair;
}
</style>
