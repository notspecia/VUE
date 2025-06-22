<script setup>
import { ref, computed, defineProps, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  searchItem: { type: Array, default: () => [] }
})

const searchQuery = ref('')
const selectedIndex = ref(-1)
const showPopover = ref(false)
const router = useRouter()
const searchContainerRef = ref(null)


// 
const filteredResults = computed(() => {
  if (!searchQuery.value) {
    showPopover.value = false;
    return [];
  }

  const query = searchQuery.value.toLowerCase();

  showPopover.value = true

  return props.searchItem.filter(
    (item) => checkProperty(query, item.title) || checkProperty(query, item.formDescription)
  )
})

const checkProperty = (query, value) => value && value.toLowerCase().includes(query.toLowerCase())

const navigateToForm = (formId) => {
  router.push(`/form/${formId}`)
  showPopover.value = false
  selectedIndex.value = -1
}

const handleKeyDown = (event) => {
  if (filteredResults.value.length === 0 || !showPopover.value) return;

  switch (event.key) {

    // click keydown per scorrere i <li> apparsi come risultati in base alla ricerca della query
    case 'ArrowDown':
      if (selectedIndex.value < filteredResults.value.length - 1) {
        selectedIndex.value++;
      }
      break;

    // click keyup per scorrere i <li> apparsi come risultati in base alla ricerca della query
    case 'ArrowUp':
      if (selectedIndex.value > 0) {
        selectedIndex.value--;
      }
      break;

    // se si preme enter sull'elemento <li> selezionato, portiamo l'utente alla rotta di quel servizio
    case 'Enter':
      if (selectedIndex.value !== -1) {
        navigateToForm(filteredResults.value[selectedIndex.value].formId);
      }
      break;

    default:
      break;
  }

  /*
  ogni volta che andiamo a usare il keydown/keyup, andiamo a controllare ogni secondo il <li> con classe attuale ".selected"
  serve per tenere sempre in focus l'elemento selezionato anche in caso si vada sotto l'overflow della lista!  
  - nextTick() assicura che VUE abbia aggiornato il DOM (cambiato la classe .selected)
  */
  nextTick(() => {
    const selectedItem = document.querySelector('.selected'); // assegniamo l'elemento selezionato (verifichiamo con if se esiste)
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
};


const handleClickOutside = (event) => {
  if (searchContainerRef.value && !searchContainerRef.value.contains(event.target)) {
    showPopover.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('click', handleClickOutside)
})
</script>



<template>
  <div class="search-container" ref="searchContainerRef">
    <input id="campoRicerca" v-model="searchQuery" aria-labelledby="campoRicerca" type="text"
      placeholder="Cerca con parole chiave" class="search-input" @focus="showPopover = true" aria-autocomplete="list"
      aria-controls="risultatiRicerca" aria-activedescendant />
    <!-- controllo se c'è già qualcosa di inserito nella search query, nascondiamo la lente svg
    inserimento svg in un tag messo in dotazione da VUE <transition>, vue rileva quando il valore dentro il v-if cambia
    e aggiunge automaticamente delle classi CSS per dare un effetto di transition -->
    <transition name="fade">
      <svg class="search-icon icon icon-sm" v-if="!searchQuery">
        <use :xlink:href="$svgs.getSpriteSvgUrl('it-search')" stroke="white" stroke-width="1"></use>
      </svg>
    </transition>

    <div v-if="showPopover" class="popover">
      <ul class="result-list" role="listbox" id="risultatiRicerca">
        <li class="result-item-disabled" role="option" v-if="!filteredResults.length">
          Nessun risultato
        </li>
        <!-- in base all'index di alias di scorrimento, aggiungiamo la classe ".selected" all'elemento attualmente evidenziato
        aggiunta se l'index alias dell v-for è === a quello selezionato -->
        <li v-else v-for="(result, index) in filteredResults" :key="result.idForm"
          :class="{ 'result-item': true, selected: index === selectedIndex }" @click="navigateToForm(result.formId)"
          role="option" :aria-selected="index === selectedIndex">
          {{ result.title }}
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #337ab7;
  border-radius: var(--round);
  padding: 5px 20px;
  position: relative;
  width: auto;
  min-width: 35%;
}

.search-input {
  border: none;
  background: none;
  color: white;
  flex-grow: 1;
  padding: 10px;
  outline: none;
}

.search-input::placeholder {
  color: white;
}

.search-icon {
  fill: white;
}

/* effetto fade per la lente impostata dal tag di VUE con <transition>*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popover {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  max-height: 50vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  color: black;
  display: flex;
  flex-direction: column;
}

.result-list {
  list-style-type: none;
  margin: 0;
  overflow-y: auto;
  max-height: 100%;
  padding: 0;
}

.result-item {
  background: #f1f1f1;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.result-item-disabled {
  background: #f1f1f1;
  padding: 10px;
  transition: background-color 0.3s;
}

.result-item:hover,
.result-item.selected {
  background-color: #d0d0d0;
}
</style>
