<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SpinnerDefault from '@/components/spinner/SpinnerDefault.vue'
import { apiInstanceJson as apiInstance } from '@/util/api'
import LoadingButton from '@/components/loadingButton/LoadingButton.vue'
import BadgeTable from '@/components/badgeTable/BadgeTable.vue'
import '@/assets/tables.scss';

const router = useRouter()
const isLoading = ref(false)
const data = ref([])
const limit = ref(5)
const offset = ref(0)
const hasMoreData = ref(false)
const error = ref(null)

const statusColorMap = {
  Dismesso: 'danger',
  Assegnato: 'success',
  'In Dismissione': 'warning'
}

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await apiInstance.Get('/api/itsm/assets', {
      params: { limit: limit.value, offset: offset.value }
    })

    data.value = [...data.value, ...response]

    hasMoreData.value = response.length === limit.value
  } catch (err) {
    error.value = 'An error occurred while fetching data'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = () => {
  offset.value += limit.value
  fetchData()
}

const handleRowClick = (ticketId) => {
  router.push({ name: 'DettaglioTicket', params: { id: ticketId } })
}

onMounted(() => {
  fetchData();
})
</script>



<template>

  <!-- spinner mostrato se le dotazioni personali non sono state ancora caricate -->
  <SpinnerDefault v-if="isLoading && data.length === 0" :size="60" />

  <table v-else class="custom-table assets-table">
    <thead>
      <tr>
        <th>Tipologia</th>
        <th>Modello</th>
        <th>Stato</th>
        <th>Nome</th>
        <th>Hostname</th>
        <th>Seriale</th>
      </tr>
    </thead>
    <tbody>
      <!-- iterazione dei dati in ogni riga <tr> della table contenuti ognuno all'interno di celle <td>
      inserirti attributi html "data-label" per USARE IL ::before delle td, inserendo dei testi come se fosserò dei <tr> in modo da renderlo responsive -->
      <tr v-for="(item, index) in data" :key="`ticket-row ticket-${index}`" @click="handleRowClick(item.id)">
        <td class="text-truncate" data-label="Tipologia">
          {{ item.categoriaProdotto }}
        </td>
        <td data-label="Modello">
          {{ item.modello || '&nbsp;' }}
        </td>
        <td data-label="Stato" class="stato">
          <!-- componente label ettichetta stato richiesta*** -->
          <BadgeTable :label="item.stato" :colors="statusColorMap" />
        </td>
        <td data-label="Nome">
          {{ item.nomeOggetto || '&nbsp;' }}
        </td>
        <td data-label="Hostname">
          {{ item.hostname || '&nbsp;' }}
        </td>
        <td data-label="Seriale">
          {{ item.serialNumber || '&nbsp;' }}
        </td>
      </tr>
    </tbody>
  </table>

  <!-- bottone per mostrare + richieste, renderizzato solo se i primi 10 "data", sono stati caricati, e se c'è ne sono altri  -->
  <div class="d-flex justify-content-center" v-if="hasMoreData && data.length > 0">
    <LoadingButton :onClick="loadMore" :isLoading="isLoading" label="Carica Altro" btnType="primary" />
  </div>
</template>



<style lang="scss" scoped>
@import "@/assets/tables.scss";

// importazione del @mixin con proprietà comuni per le tabelle, usati però per "breakpoints" differenti
@media screen and (max-width: 991px) {
  @include tableResponsive;
}
</style>
