<script setup>
import { computed } from 'vue'
import SimpleLabel from '../typography/simpleLabel/simpleLabel.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Array],
    required: true
  }
})

const checkData = computed(() => Array.isArray(props.value))
</script>

<template>
  <div class="d-flex flex-column gap-0">
    <SimpleLabel>
      {{ label }}
    </SimpleLabel>
    <div v-if="checkData">
      <p v-if="!props.value.length">-</p>
      <ul v-else>
        <li v-for="item in props.value" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <p v-else class="value-style" v-html="props.value"></p>
  </div>
</template>

<style scoped>
.value-style {
  font-size: 18px;
  font-weight: 600;
  white-space: break-spaces;
}

p {
  margin: unset;
}
</style>
