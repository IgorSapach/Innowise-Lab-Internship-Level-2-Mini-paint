<template>
  <div>
    <div class="paint__instruments_item">
      <input type="color" id="color" v-model="drawingProperties.lineColor" />
    </div>
    <div class="paint__instruments_item">
      <input
        class="paint__instruments_item_input"
        type="range"
        min="1"
        max="100"
        v-model="drawingProperties.drawLineWidth"
      />
      {{ drawingProperties.drawLineWidth + "px" }}
    </div>
    <div class="paint__instruments_item">
      <div
        @click="setActiveTool(ToolNames.PENCIL)"
        class="paint__instruments_item"
        :class="{
          activeTool: drawingProperties.activeTool === ToolNames.PENCIL,
        }"
      >
        <font-awesome-icon :icon="['fas', 'pencil-alt']" size="2x" />
      </div>
      <div class="paint__instruments_item">
        <div
          @click="setActiveTool(ToolNames.FILL_RECT)"
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.FILL_RECT,
          }"
          class="paint__instruments_item_button"
        >
          <font-awesome-icon :icon="['fas', 'square']" size="2x" />
        </div>
        <div
          @click="setActiveTool(ToolNames.RECT)"
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.RECT,
          }"
          class="paint__instruments_item_button"
        >
          <font-awesome-icon :icon="['far', 'square']" size="2x" />
        </div>
      </div>
      <div class="paint__instruments_item">
        <div
          @click="setActiveTool(ToolNames.FILL_CIRCLE)"
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.FILL_CIRCLE,
          }"
          class="paint__instruments_item_button"
        >
          <font-awesome-icon :icon="['fas', 'circle']" size="2x" />
        </div>
        <div
          @click="setActiveTool(ToolNames.CIRCLE)"
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.CIRCLE,
          }"
          class="paint__instruments_item_button"
        >
          <font-awesome-icon :icon="['far', 'circle']" size="2x" />
        </div>
      </div>
      <div class="save_button">
        <button class="button" @click="onSave">save</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "@/store/store";
import * as ToolNames from "@/const/draw-tool-names.js";
import { EventBus } from "@/EventBus.js";
import { MutationTypes } from "@/store/mutation-types";

export default defineComponent({
  data() {
    return {
      ToolNames,
    };
  },
  setup() {
    const store = useStore();
    const drawingProperties = reactive(store.state.drawingOptions);
    const setActiveTool = function (value: string) {
      store.commit(MutationTypes.SET_ACTIVE_TOOL, value);
    };
    const onSave = () => {
      EventBus.emit("save-image");
    };

    return { drawingProperties, setActiveTool, onSave };
  },
});
</script>
