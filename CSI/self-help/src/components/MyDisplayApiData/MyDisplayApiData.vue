<script setup lang="ts">
import { DisplayApiData } from '@csi/design-system-core'
import { defineProps } from 'vue'
import SpinnerDefault from '../spinner/SpinnerDefault.vue'

defineProps({
  apis: {
    type: Object,
    required: true
  }
})
</script>

<!-- wrapper per gestire e sovrascrivere i loaders del design system di default -->
<template>
  <DisplayApiData :apis="apis">
    <template v-slot="{ data }">
      <slot :data="data"></slot>
    </template>
    <template #loading>
      <slot name="loading">
        <SpinnerDefault :size="60" />
      </slot>
    </template>
  </DisplayApiData>
</template>
