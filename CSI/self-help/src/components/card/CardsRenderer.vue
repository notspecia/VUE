<script setup>
import { defineProps } from 'vue'
import CardComponent from '@/components/card/CardComponent.vue'

const props = defineProps({
  data: { type: Array, default: () => [] },
  itemKey: { type: String, required: true },
  label: { type: String, required: false },
  baseHref: { type: String, default: 'category' }
})

</script>



<template>
  <div class="row">
    <div v-for="(item, index) in props.data" :key="`${itemKey}-${index}`"
      class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <CardComponent :id="`${item.id}`" :title="item.title" :description="item.description"
        :baseHref="item.forms && item.forms.length > 1 ? 'service' : baseHref" />
    </div>
  </div>
</template>