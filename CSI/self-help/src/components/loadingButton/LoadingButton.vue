<script setup>
import SpinnerDefault from '@/components/spinner/SpinnerDefault.vue'

const props = defineProps({
  onClick: {
    type: Function,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  btnType: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>



<template>
  <button :class="`btn btn-${props.btnType} d-flex align-items-center justify-content-center`" @click="props.onClick"
    :disabled="props.isLoading || props.disabled" style="min-width: 180px">
    <span style="min-width: 150px">{{ props.label }}</span>
    <SpinnerDefault v-if="props.isLoading" :size="20" class="me-2" />
  </button>
</template>



<style scoped></style>