<template>
  <div class="paint">
    <draw-area
      :saveTrigger="saveTrigger"
      :clearTrigger="clearTrigger"
      class="paint__draw-area"
    />
    <instruments
      @onSave="onSaveClick"
      @onClear="onClearClick"
      class="paint__instruments"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import instruments from '@/components/paint-items/InstrumentsPanel.vue';
import DrawArea from '@/components/paint-items/DrawArea.vue';

export default defineComponent({
  components: { DrawArea, instruments },

  setup() {
    let saveTrigger = ref(false);
    let clearTrigger = ref(false);

    const onSaveClick = () => {
      saveTrigger.value = !saveTrigger.value;
    };
    const onClearClick = () => {
      clearTrigger.value = !clearTrigger.value;
    };
    return { saveTrigger, onSaveClick, clearTrigger, onClearClick };
  },
});
</script>
