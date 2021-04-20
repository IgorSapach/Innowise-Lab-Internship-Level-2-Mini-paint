<template>
  <div class="paint">
    <draw-area class="paint__draw-area" />
    <instruments class="paint__instruments" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import instruments from '@/components/paint-items/InstrumentsPanel.vue';
import DrawArea from '@/components/paint-items/DrawArea.vue';

export default defineComponent({
  components: { DrawArea, instruments },
});
</script>
