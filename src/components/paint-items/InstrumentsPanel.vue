<template>
  <div>
    <div class="paint__instruments_item">
      <div class="paint__instruments_brush-options">
        <input id="color" v-model="drawingProperties.lineColor" class="color_picker" type="color" />
      </div>
      <div class="paint__instruments_brush-options">
        <input v-model="drawingProperties.drawLineWidth" type="range" min="1" max="100" />
      </div>
    </div>
    <div class="paint__instruments_brush">
      <div class="paint__instruments_brush-item">
        <div
          class="paint__instruments_brush-selection"
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.PENCIL,
          }"
          @click="setActiveTool(ToolNames.PENCIL)"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" size="2x" :color="iconColor" />
        </div>
      </div>
      <div class="paint__instruments_brush-item">
        <div
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.FILL_RECT,
          }"
          class="paint__instruments_brush-selection"
          @click="setActiveTool(ToolNames.FILL_RECT)"
        >
          <font-awesome-icon :icon="['fas', 'square']" size="2x" :color="iconColor" />
        </div>
        <div
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.RECT,
          }"
          class="paint__instruments_brush-selection"
          @click="setActiveTool(ToolNames.RECT)"
        >
          <font-awesome-icon :icon="['far', 'square']" size="2x" :color="iconColor" />
        </div>
      </div>
      <div class="paint__instruments_brush-item">
        <div
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.FILL_CIRCLE,
          }"
          class="paint__instruments_brush-selection"
          @click="setActiveTool(ToolNames.FILL_CIRCLE)"
        >
          <font-awesome-icon :icon="['fas', 'circle']" size="2x" :color="iconColor" />
        </div>
        <div
          :class="{
            activeTool: drawingProperties.activeTool === ToolNames.CIRCLE,
          }"
          class="paint__instruments_brush-selection"
          @click="setActiveTool(ToolNames.CIRCLE)"
        >
          <font-awesome-icon :icon="['far', 'circle']" size="2x" :color="iconColor" />
        </div>
      </div>
    </div>
    <div class="paint__instruments_item_actions">
      <div class="action_button">
        <button class="button" @click="onClear">Clear</button>
      </div>
      <div class="action_button">
        <button class="button" @click="onSave">Save</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from '@/store/store';
import * as ToolNames from '@/const/draw-tool-names.js';
import { EventBus } from '@/EventBus.js';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  setup() {
    const store = useStore();

    const drawingProperties = reactive(store.state.drawingOptions);

    const setActiveTool = function (value: string) {
      store.commit(MutationTypes.SET_ACTIVE_TOOL, value);
    };

    const onSave = () => {
      EventBus.emit('save-image');
    };

    const onClear = () => {
      EventBus.emit('clear-draw-area');
    };

    const iconColor = computed(() => store.getters.drawingOptions.lineColor);

    return { drawingProperties, setActiveTool, onSave, onClear, iconColor };
  },
  data() {
    return {
      ToolNames,
    };
  },
});
</script>
