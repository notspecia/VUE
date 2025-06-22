<script setup>
import { ref, onMounted, computed } from 'vue'
import SpinnerDefault from '@/components/spinner/SpinnerDefault.vue'
import { apiInstanceJson as apiInstance } from '@/util/api.js'
import TicketInfo from './TicketInfo.vue'
import TicketsTableCTA from '../ticketsTable/TicketsTableCTA.vue'
import { formatTimestamp } from '@/util/utils'
import TicketInfoLavoro from './TicketInfoLavoro.vue'
import TicketFileAnchor from './TicketFileAnchor.vue'
import SimpleLabel from '../typography/simpleLabel/simpleLabel.vue'
import { FIRST_FILE_UPLOAD } from './ticketDetailsUtils'
import ContentContainer from '../contentContainer/ContentContainer.vue'
import { formatDate } from '@csi/design-system-core'
import SectionLabel from '../typography/sectionLabel/SectionLabel.vue'

const props = defineProps({
  id: String
})

const isLoading = ref(true)
const ticket = ref(null)
const allegati = ref(null)
const sollecito = ref([])
const error = ref(null)
const containerWidth = ref(0)

const aggregatedAllegati = computed(() => {
  if (!ticket.value || !ticket.value.infoLavoro) return []
  return ticket.value.infoLavoro.reduce((acc, item) => {
    if (Array.isArray(item.allegati)) {
      return acc.concat(item.allegati)
    }
    return acc
  }, [])
})

const fetchTicketDetails = async () => {
  try {
    const response = await apiInstance.Get(`/api/itsm/user-ticket/${props.id}`)
    ticket.value = response

    response.infoLavoro.forEach((element) => {
      if (element.riepilogo === FIRST_FILE_UPLOAD || element.note === FIRST_FILE_UPLOAD) {
        allegati.value = element
      } else if (element.tipologia === 'Sollecito') {
        sollecito.value = [...sollecito.value, formatTimestamp(element.dataLog)]
      }
    })
  } catch (err) {
    error.value = 'Error fetching ticket details'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const container = document.querySelector('.styled-container')
  if (container) {
    containerWidth.value = container.offsetWidth

    document.documentElement.style.setProperty(
      '--half-container-width',
      `${containerWidth.value / 2 - 80}px`
    )
  }

  fetchTicketDetails()
})
</script>

<template>
  <!-- contenitore dei dettagli del ticket cliccato dalla route "richieste-effettuate", mostrato spinner mentre sta caricando  -->
  <ContentContainer v-if="isLoading">
    <SpinnerDefault :size="60" />
  </ContentContainer>

  <!-- quando ha caricato (successo / errore), mostriamo in un container tutti i dati del ticket selezionato -->
  <div v-else class="container">
    <ContentContainer>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="!isLoading && ticket" class="d-flex flex-column">
        <div class="flex-grow-1 d-flex flex-column gap-3 main-info mb-3">
          <div class="d-flex flex-column gap-3">
            <TicketInfo :label="'Oggetto richiesta'" :value="ticket.riepilogo" />
            <TicketInfo :label="'Data creazione'" :value="formatTimestamp(ticket.insertDate)" />
            <TicketInfo :label="'Data sollecito'" :value="sollecito" />
            <TicketInfo :label="'Numero ticket'" :value="ticket.ticketId" />
            <TicketInfo :label="'Categoria'" :value="ticket?.categoria?.nome || '-'" />
            <TicketInfo :label="'Stato richiesta'" :value="ticket.lavorazione.stato" />
            <TicketInfo :label="'Descrizione estesa'" :value="ticket.dettaglio" />
            <TicketInfo :label="'Urgenza'" :value="ticket.urgenza" />
            <TicketInfo v-if="ticket.lavorazione.risoluzione" :label="'Risposta'"
              :value="ticket.lavorazione.risoluzione" />
            <TicketFileAnchor v-if="allegati != null" :data="allegati" :ticket-id="ticket.ticketId" />
            <TicketInfo :label="'Richiedente'" :value="`${ticket.richiedente.nome} ${ticket.richiedente.cognome}`" />
          </div>
          <div class="w-full d-flex justify-content-center">
            <TicketsTableCTA :ticket="ticket" :size="'large'" />
          </div>
        </div>
      </div>
    </ContentContainer>

    <h3>Info Aggiuntive</h3>

    <ContentContainer>
      <TicketInfoLavoro :ticket-id="ticket.ticketId" :info-lavoro="ticket?.infoLavoro || []"
        :stato-ticket="ticket.lavorazione.stato" :allegati-presenti="aggregatedAllegati" />
    </ContentContainer>
  </div>
</template>


<style scoped>
.container {
  padding: unset;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>