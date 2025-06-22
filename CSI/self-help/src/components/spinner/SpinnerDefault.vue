<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 25
  }
});
</script>



<template>
  <div class="d-flex justify-content-center align-items-center">
    <span class="loader" :style="{
      width: `${props.size}px`,
      height: `${props.size}px`
    }" />
  </div>
</template>



<style scoped>
.loader {
  border: 3px solid #fff;
  border-bottom-color: var(--primary);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
