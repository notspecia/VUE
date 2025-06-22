<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { getApiConfigbff, getUserAth, getParam, urlParamsManager, scrollTopView, formatDate } from '../../services/utils';
import { getFetch } from '../../services/api';
import BreadCrumbs from '@/components/Common/BreadCrumbs.vue';
import DetailTicketComponent from '@/components/Tickets/DetailTicketComponent.vue';
import SpinnerComponent from '@/components/Common/SpinnerComponent.vue';
import PaginationComponent from '@/components/Common/PaginationComponent.vue';
import ToastComponent from '../components/Common/ToastComponent.vue';
import AssistanceContainerComponent from '@/components/Common/AssistanceContainerComponent.vue';

/* DATA */
// GENERALI
const isLoading = ref(false);
const errorMessages = ref(null);
const basePath = window.location.origin;
const fullPathname = window.location.pathname;
const pathNameWithoutLastPage = fullPathname.substring(0, fullPathname.lastIndexOf('/'))
const configObject = ref(null);
const assistances = ref(null);

// BREADCRUMS
const backLinkObj = ref(null);
const basicLink = ref(null);
const breadcrumbLink = ref([]);

// PAGINATION
const currentPage = ref(1);
const itemsPerPage = ref(5);

//DETAIL TICKETS
const idSelected = ref(null);
const ticketSelected = ref(null);
const ticketArticles = ref([]);

// NUOVO TICKET ARTICLE
const newTicketArticles = ref({
  type_id: null,
  body: "",
  content_type: "text/html",
  attachments: [],
  from: "paoloberretta@csi.it" // da dove lo prendo?
});

// ALL TICKETS
const ticketsList = ref([]);
const search = ref('');
const showList = ref(true);

// TOAST
const showToast = ref(false);
const toastMessage = ref(null);


/* WATCH */
watch(backLinkObj, (newBackLinkObj) => {
  // aggiorniamo la ref con i link di assistenza
  if (newBackLinkObj) {
    assistances.value = {
      blank: {
        url: `${basePath}${pathNameWithoutLastPage}/${newBackLinkObj.link}?form=blank`,
      },
      other: {
        url: `${basePath}${pathNameWithoutLastPage}/${newBackLinkObj.link}?form=other`,
      },
    };
  }
});


/* COMPUTED */
const filteredTickets = computed(() => {
  return ticketsList.value.filter(ticket =>
    ticket.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const paginatedTickets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTickets.value.slice(start, end);
});


/* FUNZIONI */
const goToHome = () => {
  window.location.href = window.location.origin;
};

// METODI NAVIGA PAGINAZIONE
const prevPage = () => {
  currentPage.value--
  scrollTopView(50)
}

const nextPage = () => {
  currentPage.value++
  scrollTopView(50)
}

const jumpToPage = (page) => {
  currentPage.value = page
  scrollTopView(50)
}

// FUNZIONI PER TOAST
const showCustomToast = (message) => {
  showToast.value = true;
  toastMessage.value = message;
  setTimeout(() => {
    showToast.value = false;
  }, 5000);
};

const hideToast = () => {
  showToast.value = false;
};

// CHIAMATE TICKET ALL E SINGOLO
const getTicketsList = async (id) => {
  let combinedData = [];
  //CHIAMATA TICKET SINGOLO SE C'è ID
  if (id) {
    const urlWithId = import.meta.env.VITE_BASE_URL_API_MANAGER_AUTH + `/tickets/${id}`;
    return getFetch(urlWithId);
  }
  //CHIAMATA ELENCO TICKETS

  const url = import.meta.env.VITE_BASE_URL_API_MANAGER_AUTH + '/tickets/search';
  // API MANAGER MOSTRA I PRIMI 100 TICKETS PER POTER VEDERE GLI ALTRI BISOGNA SCORRERE LE PAGINE. LA FUNZIONE CONTROLLA SE CE NE SONO ALMENO CENTO RIFA LA CHIAMATA FINO A QUANDO LA PAGINE CONTIENE MENO DI 100 ELEMENTI (PROBABILMENTE L'API VERRà RIPENSATA MANDANDO AL FRONTEND GLI ULTIMI TICKET IN ORDINE DI AGGIORNAMENTO)
  let page = 1;
  let data;

  do {
    const pageUrl = `${url}?page=${page}`;
    data = await getFetch(pageUrl);

    if (Array.isArray(data)) {
      // AGGIUNGO I DATI ALL'ARRAY COMBINATO
      combinedData = [...combinedData, ...data];
    }
    // AD OGNI CICLO AUMENTO IL NUMERO DI PAGINA
    page++;
  } while (Array.isArray(data) && data.length > 99);

  return combinedData;
};

// I TICKET ARTICLES SONO PARTE DEL TICKET STESSO E NON HANNO UNA CHIAMATA DEDICATA SONO LE CONVERSAZIONI TRA UTENTE E OPERATORE
const getTicketsDetailArticles = async (id) => {
  const url = import.meta.env.VITE_BASE_URL_API_MANAGER_AUTH + '/tickets/' + id + '/articles';
  return getFetch(url)
};

// AGGIORNA DATI E URL NON POTENDO USARE ROUTING USIAMO QUERY PARAMS PER CAMBIARE PAGINE E COMPONENTI
const updateUrl = async (ticket, obj) => {
  idSelected.value = obj ? obj.id : null;
  ticketSelected.value = ticket;
  scrollTopView(150); // ### DA RIVEDERE CON DANIEL
  let urlParam = obj ? obj : {};
  let clearParams = !Object.keys(urlParam).length;
  urlParamsManager(urlParam, clearParams);
  errorMessages.value = null;
  isLoading.value = true;

  if (obj && obj.id) {
    await getTicketsDetailArticles(obj.id).then(data => {
      if (data.length > 0) {
        ticketArticles.value = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      }
      showList.value = ticketArticles.value.length > 0 ? false : true;
      isLoading.value = false;
      breadcrumbLink.value.push({ name: obj.id });

    }).catch(error => {
      errorMessages.value = error;
      isLoading.value = false;
      let message = {
        title: 'Errore',
        subtitle: '',
        type: 'danger',
        text: 'Operazione non conclusa'
      }
      showCustomToast(message)
    });
  } else if (obj && obj.form) {
    isLoading.value = false;
    return
  }
  else {
    await getTicketsList().then(data => {
      if (data.length > 0) {
        ticketsList.value = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      }
      showList.value = true;
      ticketArticles.value = [];
      isLoading.value = false;
      breadcrumbLink.value = [];
    }).catch(error => {
      errorMessages.value = error;
      isLoading.value = false;
    });
  }
};

// AGGIORNA TICKET
const updateTicket = async (ticket, detailUpdateForm) => {
  scrollTopView(50)
  newTicketArticles.value.body = detailUpdateForm.body ? detailUpdateForm.body : '';
  newTicketArticles.value.attachments = detailUpdateForm.attachments;
  isLoading.value = true;
  const articleParam = detailUpdateForm ? '/articles' : '';
  const url = import.meta.env.VITE_BASE_URL_API_MANAGER_AUTH + '/tickets/' + ticket.id + articleParam;
  const body = detailUpdateForm.body ? newTicketArticles.value : ticket;
  // HO PREFERITO FARE UNA FETCH SPECIFICA PER GESTIRE LA CHIAMATA 
  await fetch(url, {
    method: detailUpdateForm && detailUpdateForm.body ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) {
        errorMessages.value = 'Errore durante l\'invio della richiesta';
        isLoading.value = false;
        throw new Error('Errore durante l\'invio della richiesta');
      }
      return response.json();
    })
  if (detailUpdateForm && detailUpdateForm.body) {
    await getTicketsDetailArticles(ticket.id).then(data => {
      if (data.length > 0) {
        // RIORDINIAMO PER DATA MODIFICA
        ticketArticles.value = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        let message = {
          title: 'Successo',
          subtitle: '',
          type: 'success',
          text: 'Dati aggiornati!'
        }
        showCustomToast(message)
      }
    }).catch(error => {
      errorMessages.value = error;
      isLoading.value = false;
    });
  }
  await getTicketsList(ticket.id).then(data => {
    ticketSelected.value = data
    newTicketArticles.value.body = '';
    isLoading.value = false;
  }).catch(error => {
    newTicketArticles.value.body = '';
    errorMessages.value = error;
    isLoading.value = false;
  });
};

const closeTicket = async (ticket) => {
  ticket.state_id = 8;
  updateTicket(ticket, null)
};


/* CICLI VITA DEL COMPONENTE */
onMounted(async () => {
  // PRIMA VERIFICHIAMO SE è AUTENTICATO
  let isAthorized = await getUserAth();
  try {
    isLoading.value = true;
    let result = await getApiConfigbff();
    configObject.value = result
    newTicketArticles.value.type_id = configObject.value.type_id
    basicLink.value = configObject.value && configObject.value.name_ticket ? configObject.value.name_ticket : ''
    // SERVE PER PASSARE IL LINK AD UNA PAGINA ESTERNA AL PROPRIO WEB COMPONENT ESEMPIO KLB
    backLinkObj.value = {
      name: configObject.value.name_klb,
      link: configObject.value.path_klb
    }

    // CONTROLLA SE C'è UN ID NELLA QUERY PARAMS E SE C'è CHIAMA LA FUNZIONE PER RICAVARE I DETTAGLI DEL TICKET
    let id = getParam('id');
    let obj = id ? { "id": id } : '';

    updateUrl(null, obj);

    if (obj && obj.id) {
      try {
        let data = await getTicketsList(obj.id);
        ticketSelected.value = data;
      } catch (error) {
        errorMessages.value = error;
        isLoading.value = false;
      }
    }
  } catch (error) {
    errorMessages.value = error;
    console.error("Error in onMounted:", error);
    isLoading.value = false;
  }
});

</script>

<template>
  <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-4" v-if="!isLoading">
    <!-- FILO D'ARIANNA -->
    <BreadCrumbs :links="breadcrumbLink" :basicLink="basicLink" :backLinkObj="backLinkObj" @updateUrl="updateUrl"
      class="mt-2" />

    <a :href="`${basePath}${pathNameWithoutLastPage}/${backLinkObj.link}?form=blank`" class="btn btn-primary"
      aria-label="Apri modulo per nuova richiesta">
      NUOVA RICHIESTA
    </a>
  </div>

  <!-- ELENCO RICHIESTE ORDINATE PER ULTIMO AGGIORNAMENTO -->
  <div>

    <div v-if="!isLoading">
      <template v-if="!errorMessages">
        <div class="row justify-content-center" v-if="ticketArticles.length < 1 && showList">
          <div class="row py-2 justify-content-center" v-if="!errorMessages">
            <div class="col-auto">
              <h3>Ultime richieste</h3>
            </div>
          </div>
          <div class="col-12 col-lg-10" v-if="!errorMessages">
            <!-- ELENCO TUTTI TICKET PAGINATI-->
            <template v-if="paginatedTickets.length > 0">
              <div v-for="(ticket, index) in paginatedTickets" :key="index" class="csi-ce--tickets px-4">
                <div class="card d-block clickable-card mt-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h6 class="card-title d-flex h-100 mb-3" :aria-label="`Richiesta assistenza numero ${ticket.id}`">
                        Richiesta assistenza N°{{ ticket.id }}
                      </h6>
                      <h6 class="card-title d-flex h-100 mb-3" :aria-label="`Stato richiesta: ${ticket.state}`">
                        {{ ticket.state }}
                      </h6>
                    </div>
                    <p>
                      Tipologia problematica:
                      <b>{{ ticket.title }}</b>
                    </p>
                    <p>
                      Creato il:
                      <b>{{ formatDate(ticket.created_at, 'dd/MM/yyyy') }}</b>
                    </p>
                    <p>
                      Aggiornato il:
                      <b>{{ formatDate(ticket.updated_at, 'dd/MM/yyyy') }}</b>
                    </p>
                    <div class="row gap-2 py-3">
                      <div class="col-md-auto col-12">
                        <button type="button" @click="updateUrl(ticket, { id: ticket.id })"
                          class="justify-content-center btn w-100 btn-primary"
                          :aria-label="`Vai alla richiesta numero ${ticket.id}`">
                          Vai alla richiesta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- COMPONENTE PAGINAZIONE -->
              <PaginationComponent :filteredTickets="filteredTickets" :itemsPerPage="itemsPerPage"
                :currentPage="currentPage" @nextPage="nextPage" @prevPage="prevPage" @jumpToPage="jumpToPage">
              </PaginationComponent>
            </template>
            <template v-else>
              <div class="csi-ce--tickets px-4">
                <div class="card d-block clickable-card mt-3">
                  <div class="card-body">
                    <div class="alert alert-info" role="info">
                      <h4>Non hai richieste da visulizzare</h4>
                      <div class="d-flex justify-content-between mt-3">
                        <p>
                          Se desideri aprire una richiesta clicca sul pulsante "Nuova richiesta"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <!-- LOADER CARICAMENTO  -->
    <div v-else>
      <div class="row py-2 justify-content-center full-width overlay" aria-live="polite" aria-busy="true">
        <div class="col-auto">
          <SpinnerComponent></SpinnerComponent>
        </div>
      </div>
      <br />
    </div>
    <!-- GESTIONE ERRORI  -->
    <div v-if="errorMessages">
      <!-- ERRORE API MAGARI FARE COMPONENTE GENERICO  -->
      <div class="alert alert-danger" role="alert">
        <h4>Ops! Si è verificato un problema. Riprova più tardi.</h4>
        <div class="d-flex justify-content-between mt-3">
          <button type="button" class="btn btn-outline-primary" @click="goToHome()" aria-label="Vai alla homepage">
            Vai alla homepage
          </button>
        </div>
      </div>
    </div>
    <!-- DETTAGLIO RICHIESTA CON COMPONENTE TIMELINE  -->
    <div v-if="ticketArticles.length > 0 && !showList && !isLoading && !errorMessages" aria-live="polite">
      <DetailTicketComponent :ticketArticles="ticketArticles" :id="idSelected" :ticket="ticketSelected"
        @closeTicket="closeTicket" @updateTicket="updateTicket" />
    </div>
    <!-- COMPONENTE TOAST PER MESSAGGI DI ERRORE O SUCCESSO  -->
    <template v-if="showToast">
      <ToastComponent :message="toastMessage" @hideToast="hideToast" aria-live="polite" />
    </template>
    <!-- SEZIONE RIMANDO AI FORM  -->
    <AssistanceContainerComponent v-if="assistances" :assistances="assistances" />
  </div>

</template>

<style lang="scss">
// ATTENZIONE! ATENCIÓN! WARNING!
// Gli stili globali definiti in main.scss non influenzano i Web Components a meno che non vengano iniettati manualmente.
// Se un componente non ha uno <style> interno, non erediterà alcuno stile dal file main.scss.
// LASCIARE ALMENO UN ELEMENTO CSS ANCHE VUOTO!

@import '../assets/tickets';
@import '../assets/layout';
</style>