<template>
  <div>
    <div v-for="item in images" :key="item">
      <div v-for="elem in item" :key="elem"><img :src="elem" /></div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const images = store.state.savedUsersImages;
    console.log(images);

    return { images };
  },
});
</script>
