<template>
  <div class="paint">
    <draw-area class="paint__draw-area" />
    <instruments class="paint__instruments" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import instruments from "../components/paint-items/InstrumentsPanel";
import DrawArea from "../components/paint-items/DrawArea";

export default defineComponent({
  components: { DrawArea, instruments },
});
</script>
