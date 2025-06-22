<script setup>
import { computed, ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'

const props = defineProps({
  files: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['file-upload'])
const modalStore = useModalStore()

const MAX_FILES = 3
const MAX_TOTAL_SIZE_MB = 9
const MAX_TOTAL_SIZE = MAX_TOTAL_SIZE_MB * 1024 * 1024

const allowedFileTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
  'image/png',
  'image/gif',
  'image/jpeg',
  'text/plain',
  'application/xml',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.text',
  'application/json',
  'application/x-yaml',
  'text/yaml'
]

const allowedExtensions = [
  '.PDF',
  '.DOC',
  '.DOCX',
  '.XLS',
  '.XLSX',
  '.ZIP',
  '.JSON',
  '.YAML',
  '.YML',
  '.PNG',
  '.GIF',
  '.JPEG',
  '.TXT',
  '.XML',
  '.ODS',
  '.ODT'
]

const errors = ref([])

const getFileExtension = (name) => '.' + name.split('.').pop().toUpperCase()

const handleFilesChange = (event) => {
  errors.value = []
  const newFiles = Array.from(event.target.files)

  // Verifica numero massimo di file
  if (props.files.length + newFiles.length > MAX_FILES) {
    errors.value.push(`Puoi caricare un massimo di ${MAX_FILES} file.`)
    event.target.value = ''
    return
  }

  // Controllo dimensione totale
  const currentTotalSize = props.files.reduce((acc, file) => acc + file.size, 0)
  const newFilesTotalSize = newFiles.reduce((acc, file) => acc + file.size, 0)
  const finalTotalSize = currentTotalSize + newFilesTotalSize

  if (finalTotalSize > MAX_TOTAL_SIZE) {
    modalStore.openModal({
      title: 'Errore caricamento file',
      message: `La dimensione totale dei file non può superare ${MAX_TOTAL_SIZE_MB}MB. Dimensione totale attuale: ${(finalTotalSize / (1024 * 1024)).toFixed(2)}MB`
    })
    event.target.value = ''
    return
  }

  const invalidFiles = []
  const validatedFiles = newFiles.filter((file) => {
    if (
      allowedFileTypes.includes(file.type) ||
      allowedExtensions.includes(getFileExtension(file.name))
    ) {
      return true
    }

    invalidFiles.push(file.name)
    return false
  })

  if (invalidFiles.length > 0) {
    errors.value.push(
      `I seguenti file non sono supportati: ${invalidFiles.join(', ')}. Formati consentiti: ${allowedExtensions.join(', ')}.`
    )
  }

  if (validatedFiles.length === 0) {
    event.target.value = ''
    return
  }

  const updatedFiles = [...props.files, ...validatedFiles]
  emit('file-upload', updatedFiles)
  event.target.value = ''
}

const removeFile = (fileToRemove) => {
  const updatedFiles = props.files.filter((file) => file !== fileToRemove)
  emit('file-upload', updatedFiles)
  errors.value = []
}

const showPlaceholder = computed(() => props.files.length === 0)
</script>

<template>
  <div class="upload-container mt-4 mb-4 d-flex flex-column gap-2">
    <div>
      <h3 class="h5">Allegati</h3>
      <label class="form-label">
        Allega fino a {{ MAX_FILES }} file (Max {{ MAX_TOTAL_SIZE_MB }}MB, formati:
        <!-- sostitutito il .join di rendirizzamento dei formati estenesione, con un v-for tramite elenco a capo 
        (problemi di style e fuoriuscita dal container) -->
        <strong v-for="(ext, index) in allowedExtensions" :key="index">
          {{ ext }}<span v-if="index < allowedExtensions.length - 1">, </span>
        </strong>
        )
      </label>

    </div>

    <input type="file" id="file-input" multiple @change="handleFilesChange" class="d-none"
      :accept="[...allowedExtensions, ...allowedFileTypes].join(',')" />
    <div class="d-flex gap-3">
      <label for="file-input" class="btn btn-outline-primary w-50 w-md-100">
        Scegli il file
        <svg class="icon icon-sm icon-primary">
          <use :xlink:href="$svgs.getSpriteSvgUrl('it-upload')"></use>
        </svg>
      </label>
      <div class="w-50 d-md-block d-none"></div>
    </div>

    <div v-if="showPlaceholder" class="file-placeholder">Nessun file selezionato</div>

    <div v-if="errors.length > 0" class="alert alert-danger mt-3">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <ul class="list-group">
      <li v-for="file in props.files" :key="file.name"
        class="list-group-item d-flex justify-content-between align-items-center gap-2">
        <div class="d-flex flex-row align-items-center mw-100 w-100">
          <svg class="document-icon">
            <use :xlink:href="$svgs.getSpriteSvgUrl('it-file')"></use>
          </svg>
          <p class="file-name">{{ file.name }}</p>
          <button class="btn btn-danger" @click="removeFile(file)">
            <svg class="icon icon-sm">
              <use :xlink:href="$svgs.getSpriteSvgUrl('it-close')"></use>
            </svg>
            <span class="visually-hidden">Elimina file {{ file.name }}</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.upload-label {
  background-color: var(--bs-primary);
}

.upload-label:hover {
  background-color: var(--bs-btn-hover-color);
}

.upload-label:active {
  background-color: var(--bs-btn-active-color);
}

.upload-label svg {
  stroke-width: 1px;
  fill: white;
  stroke: white;
}

.file-placeholder {
  border-radius: var(--round);
  background-color: $color-background-contrast;
  padding: 12px 24px;
  color: $grey;
  font-weight: 600;
  font-size: 1rem;
}

.btn.btn-danger {
  svg {
    fill: white;
    min-width: 1.5rem;
    min-height: 1.5rem;
    stroke-width: 1px;
    stroke: white;
  }

  margin-left: auto;
  padding: 0.25rem;
}

.btn.btn-danger:focus-visible svg {
  fill: var(--bs-danger);
  stroke: var(--bs-danger);
}

.btn.btn-danger:hover svg {
  fill: $color-background-contrast;
  stroke: $color-background-contrast;
}

.file-name {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: medium;
}

.document-icon {
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
}
</style>
