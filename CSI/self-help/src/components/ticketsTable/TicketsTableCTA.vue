<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { apiInstanceJson as apiInstance } from '@/util/api'
import { formatDate, useApiData } from '@csi/design-system-core'
import { useModalStore } from '@/stores/modalStore'
import { invalidateCache } from 'alova'
import { toastPromise } from '@/util/toast.js'
import CTAButton from './CTAButton.vue'

const modalStore = useModalStore() // gestione dei modali di conferma
const router = useRouter()


// prendiamo come props i dati del ticket in questione su cui effettuare le azioni
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    validator: (value) => ['small', 'large'].includes(value),
    default: 'small'
  }
});

// prendiamo l'ID del ticket che si vuole riaprire/sollecitare
const ticketId = props.ticket.ticketId;

// restituisce un oggetto FormData (per solleciti/riaperture, di ticket), utile per inviare dati via API (NUOVA FEATURE)
const createFormData = (riepiologo, tipologia) => {
  const submitFormData = new FormData();
  submitFormData.append('riepilogo', riepiologo);
  submitFormData.append('tipologia', tipologia);
  return submitFormData;
}


// -----------------------------------------------------------------------------------
// -------------------------------- RIAPERTURA ---------------------------------------
// -----------------------------------------------------------------------------------


/* 
creiamo una promise in cui passiamo alla modale delle proprietà di testo da inserire e metodi in ascolto per le azioni sul ticket
metodi: 
- onConfirm() -> per confermare la riapertura e evocare il doRiapertura(ticketID)
- onCancel() -> la richiesta viene cancellata
*/
const performRiapertura = async () => {

  return new Promise((resolve) => {
    modalStore.openModal({
      title: 'Riapertura ticket',
      message: 'Sicuro di voler riaprire il ticket?',
      onConfirm: async () => {
        await doRiapertura(ticketId);
        resolve()
      },
      onCancel: () => {
        resolve();
      }
    });
  });
}

const callbackRiapertura = (res) => {
  return `Richiesta di riapertura inviata con successo!`;
}

const doRiapertura = async (ticketId) => {

  // 
  const submitFormData = createFormData('riapertura', 'Richiesta riapertura');

  // creazione della richiesta API per la modifica dello stato del sollecito, restetuendo una promise in pending da risolvere
  const promise = apiInstance.Put(`/api/itsm/tickets/${ticketId}/info-dettagli`, submitFormData);

  // risolviamo la "promise" all'interno della funziona toastPromise, passando una callback con messaggio di successo di return
  await toastPromise('Richiesta di riapertura in corso...', callbackRiapertura, promise);
}

// ---------------------------------------------------------------------------------------
// ------------------------------------ SOLLECITI ----------------------------------------
// ---------------------------------------------------------------------------------------

// filtra dei ticket (infoLavoro) per trovare i solleciti già inviati e li ordina per data (dal + recente al + vecchio)
const checkSolleciti = (infoLavoro) => {
  const solleciti = infoLavoro
    .filter((item) => item.tipologia === 'Sollecito')
    .sort((a, b) => new Date(b.dataLog) - new Date(a.dataLog))
  return solleciti;
}

/* 
creiamo una promise in cui passiamo alla modale delle proprietà di testo da inserire e metodi in ascolto per le azioni sul ticket
metodi: 
- onConfirm() -> per confermare la riapertura e evocare il doRiapertura(ticketID)
- onCancel() -> la richiesta viene cancellata
*/
const performSollecito = () => {

  return new Promise(async (resolve) => {

    const request = apiInstance.Get(`/api/itsm/tickets/${ticketId}/info-dettagli`)
    invalidateCache(request)

    const result = await request

    if (result) {
      const solleciti = checkSolleciti(result)
      const message = solleciti.length
        ? `Hai già sollecitato in data ${formatDate(solleciti[0].dataLog)}, vuoi sollecitare nuovamente il ticket?`
        : `Vuoi sollecitare il ticket ${ticketId}?`
      modalStore.openModal({
        title: 'Sollecito ticket',
        message: message,
        onConfirm: async () => {
          await doSollecito(ticketId)
          resolve()
        },
        onCancel: () => resolve()
      })
    } else {
      modalStore.openModal({
        title: 'Sollecito ticket',
        errors: 'Errore durante la comunicazione con il server.'
      })
    }
  })
}


const callback = (res) => {
  return `Richiesta di sollecito inviata con successo!`;
}

const doSollecito = async (ticketId) => {

  const submitFormData = createFormData('sollecito', 'Sollecito');

  // creazione della richiesta API per la modifica dello stato del sollecito, restetuendo una promise in pending da risolvere
  const promise = apiInstance.Put(`/api/itsm/tickets/${ticketId}/info-dettagli`, submitFormData);

  // risolviamo la "promise" all'interno della funziona toastPromise, passando una callback con messaggio di successo di return
  await toastPromise('Richiesta di sollecito in corso...', callback, promise);
}


// --------------------------------------------

let duplicaEnabled = false
let duplicaAction = () => { }

try {
  const idSelfHelpParsed = JSON.parse(props.ticket.idSelfHelp)
  if (idSelfHelpParsed && idSelfHelpParsed.rawData) {
    duplicaEnabled = true
    duplicaAction = () => {
      localStorage.setItem('rawdata', JSON.stringify(idSelfHelpParsed.rawData))

      router.push({
        name: 'form-detail',
        params: { id: idSelfHelpParsed.id }
      })
    }
  }
} catch (e) {
  console.error('Errore nel parsing di idSelfHelp:', e)
}

const ctas = [
  {
    icon: 'it-restore',
    label: 'Riapri',
    action: performRiapertura,
    disabled: props.ticket.lavorazione.stato !== 'Risolto'
  },
  {
    icon: 'it-warning-circle',
    label: 'Sollecita',
    action: performSollecito,
    disabled: ['Chiuso', 'Risolto', 'Annullato'].includes(props.ticket.lavorazione.stato)
  },
  {
    icon: 'it-copy',
    label: 'Duplica',
    action: duplicaAction,
    disabled: !duplicaEnabled
  }
];
</script>

<template>
  <div class="ticket-cta">
    <CTAButton v-for="(cta, index) in ctas" :data="cta" :key="`tickets-cta-${index}`" :size="size" />
  </div>
</template>

<style scoped>
.ticket-cta {
  display: flex;
  gap: 1rem;
}

@media screen and (max-width: 1199px) {

  /* quando entriamo in modalità tabella responsive reworkata (DA MIGRARE CON BOOTSTRAP ITA), mettiamo al fondo le azioni */
  .ticket-cta {
    justify-content: flex-end;
  }
}
</style>
