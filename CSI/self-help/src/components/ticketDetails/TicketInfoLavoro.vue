<script setup>
import { useModalStore } from '@/stores/modalStore'
import { formatDate, useApiData } from '@csi/design-system-core'
import { ref, computed } from 'vue'
import LoadingButton from '../loadingButton/LoadingButton.vue'
import FileUploader from '@/components/forms/FileUploader.vue'
import { apiInstanceJson as apiInstance } from '@/util/api'
import { FIRST_FILE_UPLOAD, VISIBLE_INFO_LAVORO_TIPOLOGIA } from './ticketDetailsUtils'
import TicketFileAnchor from './TicketFileAnchor.vue'
import TicketInfo from './TicketInfo.vue'
import { formatTimestamp } from '@/util/utils'

const props = defineProps({
  infoLavoro: Array,
  ticketId: String,
  statoTicket: String,
  allegatiPresenti: Array
})

const newInfo = ref({
  oggetto: '',
  descrizione: '',
  files: [],
  utenteInserimento: 'integrationws'
})

const localInfoLavoro = ref([...props.infoLavoro])
const modalStore = useModalStore()
const isLoading = ref(false)
const fileInputRef = ref(null)

const getTimestampString = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year}_${hours}.${minutes}`
}

const handleFileUpload = async (uploadedFiles) => {
  const duplicateFiles = uploadedFiles.filter((file) => props.allegatiPresenti.includes(file.name))

  if (duplicateFiles.length > 0) {
    const modalMessage =
      "Uno o più file selezionati hanno lo stesso nome di file già presenti. Se vuoi procedere, i file verranno rinominati aggiungendo la data e l'ora."
    const modalErrors = []

    const userConfirmed = await modalStore.openModal({
      title: 'Nome file duplicato',
      message: modalMessage,
      errors: modalErrors,
      onConfirm: () => { },
      onCancel: () => { }
    })

    if (userConfirmed) {
      const now = new Date()
      const renamedFiles = uploadedFiles.map((file) => {
        if (props.allegatiPresenti.includes(file.name)) {
          const parts = file.name.split('.')
          const extension = parts.length > 1 ? parts.pop() : ''

          const baseName = parts.join('.')
          const timestamp = getTimestampString()

          const newName = extension
            ? `${baseName}_${timestamp}.${extension}`
            : `${baseName}_${timestamp}`

          return new File([file], newName, { type: file.type })
        }
        return file
      })
      newInfo.value.files = renamedFiles
    } else {
      newInfo.value.files = []
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
      return
    }
  } else {
    newInfo.value.files = uploadedFiles
  }
}

const addInfoLavoro = async (ticketId) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('riepilogo', newInfo.value.oggetto)
    formData.append('tipologia', 'General')

    for (let i = 0; i < newInfo.value.files.length; i++) {
      formData.append('file', newInfo.value.files[i])
    }

    try {
      const { dataReady, areErrored, resultData } = useApiData({
        apis: {
          info: {
            apiInstance,
            apiUrl: `/api/itsm/tickets/${ticketId}/info-dettagli`,
            method: 'Put',
            data: formData
          }
        },
        emit: () => {
          if (dataReady) {
            const result = resultData.value.info
            if (result.code && +result.code >= 400) {
              reject()
              modalStore.openModal({
                title: 'Errore',
                message: 'Errore durante la comunicazione con il server.'
              })
            } else {
              resolve(result)

              modalStore.openModal({
                title: 'Info lavoro',
                message: `Info lavoro inviata con successo`
              })
            }
          } else {
            reject()
            modalStore.openModal({
              title: 'Errore',
              message: 'Errore durante la comunicazione con il server.'
            })
          }
        }
      })
    } catch (e) {
      console.error(e)
      modalStore.closeModal()
      reject()
    }
  })
}

const submitNewInfo = async () => {
  isLoading.value = true
  try {
    const result = await addInfoLavoro(props.ticketId)

    const data = { ...result, note: newInfo.value.oggetto }

    localInfoLavoro.value = [data, ...localInfoLavoro.value]
  } catch (error) {
    console.error("Errore durante l'invio:", error)
  } finally {
    newInfo.value = { oggetto: '', files: [] }
    isLoading.value = false
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}

const filteredLogs = computed(() => {
  const result =
    localInfoLavoro.value.filter(
      (item) =>
        item.tipologia === VISIBLE_INFO_LAVORO_TIPOLOGIA &&
        item.riepilogo !== FIRST_FILE_UPLOAD &&
        item.note !== FIRST_FILE_UPLOAD
    ) || []

  return result
})
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column gap-3 info">
    <div class="accordion">
      <div v-for="(item, index) in filteredLogs" :key="item.logId" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
            Info aggiuntiva del {{ formatTimestamp(item.dataLog) }} inserita da
            {{ item.utenteInserimento === 'integrationws' ? 'te' : `operatore` }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <TicketInfo :label="'Note:'" :value="item.note" />
            <TicketFileAnchor :data="item" :ticket-id="ticketId || ''" />
          </div>
        </div>
      </div>
      <div v-if="!['Risolto', 'Chiuso', 'Annullato'].includes(statoTicket)" class="accordion-item">
        <h2 class="accordion-header" id="headingNewInfo">
          <button class="accordion-button no-chevron" type="button" aria-expanded="true"
            aria-controls="collapseNewInfo">
            Nuova Info Aggiuntiva
          </button>
        </h2>
        <div id="collapseNewInfo" class="accordion-collapse collapse show" aria-labelledby="headingNewInfo">
          <div class="accordion-body">
            <form @submit.prevent="submitNewInfo">
              <div class="mb-3">
                <label for="oggetto" class="form-label">Note</label>
                <textarea class="form-control" id="oggetto" v-model="newInfo.oggetto" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <!-- Il componente FileUploader emette "file-upload" passando l'array dei file selezionati -->
                <FileUploader :files="newInfo.files" @file-upload="handleFileUpload"
                  :accept="['.jpg', '.jpeg', '.png', '.pdf']" :multiple="true" :max-files="3" ref="fileInputRef" />
              </div>
              <LoadingButton :onClick="submitNewInfo" :isLoading="isLoading" label="Invia" btnType="primary"
                :disabled="!newInfo.oggetto" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-control {
  border: 1px solid $grey;
  border-radius: var(--round);
}

.no-chevron::after {
  display: none;
}

.no-chevron {
  text-decoration: unset !important;
  cursor: default;
}

.accordion :global(.accordion-body) {
  padding: 12px 0px 42px;
}

.accordion :global(.accordion-button) {
  padding: 14px 0px !important;
}
</style>
