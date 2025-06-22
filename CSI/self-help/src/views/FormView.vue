<script setup>
import { ref, watch } from 'vue'
import FormRenderer from '@/components/forms/FormRenderer.vue'
import { apiInstanceJson as apiInstance } from '@/util/api.js'
import GoBack from '@/components/goBack/GoBack.vue'
import { useModalStore } from '@/stores/modalStore'
import { useRouter, useRoute } from 'vue-router'
import SectionLabel from '@/components/typography/sectionLabel/SectionLabel.vue'
import ContentContainer from '@/components/contentContainer/ContentContainer.vue'
import LoadingButton from '@/components/loadingButton/LoadingButton.vue'
import FileUploader from '@/components/forms/FileUploader.vue'
import { handleDataBeforeSaving } from '@/util/utils'
import SpinnerDefault from '@/components/spinner/SpinnerDefault.vue'
import { toastPromise } from '@/util/toast.js';

const route = useRoute()
const router = useRouter()

const formData = ref({
  data: {},
  errors: []
})
const files = ref([])
const modalMessage = ref('')
const modalErrors = ref([])
const isLoading = ref(false)

const formSchema = ref(null)
const areLoadingFormSchema = ref(false)

const modalStore = useModalStore()

const resetState = () => {
  formData.value = { data: {}, errors: [] }
  files.value = []
  modalMessage.value = ''
  modalErrors.value = []
  isLoading.value = false
}

const fetchFormSchema = async (id) => {
  areLoadingFormSchema.value = true
  try {
    const response = await apiInstance.Get(`/api/forms/${id}`)
    formSchema.value = response; // memoriazziamo all'interno del formSchema le info del form per quel ticket
  } catch (error) {
    console.error('Errore durante il fetch della form schema:', error)
  } finally {
    areLoadingFormSchema.value = false
  }
}

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      resetState()
      fetchFormSchema(newId)
    }
  },
  { immediate: true }
)

const handleFileUpload = (uploadedFiles) => {
  files.value = uploadedFiles
}

const handleSubmit = async () => {
  isLoading.value = true

  const submitFormData = new FormData()

  submitFormData.append('rawData', JSON.stringify(formData.value.data))

  const formDetails = handleDataBeforeSaving({
    data: formData.value.data,
    formSchema: formSchema.value
  })

  Object.keys(formDetails).forEach((key) => {
    submitFormData.append(key, formDetails[key])
  })

  files.value.forEach((file) => {
    submitFormData.append('file', file)
  })

  // -------------------------------------------------

  const callback = (res) => {
    router.push({ name: "RichiesteEffettuate" });
    return `Ticket inviato con successo! ID: ${res.ticket.ticketId}. 
Clicca per visualizzare i dettagli.`;
  }

  // callback passata allo script per la gestione dei toast per gestire al click il renderizzamento alla rotta del ticket appena creato, tramite onClick
  const handleRouting = (res) => {
    router.push({ name: "DettaglioTicket", params: { id: res.ticket.ticketId } });
  }

  // creazione della richiesta API, restetuendo una promise in pending da risolvere
  const promise = apiInstance.Post(`/api/itsm/ticket/${route.params.id}`, submitFormData);

  // risolviamo la "promise" all'interno della funziona toastPromise, passando una callback con messaggio di successo di return
  await toastPromise("Invio ticket in corso...", callback, promise, handleRouting);

  isLoading.value = false;
}

const checkBack = async () => {
  const propertyValue = Object.keys(formData.value.data).length
  if (propertyValue !== 0) {
    const userConfirmed = await modalStore.openModal({
      title: 'Conferma Navigazione',
      message: 'Stai compilando il form, sei sicuro di voler tornare indietro?',
      onConfirm: async () => true,
      onCancel: async () => false
    })
    return userConfirmed
  }
  return true
}

const doCancel = async () => {
  const goBack = await checkBack()
  if (goBack) {
    router.back()
  }
}

const onDataChanged = (data) => {
  formData.value = data
}
</script>

<template>
  <!-- spinner mostrato se il form del prodotto non è stato ancora caricato -->
  <SpinnerDefault v-if="areLoadingFormSchema" :size="60" />

  <div v-else class="form-view">
    <GoBack :before-navigate="checkBack" />
    <SectionLabel>
      {{ formSchema.title }}
    </SectionLabel>
    <div v-html="formSchema.description" class="py-4 styled-description"></div>
    <ContentContainer>
      <div class="w-100">
        <FormRenderer :id="route.params.id" :formData="formData" :formSchema="formSchema" :disabled="isLoading"
          @data-changed="onDataChanged" />
      </div>
      <FileUploader :files="files" @file-upload="handleFileUpload" />
      <div class="d-flex flex-column flex-md-row w-100 justify-content-md-between gap-3">
        <LoadingButton :onClick="handleSubmit" :isLoading="isLoading" :disabled="formData.errors.length"
          label="INVIA RICHIESTA" btnType="primary" class="w-100 w-md-auto" />
        <!-- se la chiamata API per prenotare il ticket è partita, disabilitiamo il bottone ANNULLA, tramite attributo dinamico "disabled" -->
        <button class="btn btn-outline-primary w-100 w-md-auto" :class="isLoading ? 'disabled' : ''" @click="doCancel"
          :disabled="isLoading">ANNULLA</button>
      </div>
    </ContentContainer>
  </div>
</template>

<style scoped>
/* width di default per il form sopra i> 992px di breakpoint */
.form-view {
  width: 75%;
}

.page-body :global(.error) {
  font-size: 14px;
  color: red;
}

.page-body :global(.vertical-layout) {
  display: flex;
  flex-direction: column;
}

.page-body :global(.vertical-layout-item) {
  min-height: 80px;
}

.styled-container {
  padding: 1.5rem;
}

/* style applicato quando il bottone  */
button.disabled {
  background-color: rgb(241, 241, 241);
  opacity: 0.2;
}

/* breakpoint, per dispositivi con uno schermo < a 992px di lunghezza, rendiamo il form in se 100% del container (suo genitore) */
@media (max-width: 991.98px) {
  .form-view {
    width: 100%;
  }
}
</style>
