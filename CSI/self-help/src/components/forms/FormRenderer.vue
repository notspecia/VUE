<script setup>
import { defineProps, defineEmits, provide, reactive, onMounted, ref } from 'vue'
import { JsonForms } from '@jsonforms/vue'
import { vanillaRenderers } from '@jsonforms/vue-vanilla'
import { csiCustomRenderers } from '@csi/json-forms-renderers-default'
import { apiInstanceJson as apiInstance } from '@/util/api.js'
import { remapFieldsFromIdToLabel, remapFieldsFromLabelToId } from '@/util/utils.js'
import { cleanupInvisibleData, ajvJsonForms, jsonformsI18N } from '@csi/csi-internal-template'

provide('api', { apiInstance })

const props = defineProps({
  id: String,
  formSchema: Object,
  formData: Object,
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['data-changed'])

const localFormData = reactive({
  data: props.formData?.data || {}
})
const localFormDataKey = ref(Date.now())

function filterDataBySchema(data, schema) {
  if (!schema || schema.type !== 'object' || !schema.properties) {
    return data
  }
  const filteredData = {}
  for (const key in data) {
    if (schema.properties.hasOwnProperty(key)) {
      const propSchema = schema.properties[key]
      const value = data[key]
      if (
        propSchema.type === 'object' &&
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        filteredData[key] = filterDataBySchema(value, propSchema)
      } else if (propSchema.type === 'array' && Array.isArray(value)) {
        if (propSchema.items && propSchema.items.type === 'object') {
          filteredData[key] = value.map((item) => filterDataBySchema(item, propSchema.items))
        } else {
          filteredData[key] = value
        }
      } else {
        filteredData[key] = value
      }
    }
  }
  return filteredData
}

onMounted(() => {
  const storedRawdata = localStorage.getItem('rawdata')
  if (storedRawdata) {
    try {
      const parsedRawData = JSON.parse(storedRawdata)

      const convertedToId = remapFieldsFromLabelToId(props.formSchema.layouts, parsedRawData)

      const filteredData = filterDataBySchema(convertedToId, props.formSchema.body)
      localFormData.data = { ...filteredData }
      localFormDataKey.value = Date.now()
      localStorage.removeItem('rawdata')
    } catch (error) {
      console.error('Errore nel parsing del rawdata da localStorage:', error)
    }
  }
})

const renderers = Object.freeze([...vanillaRenderers, ...csiCustomRenderers])

const onFormDataChange = ({ data, errors }) => {
  const clearedData = cleanupInvisibleData({ data, errors }, props.formSchema.layouts)
  localFormData.data = clearedData.data
  emit('data-changed', clearedData)
}
</script>

<template>
  <div class="form-renderer">
    <json-forms
      :key="localFormDataKey"
      :data="localFormData.data"
      :renderers="renderers"
      :schema="formSchema.body"
      :uischema="formSchema.layouts"
      :ajv="ajvJsonForms"
      :i18n="jsonformsI18N"
      @change="onFormDataChange"
    />
  </div>
</template>

<style scoped>
.form-render :global(input),
.form-render :global(.select-field-content-wrapper > ul),
.form-render :global(.select-field-content-wrapper > button) {
  width: 100%;
}
</style>
