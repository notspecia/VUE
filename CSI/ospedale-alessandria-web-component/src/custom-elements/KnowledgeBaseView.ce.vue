<script setup>
import { onMounted, ref, watch } from 'vue';
import { getFetch, postFetch } from '../../services/api';
import { getApiMangerPath, getUserAth, urlParamsManager, getParam, scrollTopView, getApiConfigbff, debounce } from '../../services/utils';
import SpinnerComponent from '../components/Common/SpinnerComponent.vue';
import BreadCrumbs from '../components/Common/BreadCrumbs.vue';
import InputSearch from '../components/KLB/InputSearch.vue';
import AssistanceComponent from '../components/KLB/AssistanceComponent.vue';
import ToastComponent from '../components/Common/ToastComponent.vue';
import AssistanceContainerComponent from '@/components/Common/AssistanceContainerComponent.vue';

/* DATA */
const userAuthenticated = ref(null);
const searchLoading = ref(false);
const searchOptions = ref(null);
const isLoadingDetail = ref(false);
const showList = ref(true);
const faqList = ref(null);
const faqDetail = ref(null);
const currentCategory = ref(null);
const breadcrumbLink = ref([]);
const errorMessages = ref(null);
const configObject = ref(null);
const basicLink = ref(null);
const basePath = window.location.origin;
const fullPathname = window.location.pathname;
const pathNameWithoutLastPage = fullPathname.substring(0, fullPathname.lastIndexOf('/'));
const assistances = ref(null);

// TOAST
const showToast = ref(false);
const toastMessage = ref(null);

/* WATCH */
watch(configObject, (newConfigObject) => {
  // aggiorniamo la ref con i link di assistenza
  if (newConfigObject) {
    assistances.value = {
      blank: {
        url: `${basePath}${pathNameWithoutLastPage}/${newConfigObject.path_klb}?form=blank`,
      },
      other: {
        url: `${basePath}${pathNameWithoutLastPage}/${newConfigObject.path_klb}?form=other`,
      },
    };
  }
});

// NEW TICKET
const newTicket = ref(false)
const formType = ref(null);
const TYPES_OF_FORM = ['blank', 'other'];

/* FUNZIONI */
const goToHome = () => {
  window.location.href = window.location.origin;
};

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
// GET LISTA FAQ O DETTAGLIO RISPOSTA
const getFaqList = async (categoryId) => {
  let url = categoryId
    ? `${getApiMangerPath()}/knowledge_bases/1/categories/${categoryId}`
    : `${getApiMangerPath()}/knowledge_bases/1/categories`;

  return await getFetch(url);
};
// GET DETTAGLIO RISPOSTA
const getAnswerList = async (categoryId, idAnswer) => {
  let url = `${getApiMangerPath()}/knowledge_bases/1/categories/${categoryId}/answers/${idAnswer}`;
  return await getFetch(url);
};
// AGGIORNA URL E CARICA LISTA O DETTAGLIO RISPOSTA, GESTISCE ANCHE IL FORM
const updateUrl = async (categoryId, idAnswer) => {

  formType.value = getParam('form'); // CONTROLLIAMO SE C'è FORM NELLA URL
  if (formType.value) {
    // PER EVITARE CHE L'APERTURA DI UN FORM INFLUSICA SULLA VISUALIZZAZIONE DELLA KLB, RESETTIAMO I PARAMETRI NEL CASO SIA PRESENTE FORM
    newTicket.value = false
    const url = new URL(window.location.href);
    url.search = ''; // CANCELLA TUTTI I QUERY PARAM, INCLUSI 'FORM'
    window.history.replaceState({}, '', url.toString()); // AGGIORNA L'URL SENZA RICARICARE LA PAGINA
  }
  scrollTopView(150); // ### DA RIVEDERE CON DANIEL
  urlKLB(categoryId, idAnswer);
  currentCategory.value = null;
  isLoadingDetail.value = true;
  // SE NON C'è ID RICHIESTA, CARICA LA LISTA DELLE CATEGORIE
  await getFaqList(categoryId).then(data => {
    currentCategory.value = categoryId;
    faqList.value = data;
    showList.value = idAnswer ? false : true;
    faqDetail.value = null;
    breadcrumbLink.value = data.breadcrumb;
    isLoadingDetail.value = idAnswer ? true : false;
  }).catch(error => {
    console.error(error)
    isLoadingDetail.value = false;
  });
  // SE C'è ID RISPOSTA, CARICA IL DETTAGLIO DELLA RISPOSTA
  if (idAnswer) {
    await getAnswerList(categoryId, idAnswer).then(data => {
      faqDetail.value = data;
      showList.value = false;
      breadcrumbLink.value.push({ id: categoryId, name: data.title });
      isLoadingDetail.value = false;
    }).catch(error => {
      console.error(error)
      isLoadingDetail.value = false;
    });
  }
};

// API RICERCA KLB
const searchKLB = async (data) => {
  const url = getApiMangerPath() + `/knowledge_bases/search`;
  const response = await postFetch(url, data);
  return response;
};

// FUNZIONE DEBOUNCE PER LA RICERCA
const debouncedSearchKLB = debounce(searchKLB, 300);

// GESTISCE LA URL DELLA KLB ANCHE ID E ID ANSWER DELLE RISPOSTE
const urlKLB = (id, idAnswer) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (id) {
    urlParams.set('faq', id);
  } else {
    urlParams.delete('faq');
  }
  if (idAnswer) {
    urlParams.set('idAnswer', idAnswer);
  } else {
    urlParams.delete('idAnswer');
  }
  let queryParam = id ? '?' : '';
  const newURL = `${window.location.pathname}${queryParam}${urlParams.toString()}`;
  window.history.pushState({ path: newURL }, '', newURL);
};
// CHIAMA LA FUNZIONE DI RICERCA UTILIZZANDO IL DEBOUNCE
const updateSearch = async (value) => {
  if (value.length >= 0) {
    searchLoading.value = true;
    try {
      searchOptions.value = null;
      let payload = {
        knowledge_base_id: 1,
        locale: "it-it",
        flavor: "public",
        query: value,
      };
      let data = await debouncedSearchKLB(payload);
      searchOptions.value = data;
      searchLoading.value = false;
    } catch (error) {
      errorMessages.value = error;
      searchLoading.value = false;
    }
  } else {
    searchLoading.value = false;
    searchOptions.value = null;
  }
};

/* CICLI VITA DEL COMPONENTE */
onMounted(async () => {
  isLoadingDetail.value = true
  newTicket.value = false // EVITA DI APRIRE IL FORM SE NON è STATO CLICCATO
  userAuthenticated.value = await getUserAth(); // CONTROLLO SU UTENTE AUTENTICATO
  try {
    // CARICA OGGETTO CONFIGURAZIONE
    let result = await getApiConfigbff();
    configObject.value = result;
    basicLink.value = configObject.value && configObject.value.name_klb ? configObject.value.name_klb : ''
    // CONTROLLA SE SIAMO DENTRO UNA ROTTA DI FORM
    formType.value = getParam('form');
    if (formType.value) {
      // CONTROLLIAMO SE IL TIPO DI FORM è TRA QUELLI PREVISTI, IL DEFAULT è BLANK
      let formParam = TYPES_OF_FORM.includes(formType.value) ? formType.value : 'blank'
      let urlParam = { form: formParam };
      let clearParams = !Object.keys(urlParam).length;
      urlParamsManager(urlParam, clearParams);
      newTicket.value = true
    } else {
      // GESTISCE ROTTE FAQ E DETTAGLIO RISPOSTA
      let idFaq = getParam('faq');
      let idAnswer = getParam('idAnswer');
      await urlKLB(idFaq, idAnswer);
      await updateUrl(idFaq, idAnswer);
    }
    isLoadingDetail.value = false
  } catch (error) {
    console.log(error) // ### GESTIRE ERRORE 
    errorMessages.value = error;
    isLoadingDetail.value = false
  }

});
</script>

<template>
  <div class="mb-4">
    <div v-if="!isLoadingDetail" class="my-2">
      <template v-if="!errorMessages && !newTicket">
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2">
          <!-- FILO D'ARIANNA -->
          <BreadCrumbs :links="breadcrumbLink" :basicLink="basicLink" @updateUrl="updateUrl" class="mt-2" />
          <!-- ### QUESTO POTREBBE DIVERNTARE UN COMPONENTE -->
          <template v-if="userAuthenticated">
            <a :href="`${pathNameWithoutLastPage}/${configObject.path_ticket}`"
              :aria-label="`Vai a ${configObject.name_ticket}`" v-if="configObject">
              <div class="avatar avatar-border d-flex align-items-center justify-content-center font-weight-bold">
                <span>{{ userAuthenticated.nome.charAt(0).toUpperCase() }}{{
                  userAuthenticated.cognome.charAt(0).toUpperCase()
                }}</span>
              </div>
            </a>
          </template>
          <template v-else>
            <a :href="`${pathNameWithoutLastPage}/${configObject.path_ticket}`" class="btn btn-primary"
              :aria-label="`Vai a ${configObject.name_ticket}`" v-if="configObject">
              {{ configObject.name_ticket }}
            </a>
          </template>
        </div>
        <h2 class="card-title h3 my-2 text-center text-md-start">Per cosa ti serve assistenza?</h2>
        <!-- SEARCH KLB -->
        <InputSearch id="inputSearch" label-text="Cerca in Assistenza" @updateSearch="updateSearch"
          @updateUrl="updateUrl" search-from-list="true" :data-list-object="searchOptions" :spinner="searchLoading" />
        <!-- LISTA CATEGORIE -->
        <div class="csi-ce--knowledge-base px-4" v-if="showList" role="region"
          aria-label="Lista delle categorie di assistenza">
          <div class="row" v-if="faqList && faqList.category">
            <h3 class="card-title h4 mb-1" aria-label="Categoria selezionata">
              {{ faqList.category.name }}
            </h3>
          </div>
          <div class="row" v-else>
            <!-- TITOLO CATEGORIE -->
            <!-- ### TODO fare deploy e verificare :aria-label!! -->
            <div v-for="(faq, index) in faqList" class="col-xl-4 col-lg-4 col-md-6 col-12 gy-2 mb-1" :key="index">
              <div class="card d-block clickable-card" @click="updateUrl(faq.id, null)" role="button" tabindex="0"
                :aria-label="`Apri categoria ${faq.name}`">
                <div class="card-body">
                  <h3 class="card-title h4">{{ faq.name }}</h3>
                </div>
              </div>
            </div>
          </div>
          <!-- SOTTO CATEGORIE -->
          <div v-if="faqList && faqList.children" class="row">
            <div v-for="(faq, index) in faqList.children" class="col-xl-4 col-lg-4 col-md-6 col-12 gy-2 mb-1"
              :key="index">
              <div class="card d-block clickable-card" @click="updateUrl(faq.id, null)" role="button" tabindex="0"
                :aria-label="`Apri sotto-categoria ${faq.name}`">
                <div class="card-body">
                  <h6 class="card-title d-flex h-100 mb-3">{{ faq.name }}</h6>
                </div>
              </div>
            </div>
          </div>
          <!-- RISPOSTE -->
          <div v-if="faqList && faqList.answers" class="row">
            <div v-for="(faq2, index) in faqList.answers" :key="index" class="col-xl-4 col-lg-4 col-md-6 col-12 gy-1">
              <div class="card-wrapper card-space">
                <div class="card card-bg clickable-card" @click="updateUrl(currentCategory, faq2.id)" role="button"
                  tabindex="0" :aria-label="`Apri risposta ${faq2.title}`">
                  <div class="card-body">
                    <h6 class="card-title d-flex h-100 mb-3">
                      {{ faq2.title }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DETTAGLIO RISPOSTA -->
        <div v-if="faqDetail && !showList">
          <h3 class="card-title h4 mb-3" aria-label="Dettaglio risposta">
            {{ faqDetail.title }}
          </h3>
          <div class="card-detail-body" v-html="faqDetail.body"></div>
        </div>
      </template>
      <div v-if="newTicket && configObject">
        <!-- COMPONENTE FORM NUOVA RICHIESTA  CON PROPRIO BREADCRUMB-->
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2">
          <BreadCrumbs :links="breadcrumbLink" :basicLink="basicLink" @updateUrl="updateUrl(null, null)" class="mt-2" />
          <!-- ### QUESTO POTREBBE DIVERNTARE UN COMPONENTE -->
          <template v-if="userAuthenticated">
            <a :href="`${pathNameWithoutLastPage}/${configObject.path_ticket}`"
              :aria-label="`Vai a ${configObject.name_ticket}`" v-if="configObject">
              <div class="avatar avatar-border d-flex align-items-center justify-content-center font-weight-bold">
                <span>{{ userAuthenticated.nome.charAt(0).toUpperCase() }}{{
                  userAuthenticated.cognome.charAt(0).toUpperCase()
                }}</span>
              </div>
            </a>
          </template>
          <template v-else>
            <a :href="`${pathNameWithoutLastPage}/${configObject.path_ticket}`" class="btn btn-primary"
              :aria-label="`Vai a ${configObject.name_ticket}`" v-if="configObject">
              {{ configObject.name_ticket }}
            </a>
          </template>
        </div>
        <AssistanceComponent :configObject="configObject" :formType="formType" :userAuthenticated="userAuthenticated"
          @updateUrl="updateUrl" @showCustomToast="showCustomToast" />
      </div>
      <!-- GESTIONE ERRORI -->
      <div v-if="errorMessages">
        <!-- ERRORE API MAGARI FARE COMPONENTE GENERICO -->
        <div class="alert alert-danger " role="alert">
          <h4>Ops! Si è verificato un problema. Riprova più tardi.</h4>
          <div class="d-flex justify-content-between mt-3">
            <button type="button" class="btn btn-outline-primary" @click="goToHome" aria-label="Torna alla homepage">
              Vai alla homepage
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row py-2 justify-content-center full-width overlay" aria-live="polite" aria-busy="true">
        <div class="col-auto">
          <SpinnerComponent></SpinnerComponent>
        </div>
      </div>
      <br>
    </div>
    <!-- COMPONENTE TOAST PER MESSAGGI DI ERRORE O SUCCESSO  -->
    <template v-if="showToast">
      <ToastComponent :message="toastMessage" @hideToast="hideToast" aria-live="polite" />
    </template>
  </div>
  <!-- SEZIONE RIMANDO AI FORM  -->
  <AssistanceContainerComponent v-if="assistances" :assistances="assistances" />

</template>

<style lang="scss">
// ATTENZIONE! ATENCIÓN! WARNING!
// Gli stili globali definiti in main.scss non influenzano i Web Components a meno che non vengano iniettati manualmente.
// Se un componente non ha uno <style> interno, non erediterà alcuno stile dal file main.scss.
// LASCIARE ALMENO UN ELEMENTO CSS ANCHE VUOTO OPPURE IMPORT!
@import '../assets/klb';
@import '../assets/tickets';
@import '../assets/layout';
</style>