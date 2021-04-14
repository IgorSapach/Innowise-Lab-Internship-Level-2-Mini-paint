<template>
  <div>
    <div>
      <input type="color" id="color" v-model="drawingProperties.lineColor" />
    </div>
    <div>
      <input
        type="range"
        min="1"
        max="100"
        v-model="drawingProperties.drawLineWidth"
      />
      {{ drawingProperties.drawLineWidth }}
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const drawingProperties = reactive(store.state.drawingOptions);
    return { drawingProperties };
  },
});
</script>
