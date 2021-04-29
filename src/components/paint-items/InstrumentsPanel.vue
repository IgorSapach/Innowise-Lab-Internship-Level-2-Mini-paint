<template>
  <div>
    <div class="paint__instruments_item">
      <div class="paint__instruments_brush-options">
        <input
          class="color_picker"
          type="color"
          id="color"
          @change="setLineColor"
        />
      </div>
      <div class="paint__instruments_brush-options">
        <input
          type="range"
          min="1"
          max="100"
          :value="lineWidth"
          @change="setLineWidth"
        />
      </div>
    </div>
    <div class="paint__instruments_brush">
      <div class="paint__instruments_brush-item">
        <div
          @click="setActiveTool(ToolNames.PENCIL)"
          class="paint__instruments_brush-selection"
          :class="{
            activeTool: activeTool === ToolNames.PENCIL,
          }"
        >
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
            size="2x"
            :color="lineColor"
          />
        </div>
      </div>
      <div class="paint__instruments_brush-item">
        <div
          @click="setActiveTool(ToolNames.FILL_RECT)"
          :class="{
            activeTool: activeTool === ToolNames.FILL_RECT,
          }"
          class="paint__instruments_brush-selection"
        >
          <font-awesome-icon
            :icon="['fas', 'square']"
            size="2x"
            :color="lineColor"
          />
        </div>
        <div
          @click="setActiveTool(ToolNames.RECT)"
          :class="{
            activeTool: activeTool === ToolNames.RECT,
          }"
          class="paint__instruments_brush-selection"
        >
          <font-awesome-icon
            :icon="['far', 'square']"
            size="2x"
            :color="lineColor"
          />
        </div>
      </div>
      <div class="paint__instruments_brush-item">
        <div
          @click="setActiveTool(ToolNames.FILL_CIRCLE)"
          :class="{
            activeTool: activeTool === ToolNames.FILL_CIRCLE,
          }"
          class="paint__instruments_brush-selection"
        >
          <font-awesome-icon
            :icon="['fas', 'circle']"
            size="2x"
            :color="lineColor"
          />
        </div>
        <div
          @click="setActiveTool(ToolNames.CIRCLE)"
          :class="{
            activeTool: activeTool === ToolNames.CIRCLE,
          }"
          class="paint__instruments_brush-selection"
        >
          <font-awesome-icon
            :icon="['far', 'circle']"
            size="2x"
            :color="lineColor"
          />
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
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import * as ToolNames from '@/const/draw-tool-names.js';
import { EventBus } from '@/EventBus.js';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  data() {
    return {
      ToolNames,
    };
  },
  setup() {
    const store = useStore();

    const lineColor = computed(() => {
      return store.getters['drawingOptions/lineColor'];
    });
    const setLineColor = (event) => {
      store.commit(
        `drawingOptions/${MutationTypes.SET_LINE_COLOR}`,
        event?.target.value
      );
    };

    const lineWidth = computed(() => {
      return store.getters['drawingOptions/lineWidth'];
    });
    const setLineWidth = (event) => {
      store.commit(
        `drawingOptions/${MutationTypes.SET_LINE_WIDTH}`,
        event?.target.value
      );
    };

    const activeTool = computed(() => {
      return store.getters['drawingOptions/activeTool'];
    });
    const setActiveTool = function (value: string) {
      store.commit(`drawingOptions/${MutationTypes.SET_ACTIVE_TOOL}`, value);
    };

    //TODO refactor to emit+props
    const onSave = () => {
      EventBus.emit('save-image');
    };
    //TODO refactor to emit+props
    const onClear = () => {
      EventBus.emit('clear-draw-area');
    };

    return {
      lineColor,
      setLineColor,
      lineWidth,
      setLineWidth,
      activeTool,
      setActiveTool,
      onSave,
      onClear,
    };
  },
});
</script>
