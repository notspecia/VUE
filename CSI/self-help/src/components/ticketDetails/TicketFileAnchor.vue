<script setup>
import { isLocalDev } from '@/util/utils'
import SimpleLabel from '../typography/simpleLabel/simpleLabel.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  ticketId: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div v-if="data.allegati" class="result-list">
    <SimpleLabel> Allegati </SimpleLabel>
    <ul>
      <li v-for="(allegato, index) in data.allegati" :key="index">
        <a
          :href="`${isLocalDev() ? 'http://localhost:8080' : ''}/api/itsm/tickets/${ticketId}/info-dettagli/${data.logId}/allegati/${data.idAllegati[index]}`"
          >{{ allegato }}</a
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.result-list {
  display: flex;
  flex-direction: column;
}

.result-list a {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
