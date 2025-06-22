<script setup>
import { ref, computed } from 'vue';

/* PROPS */
const props = defineProps({
  maxFileSize: {
    type: Number,
    default: 100
  }
});

/* EMIT */
const emit = defineEmits(['handleFileUpload', 'handleRemoveFile']);

/* DATA */
const MAX_FILE_SIZE = props.maxFileSize;
const MAX_FILE_SIZE_BYTES = props.maxFileSize * 1024 * 1024;
const files = ref([]);
const showerror = ref(false);
const errorMessage = ref({});

/* COMPUTED */
const totalFileSize = computed(() => files.value.reduce((acc, item) => acc + item.file.size, 0));

/* FUNZIONI */
const removeFile = (index) => {
  files.value.splice(index, 1);
  emit('handleRemoveFile', index);
};

const removeAllFile = () => {
  files.value = [];
  emit('handleRemoveAllFile');
}

const formatFileSize = (size) => {
  if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

const fileUpload = async (event) => {
  const uploadedFiles = Array.from(event.target.files);
  let newTotalFileSize = totalFileSize.value;

  for (const file of uploadedFiles) {
    if (files.value.some(item => item.file.name === file.name)) continue;

    newTotalFileSize += file.size;
    if (newTotalFileSize > MAX_FILE_SIZE_BYTES) {
      showerror.value = true;
      errorMessage.value = {
        title: 'Errore',
        subtitle: '',
        text: `Il file supera la dimensione massima consentita di ${MAX_FILE_SIZE} MB`
      };
      setTimeout(() => showerror.value = false, 5000);
      return;
    }

    files.value.push({ file, loaded: true });
    emit('handleFileUpload', file);
  }

};

/* FUNZIONI ESPOSTE */
defineExpose({
  removeAllFile
});
</script>

<template>
  <form method="post" action="" enctype="multipart/form-data" aria-label="Modulo di caricamento file">
    <!-- CARICA FILE -->
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2">
      <label for="upload1" :class="{ disabled: totalFileSize > (MAX_FILE_SIZE * 1024 * 1024) }"
        class="btn btn-outlined-primary" :aria-disabled="totalFileSize > (MAX_FILE_SIZE * 1024 * 1024)">
        <svg class="iconSvg" aria-hidden="true">
          <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-upload.svg"></image>
        </svg>
        <span>Carica file</span>
      </label>
    </div>
    <input type="file" name="upload1" id="upload1" class="upload visually-hidden" @change="fileUpload"
      :disabled="totalFileSize > (MAX_FILE_SIZE * 1024 * 1024)" aria-describedby="file-upload-hint" />
    <p id="file-upload-hint" class="visually-hidden">
      Usa il pulsante "Carica file" per selezionare i file da caricare. La dimensione massima consentita è
      {{ MAX_FILE_SIZE }} MB.
    </p>

    <!-- ELENCO FILE -->
    <ul class="upload-file-list mx-4" aria-live="polite" aria-label="Lista dei file caricati">
      <li v-for="(item, index) in files" :key="index" :class="{ 'success': item.loaded }"
        class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2"
        :aria-label="`File: ${item.file.name}. Stato: ${item.loaded ? 'Caricato' : 'In caricamento'}.`">
        <div class="d-flex align-items-center">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-file.svg"></image>
          </svg>
          <p style="margin: 0;">
            <span class="visually-hidden">File caricato:</span>
            {{ item.file.name }} <span class="upload-file-weight">{{ formatFileSize(item.file.size) }}</span>
          </p>
        </div>
        <button @click="removeFile(index)" class="btn icon-button" :aria-label="`Elimina file ${item.file.name}`"
          title="Elimina file">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-delete.svg"></image>
          </svg>
        </button>
      </li>
    </ul>

    <!-- CANCELLA TUTTI -->
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2">
      <button class="btn btn-outline-primary" @click="removeAllFile" aria-label="Cancella tutti i file caricati">
        Cancella tutti
      </button>
    </div>

    <!-- ERRORE -->
    <template v-if="showerror">
      <div class="alert alert-danger" role="alert">
        <h4>{{ errorMessage.title }}</h4>
        <p>{{ errorMessage.text }}</p>
      </div>
    </template>
  </form>
</template>
