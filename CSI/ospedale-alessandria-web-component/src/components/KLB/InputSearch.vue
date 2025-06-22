<script setup>
import { ref, computed, onMounted } from 'vue';

/* PROPS */
const props = defineProps({
  labelText: String,
  id: String,
  moreInfo: String,
  isUppercase: Boolean,
  searchFromList: [String, Boolean],
  dataListObject: Object,
  spinner: Boolean
});

/* EMIT */
const emit = defineEmits(['updateSearch', 'updateUrl']);

/* DATA */
const textForm = ref(null);
const currentId = ref("inputSearch" + props.id);
const labelActive = ref(false);
const currentValue = ref(null);

/* COMPUTED */
const dataListOptions = computed(() => {
  const { details } = props.dataListObject ?? {};

  if (details) {
    details.forEach(item => {
      item.title = item.title.replace(/<\/?[^>]+(>|$)/g, "");
    });
    return details;
  }

  return [];
});

/* FUNZIONI */
const checkTypeCategory = (option) => {
  return option.type.includes("Category");
};

const addActive = (id) => {
  const element = document.getElementById(id);
  if (element) {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    } else {
      element.classList.add("active");
    }
  }
};

const activateLabel = () => {
  if (textForm.value?.value) {
    labelActive.value = true;
  } else {
    labelActive.value = !labelActive.value;
  }
};

const handleInput = (event) => {
  currentValue.value = event.target.value.replace(/[*]/g, '');
  if (currentValue.value.length >= 3) {
    emit("updateSearch", currentValue.value);
  }
};

/* CICLI VITA DEL COMPONENTE */
onMounted(() => {
  textForm.value = document.getElementById(currentId.value);
});
</script>

<template>
  <div class="form-group">
    <!-- INPUT -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <!-- LENTE RICERCA -->
        <span class="input-group-text csi-button-color border-radius-left" role="presentation">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-search.svg"></image>
          </svg>
        </span>
      </div>
      <label id="searchInputLabel" class="visually-hidden">ricerca in assistenza URP online</label>
      <input :class="{ 'text-uppercase': isUppercase }" :name="currentId" type="search" class="form-control"
        :id="currentId" :aria-labelledby="'searchInputLabel'" placeholder="Cerca in assistenza"
        @focusout="activateLabel" @focusin="activateLabel" @input="handleInput" ref="searchInput" autocomplete="off" />
      <button class="input-group-append btn btn-primary" type="button" id="button-3"
        @click="emit('updateSearch', currentValue)" aria-label="Cerca nel sistema di assistenza">
        Cerca
      </button>
    </div>

    <!-- LISTA RISULTATI -->
    <ul v-if="dataListOptions.length > 0 && currentValue && !spinner" class="list-group" role="listbox"
      aria-labelledby="currentId">
      <li v-for="(option, index) in dataListOptions" :id="'option-' + index" :key="index" class="list-group-item"
        role="option" @click="emit('updateUrl', option.category_id)" @mouseover="addActive(index)"
        @mouseout="removeActive(index)">
        <template v-if="checkTypeCategory(option)">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-folder.svg"></image>
          </svg>
          <span class="visually-hidden">Categoria: </span>
        </template>
        <template v-else>
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-file.svg"></image>
          </svg>
          <span class="visually-hidden">File: </span>
        </template>
        {{ option.title }}
      </li>
    </ul>

    <!-- NESSUN RISULTATO -->
    <ul v-else-if="currentValue && currentValue.length > 0 && !spinner" class="list-group mt-2" role="alert">
      <li>
        <hr />
        <h5>Nessun risultato trovato</h5>
      </li>
    </ul>

    <!-- LOADER -->
    <template v-if="spinner">
      <div class="row py-2 justify-content-center full-width overlay" aria-live="polite">
        <div class="col-auto">
          <div class="progress-spinner progress-spinner-active">
            <span class="visually-hidden">Caricamento in corso...</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
