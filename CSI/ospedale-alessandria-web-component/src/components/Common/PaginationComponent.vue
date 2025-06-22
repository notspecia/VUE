<script setup>
import { computed } from 'vue';

/* PROPS */
const props = defineProps({
  filteredTickets: Array,
  currentPage: Number,
  itemsPerPage: Number
});

/* EMIT */
const emit = defineEmits(['nextPage', 'prevPage', 'jumpToPage']);

/* FUNZIONI */

const totalPages = computed(() => {
  return Math.ceil(props.filteredTickets.length / props.itemsPerPage);
});

const nextPage = async () => {
  if (props.currentPage < totalPages.value) {
    emit('nextPage');
  }
};

const prevPage = async () => {
  if (props.currentPage > 1) {
    emit('prevPage');
  }
};
const jumpToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('jumpToPage', page);
  }
};
</script>

<template>
  <nav class="pagination-wrapper justify-content-center mt-3" aria-label="Navigazione paginazione">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="javascript:void(0)" @click.prevent="prevPage" aria-label="Pagina precedente">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-chevron-left.svg"></image>
          </svg>
        </a>
      </li>
      <li class="page-item" v-if="currentPage > 2">
        <a class="page-link" href="javascript:void(0)" @click.prevent="jumpToPage(1)" aria-label="Vai alla pagina 1">
          1
        </a>
      </li>
      <li class="page-item" v-if="currentPage > 3">
        <span class="page-link">...</span>
      </li>
      <li class="page-item" v-if="currentPage > 1">
        <a class="page-link" href="javascript:void(0)" @click.prevent="prevPage"
          :aria-label="`Vai alla pagina ${currentPage - 1}`">
          {{ currentPage - 1 }}
        </a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="javascript:void(0)" aria-current="page"
          :aria-label="`Pagina corrente, numero ${currentPage}`">
          {{ currentPage }}
        </a>
      </li>
      <li class="page-item" v-if="currentPage < totalPages">
        <a class="page-link" href="javascript:void(0)" @click.prevent="nextPage"
          :aria-label="`Vai alla pagina ${currentPage + 1}`">
          {{ currentPage + 1 }}
        </a>
      </li>
      <li class="page-item" v-if="currentPage < totalPages - 2">
        <span class="page-link">...</span>
      </li>
      <li class="page-item" v-if="currentPage < totalPages - 1">
        <a class="page-link" href="javascript:void(0)" @click.prevent="jumpToPage(totalPages)"
          :aria-label="`Vai all'ultima pagina, numero ${totalPages}`">
          {{ totalPages }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="javascript:void(0)" @click.prevent="nextPage" aria-label="Pagina successiva">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-chevron-right.svg"></image>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>