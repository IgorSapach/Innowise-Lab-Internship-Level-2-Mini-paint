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
    <div>
      <div
        @click="setActiveTool(ToolNames.PENCIL)"
        class="tool-selection__item"
        :class="{
          activeTool: drawingProperties.activeTool === ToolNames.PENCIL,
        }"
      >
        pencil
      </div>
      <div
        @click="setActiveTool(ToolNames.RECT)"
        class="tool-selection__item"
        :class="{
          activeTool: drawingProperties.activeTool === ToolNames.RECT,
        }"
      >
        rect
      </div>
      <div><button @click="onSave">save</button></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import * as ToolNames from "@/const/draw-tool-names";
import { EventBus } from "@/EventBus";

export default defineComponent({
  data() {
    return {
      ToolNames,
    };
  },
  setup() {
    const store = useStore();
    const drawingProperties = reactive(store.state.drawingOptions);
    const setActiveTool = function (value) {
      store.commit("setActiveTool", value);
    };

    return { drawingProperties, setActiveTool };
  },
  methods: {
    onSave() {
      EventBus.emit("some-event");
    },
  },
});
</script>
<style scoped>
.tool-selection__item {
  width: 50px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.activeTool {
  border: 3px solid black;
}
</style>
