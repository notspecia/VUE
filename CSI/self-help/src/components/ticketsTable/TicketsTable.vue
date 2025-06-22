<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TicketsTableCTA from './TicketsTableCTA.vue'
import SpinnerDefault from '@/components/spinner/SpinnerDefault.vue'
import { apiInstanceJson as apiInstance } from '@/util/api'
import LoadingButton from '@/components/loadingButton/LoadingButton.vue'
import { formatTimestamp } from '@/util/utils'
import { invalidateCache } from 'alova'
import BadgeTable from '@/components/badgeTable/BadgeTable.vue'

const router = useRouter()
const isLoading = ref(false)
const data = ref([])
const limit = ref(10)
const offset = ref(0)
const hasMoreData = ref(false)
const error = ref(null)

const statusColorMap = {
  Nuovo: 'primary',
  Assegnato: 'warning',
  'In corso': 'warning',
  Chiuso: 'danger',
  'In sospeso': 'warning',
  Risolto: 'success'
}

// prendiamo tutte le richieste effettuate dall'utente tramite GET
const fetchData = async () => {
  isLoading.value = true
  error.value = null
  try {
    const request = apiInstance.Get('/api/itsm/user-tickets', {
      params: { limit: limit.value, offset: offset.value }
    })

    invalidateCache(request)

    const response = await request
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
  fetchData()
})
</script>


<template>
  <div>

    <!-- Spinner caricamento, mostrato se i primi 10 data delle richieste, non state ancora caricate -->
    <SpinnerDefault v-if="isLoading && data.length === 0" :size="60" />

    <table v-else class="custom-table tickets-table">
      <thead>
        <tr>
          <th>Data creazione</th>
          <th>Oggetto richiesta</th>
          <th>Categoria</th>
          <th>Stato</th>
          <th>Nr. Ticket</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <!-- 
        iterazione dei dati in ogni riga <tr> della table contenuti ognuno all'interno di celle <td>
        inserirti attributi html "data-label" per USARE IL ::before delle td, inserendo dei testi come se fosserò dei <tr> 
        in modo da renderlo responsive
        -->
        <tr v-for="(item, index) in data" :key="`ticket-row-${index}`" @click="handleRowClick(item.ticketId)">
          <td data-label="Data creazione">
            {{ formatTimestamp(item.insertDate) }}
          </td>
          <td data-label="Oggetto richiesta">
            <span class="ellipsis-cell">
              <a href="#" class="ellipsis-text">
                {{ item.riepilogo }}
              </a>
            </span>
          </td>
          <td data-label="Categoria">
            {{ item.categoria?.nome || '&nbsp;' }}
          </td>
          <td data-label="Stato" class="stato">
            <BadgeTable :label="item.lavorazione.stato" :colors="statusColorMap" />
          </td>
          <td data-label="Nr. Ticket">
            {{ item.ticketId }}
          </td>
          <td data-label="Azioni" @click.stop>
            <TicketsTableCTA :ticket="item" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center mt-3" v-if="hasMoreData && data.length > 0">
      <LoadingButton :onClick="loadMore" :isLoading="isLoading" label="Carica Altro" btnType="primary" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/tables.scss";

// per evitare di ridurre la cella in modalità responsive della table, assegniamo un contenitore all'oggetto uno <span>
span.ellipsis-cell {
  display: block;
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: table-cell;
}

// style personalizzato alla 2 cella <td> della row <tr>
a.ellipsis-text {
  display: block;
  max-width: 100%;
  font-weight: 600;
  color: #0056b3;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.ellipsis-cell:hover .ellipsis-text {
  text-decoration: underline;
}

@media screen and (max-width: 1199px) {
  span.ellipsis-cell {
    max-width: 300px;
  }
}

// importazione del @mixin con proprietà comuni per le tabelle, usati però per "breakpoints" differenti
@media screen and (max-width: 992px) {
  @include tableResponsive;
}

@media screen and (max-width: 767px) {
  span.ellipsis-cell {
    max-width: 200px;
  }
}

@media screen and (max-width: 425px) {
  span.ellipsis-cell {
    max-width: 100px;
  }
}
</style>