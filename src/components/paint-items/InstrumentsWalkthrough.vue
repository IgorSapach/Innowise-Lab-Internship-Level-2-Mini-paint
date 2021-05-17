<template>
  <div v-if="!walkThrough" class="overlay">
    <div class="overlay_description">
      {{ description }}
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { EventBus } from '@/EventBus';

export default defineComponent({
  props: { instuments: { type: Array } },

  setup(instuments) {
    const store = useStore();

    const walkThrough = computed(() => {
      if (store.getters['userWalkThrough/walkThrough']) {
        return store.getters['userWalkThrough/walkThrough']
          .instrumentsWalkThrough;
      }
      return false;
    });

    let description = ref('');

    const walkThroughAnimation = () => {
      if (!walkThrough.value) {
        let instrArr = instuments.instuments;
        let index = 0;
        let interval = setInterval(() => {
          if (index > 0) {
            instrArr[index - 1].item.value.style.zIndex = '1';
            instrArr[index - 1].item.value.style.transform = 'scale(1.0)';
          }

          description.value = instrArr[index].description;
          console.log(description);
          instrArr[index++].item.value.style.zIndex = '2';
          instrArr[index - 1].item.value.style.transform = 'scale(1.6)';

          if (index == instrArr.length) {
            clearInterval(interval);

            setTimeout(() => {
              store.dispatch(`user/${ActionTypes.SET_USER_INFO}`, {
                instrumentsWalkThrough: true,
              });

              instrArr.forEach((value) => {
                value.item.value.style.zIndex = '1';
                value.item.value.style.transform = 'scale(1.0)';
              });
            }, 1000);
          }
        }, 1000);
      }
    };

    onMounted(() => {
      EventBus.on('walkThroughAnimation', () => {
        walkThroughAnimation();
      });
    });
    return { walkThrough, description };
  },
});
</script>
