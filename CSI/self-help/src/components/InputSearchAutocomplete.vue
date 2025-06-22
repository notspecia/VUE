<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import accessibleAutocomplete from 'accessible-autocomplete'

const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: 'Cerca' },
  id: { type: String, required: true },
  hideLabel: { type: Boolean, default: false },
  autocompleteList: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const autocompleteWrapper = ref(null)
const selectId = ref(`accessibleAutocomplete-${props.id}`)

onMounted(() => {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: autocompleteWrapper.value.querySelector('select'),
    showAllValues: false,
    defaultValue: props.modelValue || '',
    autoselect: false,
    showNoOptionsFound: false,
    onConfirm: (value) => {
      updateValue(value)
    }
  })
})

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="d-flex w-100">
    <span class="input-group-text" aria-hidden="true">
      <svg class="icon icon-sm">
        <use :xlink:href="$svgs.getSpriteSvgUrl('it-search')"></use>
      </svg>
    </span>
    <div class="select-wrapper w-100 bg-white" ref="autocompleteWrapper">
      <label v-if="!hideLabel" :for="selectId">{{ label }}</label>
      <select class="form-control" :id="selectId" required>
        <option selected value="">Scegli una opzione</option>
        <option v-for="(item, index) in props.autocompleteList" :key="index" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.input-group-text {
  border-bottom: 1px solid #5d7083;
}
</style>
