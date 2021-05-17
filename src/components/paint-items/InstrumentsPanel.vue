<template>
  <div>
    <div class="paint__instruments_item">
      <div
        class="paint__instruments_brush-options"
        :ref="instrumentsProperties.color.item"
      >
        <input
          class="color_picker"
          type="color"
          id="color"
          @change="setLineColor"
        />
      </div>
      <div
        class="paint__instruments_brush-options"
        :ref="instrumentsProperties.width.item"
      >
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
      <div
        class="paint__instruments_brush-item"
        :ref="instrumentsProperties.pencil.item"
      >
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
      <div
        class="paint__instruments_brush-item"
        :ref="instrumentsProperties.fillSquare.item"
      >
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
      </div>
      <div
        class="paint__instruments_brush-item"
        :ref="instrumentsProperties.square.item"
      >
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
      <div
        class="paint__instruments_brush-item"
        :ref="instrumentsProperties.fillCircle.item"
      >
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
      </div>
      <div
        class="paint__instruments_brush-item"
        :ref="instrumentsProperties.circle.item"
      >
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
        <button class="button" @click="$emit('onClear')">Clear</button>
      </div>
      <div class="action_button">
        <button class="button" @click="$emit('onSave')">Save</button>
      </div>
    </div>
    <instrumentsWalkthrough :instuments="instrumentsArray" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import * as ToolNames from '@/const/draw-tool-names.js';
import { MutationTypes } from '@/store/mutation-types';

import instrumentsWalkthrough from './InstrumentsWalkthrough.vue';

export default defineComponent({
  components: { instrumentsWalkthrough },
  emits: ['onSave', 'onClear'],
  data() {
    return {
      ToolNames,
    };
  },
  setup() {
    const store = useStore();

    const instrumentsProperties = {
      color: { item: ref(null), description: 'it`s color picker' },
      width: { item: ref(null), description: 'it`s width of line' },
      pencil: { item: ref(null), description: 'it`s a pencil' },
      fillSquare: { item: ref(null), description: 'it`s filled square' },
      square: { item: ref(null), description: 'it`s square' },
      fillCircle: { item: ref(null), description: 'it`s filled circle' },
      circle: { item: ref(null), description: 'it`s circle' },
    };
    const instrumentsArray = Object.values(instrumentsProperties);

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

    return {
      lineColor,
      setLineColor,
      lineWidth,
      setLineWidth,
      activeTool,
      setActiveTool,
      instrumentsProperties,
      instrumentsArray,
    };
  },
});
</script>
<style>
.overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #66666666;
  z-index: 1;
}
</style>
