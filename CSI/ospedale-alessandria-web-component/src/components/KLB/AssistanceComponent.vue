<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { sanitizeHTML, scrollTopView, convertAttachmentZammad } from '../../../services/utils'
import { getFetch, postFetch } from '../../../services/api';
import { getApiPathAuth } from '../../../services/utils';
import { TIPOLOGIA_SEGNLAZIONE, AUTORE_CONTATTO } from '../../../services/selectOptions.js';
import { validateCF, validateEmail, validatePhone } from '../../../services/validations.js';
import { resetErrors, resetFields } from '../../../services/resets.js';
import FileUploaderComponent from '../Common/FileUploaderComponent.vue';
import ModalComponent from '../Common/ModalComponent.vue';
import SpinnerComponent from '../Common/SpinnerComponent.vue';
import ShowErrors from '../Common/ShowErrors.vue';
import OTPComponent from '../Common/OTPComponent.vue';


/* PROPS */
const props = defineProps({
  configObject: Object,
  formType: String,
  userAuthenticated: Object
});


/* EMIT */
const emit = defineEmits(['updateUrl', 'showCustomToast']);


/* DATA */
const attachmentsRef = ref(null);
const attachmentsArrayConverted = ref([]);
const isLoading = ref(false);
const showTopError = ref(false); // cambierà valore in 'true', se sono stati validati errori nel form, e renderizzati in cima alla pagina
const serviceCatalog = reactive([]);
const subServiceCatalog = reactive([]);
const spinnerSubItem = ref(false);
const fullPathname = window.location.pathname;
const pathNameWithoutLastPage = fullPathname.substring(0, fullPathname.lastIndexOf('/'));
const needOtp = ref(false);

// oggetto per tenere gli show delle varie modali
const modalsObject = reactive({
  privacy: {
    show: false,
    privacyPolicy: null, // ARRIVA TRAMITE GET HTML!
    id: 'modalPrivacy',
    title: 'Privacy Policy',
    body: ''
  },
  OTP: {
    show: false,
    email: '',
  }
});

// FORM contenente le proprietà dei valori input FORM (sia del form "blank" che "other")
const form = reactive({
  tipologia_segnalazione: '',
  firstName: props.userAuthenticated && props.userAuthenticated['nome'] ? props.userAuthenticated['nome'] : '',
  lastName: props.userAuthenticated && props.userAuthenticated['cognome'] ? props.userAuthenticated['cognome'] : '',
  birthdate: '',
  codice_fiscale: props.userAuthenticated && props.userAuthenticated['codicefiscale'] ? props.userAuthenticated['codicefiscale'] : '',
  email: props.userAuthenticated && props.userAuthenticated['email'] ? props.userAuthenticated['email'] : '',
  phone: '',
  autore_contatto: '',
  parentela_autore_contatto: '',
  cognome_paziente_interessato: '',
  nome_paziente_interessato: '',
  data_nascita_paziente_interessato: '',
  title: '',
  description: '',
  service_catalog_item_id: '',
  service_catalog_sub_item_id: '',
  privacy_policy_accepted: false
});

// ERRORI PER VALIDAZIONE (valori inseriti in caso alcuni campi del form dopo la validazione non sono compilati!)
const errors = reactive({
  tipologia_segnalazione: null,
  firstName: null,
  lastName: null,
  birthdate: null,
  codice_fiscale: null,
  email: null,
  phone: null,
  autore_contatto: null,
  parentela_autore_contatto: null,
  cognome_paziente_interessato: null,
  nome_paziente_interessato: null,
  data_nascita_paziente_interessato: null,
  title: null,
  description: null,
  service_catalog_item_id: null,
  service_catalog_sub_item_id: null,
  privacy_policy_accepted: null
});

// MESSAGGI DI ERRORE, usati per riempire i value dell'oggetto "errors"
const fields = {
  tipologia_segnalazione: 'La tipologia di segnalazione è richiesta',
  firstName: 'Nome è richiesto',
  lastName: 'Cognome è richiesto',
  birthdate: 'Data di nascita è richiesta',
  codice_fiscale: 'Codice fiscale è richiesto',
  email: 'Email è richiesta',
  phone: 'Numero di telefono è richiesto',
  autore_contatto: 'Autore contatto è richiesto',
  parentela_autore_contatto: 'Parentela contatto è richiesta',
  cognome_paziente_interessato: 'Cognome paziente interessato è richiesto',
  nome_paziente_interessato: 'Nome paziente interessato è richiesto',
  data_nascita_paziente_interessato: 'Data di nascita paziente interessato è richiesta',
  title: 'Il titolo è richiesto',
  description: 'La descrizione è richiesta',
  service_catalog_item_id: 'Argomento è richiesto',
  service_catalog_sub_item_id: 'Sotto argomento è richiesto',
  privacy_policy_accepted: 'Devi accettare la privacy'
};

// i campi richiesti di BASE OBBLIGATORI SEMPRE per il form di tipo "blank" && "other"
const requiredFields = reactive({
  blank: [
    'firstName',
    'lastName',
    'birthdate',
    'codice_fiscale',
    'email',
    'phone',
    'title',
    'description',
    'service_catalog_item_id',
    'service_catalog_sub_item_id',
    'privacy_policy_accepted'
  ],
  other: [
    // si aggiornerà ogni cambiamento di "tipologia_segnalazione || autore_contatto", CAMPI BASE + CAMPI DINAMICI
  ]
});


/* FUNZIONI */
const goToHome = () => {
  window.location.href = window.location.origin;
};

const stopLoading = () => {
  isLoading.value = false;
}

const login = async () => {
  let url = getApiPathAuth() + '/login'
  await getFetch(url);
}

// CHIAMATE API PER LE SELECT E PRIVACY
const getServiceCatalogList = async () => {
  const url = import.meta.env.VITE_BASE_URL_API_MANAGER + '/services';
  const data = await getFetch(url);
  const group_id = props.configObject.group_id;
  // FILTRIAMO PER GROUP_ID PERCHè SE SELEZIONIAMO ELEMENTI DI GROUP ID DIVERI AL SUBMIT DEL FORM LA RICHIESTA NON VA A BUON FINE 
  const filteredData = data.filter(service => {
    return service.group_ids.map(Number).includes(group_id);
  });

  serviceCatalog.push(...filteredData);
};

const getServiceCatalogSubItemList = async (id) => {
  spinnerSubItem.value = true;
  const url = import.meta.env.VITE_BASE_URL_API_MANAGER + '/services/' + id;
  const data = await getFetch(url);
  subServiceCatalog.splice(0, subServiceCatalog.length, ...data);
  spinnerSubItem.value = false
};

// fetch per ottenere il corpo della policy privacy
const getPrivacyPolicy = async () => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL_API_MANAGER}/privacy_policy`;
    const data = await getFetch(url, 'text');
    modalsObject.privacy.privacyPolicy = sanitizeHTML(data);
  } catch (error) {
    console.error('Error handling file privacy policy:', error);
  }
};

// funzioni dei componenti allegati
const handleRemoveFile = (index) => {
  attachmentsArrayConverted.value.splice(index, 1);
};

const handleRemoveAllFile = () => {
  attachmentsArrayConverted.value = [];
};

// CONVERTE I FILE IN BASE 64 NEL FORMATO RICHIESTO DA ZAMMAD
const handleFileUpload = async (event) => {
  try {
    const file = event;
    const obj = await convertAttachmentZammad(file);
    attachmentsArrayConverted.value.push(obj);
  } catch (error) {
    emit('showCustomToast', {
      title: 'Errore',
      subtitle: '',
      type: 'danger',
      text: 'Problema con il caricamento dell\'allegato'
    });
    console.error('Error handling file upload:', error);
  }
};


/* FUNZIONI GESTIONE FORM */
const resetForm = async () => {
  scrollTopView(50);
  await resetErrors(errors);
  await resetErrors(form);
  attachmentsRef.value.removeAllFile();
};

// gestione proprita show per mostrare le modali dell oggetto reattivo!
const showModal = (modalKey, value) => {
  modalsObject[modalKey].show = value;
};

// 1 controllo da effettuare (per ora tutti utenti) se l'utente ha già un cookie associato alla sessione perchè ha già fatto un OTP, 
// saltiamo tutto il processo ed effettuiamo la POST del ticket (compilato nel form precendente prima della modale)
const checkOTPNeed = async () => {
  try {
    const response = await postFetch(import.meta.env.VITE_BASE_URL_API + '/otp/need-otp', { email: form.email });
    return response.need_cookie; // true o false, se è true si fa verifica dell'OTP
  } catch (error) {
    emit('showCustomToast', {
      title: 'Errore',
      subtitle: '',
      type: 'danger',
      text: 'Errore controllo OTP!'
    });
  }
};

// evocata dal watch() quando delle select cambiano, resettando + aggiornando il form "other"
const updateFields = () => {
  // reset array dei nomi campi di BASE OBBLIGATORI DEFAULT del form .other! ogni qual volta si cambiano i campi form.tipologia_segnalazione, form.autore_contatto
  requiredFields.other = [
    'firstName',
    'lastName',
    'birthdate',
    'codice_fiscale',
    'email',
    'phone',
    'title',
    'description',
    'privacy_policy_accepted'
  ];

  // CONTROLLI SUI CAMPI IN BASE ALLE SELECT fatte!
  if (['Reclami', 'Segnalazioni', 'Elogi'].includes(form.tipologia_segnalazione)) {
    resetFields(form, ['service_catalog_item_id', 'service_catalog_sub_item_id']); // reset solo dei valori dei campi di quelli citati
    requiredFields.other.push('autore_contatto'); // aggiungiamo un nuov* camp* OBBLIGATORI all'oggetto del form other
    if (form.autore_contatto.length > 0 && form.autore_contatto !== "Interessato") {
      requiredFields.other.push('parentela_autore_contatto', 'cognome_paziente_interessato', 'nome_paziente_interessato', 'data_nascita_paziente_interessato'); // aggiungiamo i campi OBBLIGATORI all'oggetto del form other
    }
  } else {
    resetFields(form, ['autore_contatto', 'parentela_autore_contatto', 'cognome_paziente_interessato', 'nome_paziente_interessato', 'data_nascita_paziente_interessato']); // reset solo dei valori dei campi di quelli citati
    requiredFields.other.push('service_catalog_item_id', 'service_catalog_sub_item_id'); // aggiungiamo un nuov* camp* OBBLIGATORI all'oggetto del form other
  }
};

// VALIDAZIONE FORM, check se ci sono campi vuoti (DA FIXARE CHECCKARE I CAMPI SOLO QUELLI DISPONIBILI) se il campo è UN VALORE FALSEY (stringa vuota o booleano false), lo aggiungiamo come errore il messagio in "fields"
const validateForm = () => {
  // controlliamo in caso di campi input testo, non siano stati inseriti solo spazi vuoti / controllare i valori falsey se ci sono in altri campi
  requiredFields[props.formType].forEach(field => {
    if (typeof form[field] === "string" && form[field].trim() === "" || !form[field]) {
      errors[field] = fields[field];
    }
  });
  scrollTopView(150); // ### DA RIVEDERE CON DANIEL
  return Object.values(errors).every(error => !error); // verifica se ci sono errori (se ci sono restituirà false)
};

// funzione per fetch POST del ticket dopo aver passato autenticazioni, OTP (richiamare anche dal componente modale OTP)
const sendTicket = async () => {
  isLoading.value = true;

  const ticketParams = {
    title: form.title,
    tipologia_segnalazione: form.tipologia_segnalazione,
    group_id: props.configObject.group_id,
    service_catalog_item_id: form.service_catalog_item_id,
    service_catalog_sub_item_id: form.service_catalog_sub_item_id,
    priority_id: props.configObject.priority_id,
    privacy_policy_accepted: form.privacy_policy_accepted,
    utente_riconosciuto: props.userAuthenticated ? 1 : 0,
    autore_contatto: form.autore_contatto,
    parentela_autore_contatto: form.parentela_autore_contatto,
    cognome_paziente_interessato: form.cognome_paziente_interessato,
    nome_paziente_interessato: form.nome_paziente_interessato,
    data_nascita_paziente_interessato: form.data_nascita_paziente_interessato,
    customer: {
      firstname: form.firstName,
      lastname: form.lastName,
      birthdate: form.birthdate,
      codice_fiscale: form.codice_fiscale,
      email: form.email,
      phone: form.phone,
    },
    article: {
      body: form.description,
      attachments: attachmentsArrayConverted.value,
      content_type: 'text/html',
      from: form.email,
      type_id: props.configObject.type_id,
    },
  };

  try {
    const apiUrl = props.userAuthenticated
      ? import.meta.env.VITE_BASE_URL_API_MANAGER_AUTH
      : import.meta.env.VITE_BASE_URL_API_MANAGER;

    const response = await postFetch(`${apiUrl}/tickets`, ticketParams);

    if (props.userAuthenticated) {
      window.location.href = `${props.configObject?.path_ticket}?id=${response.id}`;
      
    } else {
      isLoading.value = false;
      emit('showCustomToast', {
        title: 'Successo',
        subtitle: '',
        type: 'success',
        text: 'Form inviato con successo!',
      });
    }
  } catch (error) {
    isLoading.value = false;
    emit('showCustomToast', {
      title: 'Errore',
      subtitle: error.message || '',
      type: 'danger',
      text: 'Errore nell\'invio del form.',
    });
  }
};

// funzione evocata con il submit del form (verranno effettuati controlli, gestione errori, autenticazioni, modale OTP...)
const handleSubmit = async () => {
  
  validateCF(form, errors);
  validateEmail(form, errors);
  validatePhone(form, errors);
  if (!validateForm()) {
    showTopError.value = true; // mostriamo gli errori in cima alla pagina presenti in "errors"
    emit('showCustomToast', {
      title: 'Errore',
      subtitle: '',
      type: 'danger',
      text: 'Form non valido, controlla i campi obbligatori!'
    });
    return;
  }

  scrollTopView(150); // ### DA RIVEDERE CON DANIEL
 

  /*
  ### TODO da qui creare l'OTP per l'utente anonimo non autenticato!
  - andiamo a cotrnollare s'è c'è bisogno di fare la validazione OTP dell'utente se non l'ha già fatta è ha un cookie che si ricorda di quello precedente!
  - cambio ref per mostrare la modale (NON SI POTRA CHIUDERE)
  - creazione interfaccia della modale OTP
  - dire all'utente che è stata invita alla sua email inserita nel form un codice temporaneo che scade entro X min
  - nel momento in cui viene aperta la modale mandare una POST al backend inviando la email e associando ad essa un codice generato dal bff
  - rifare una post quando il codice dell'utente viene spedito verso il bff, comparando il codice con le colonne della tabella del DB 
  */
  if (props.userAuthenticated) {
    sendTicket();
  } else {
    needOtp.value = await checkOTPNeed();
    if (needOtp) {
      modalsObject.OTP.email = form.email;
      showModal("OTP", true);
    } else {
      sendTicket();
    }
  }
};


/* WATCHERS */
watch(() => form.service_catalog_item_id, async (newVal) => {
  if (newVal) {
    await getServiceCatalogSubItemList(newVal);
  } else {
    subServiceCatalog.splice(0, subServiceCatalog.length);
  }
});

// ### WATCH ESEGUITO OGNI SUBMIT IN CUI SI AGGIORNA L'ARRAY.other[], con le stringhe dei campi da VALIDARE! (sono dinamici in 'other')
// ### ogni aggiornamento dei campi form segnati nell'array qui, si RESETTA + AGGIORNA l'array .other[] con updateFields() + valori default
watch(
  () => [form.tipologia_segnalazione, form.autore_contatto],
  async (newVal) => {
    if (newVal) {
      await resetErrors(errors); // resettiamo tutti gli errori quando i valori osservati cambiano
      await updateFields(); // aggiorniamo il form "other" con controlli sulle select
    }
  },
  { immediate: true }
);


/* CICLI VITA DEL COMPONENTE */
onMounted(async () => {
  await getServiceCatalogList();
  await getPrivacyPolicy();
});
</script>



<template>
  <div class="container">
    <!-- CONTENUTO PRIVACY POLICY PASSATO DA BO TAYLOR ,  MODALE PRIVACY -->
    <template v-if="modalsObject.privacy.show && modalsObject.privacy.privacyPolicy">
      <ModalComponent :modalObject="modalsObject.privacy" @showModal="showModal">
        <template #body>
          <div v-html="modalsObject.privacy.privacyPolicy"></div>
        </template>
      </ModalComponent>
    </template>
    <!-- MODALE OTP per utente non autenticato, passiamo come signals degli eventi per modificare ref dentro questo componente padre -->
    <OTPComponent v-if="modalsObject.OTP.show" :modalObject="modalsObject.OTP" @sendTicket="sendTicket"
      @showModal="showModal" @stopLoading="stopLoading" />

    <!-- LOADER -->
    <template v-if="isLoading">
      <div class="row py-2 justify-content-center full-width overlay">
        <div class="col-auto">
          <SpinnerComponent></SpinnerComponent>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="!props.userAuthenticated">
        <div class="row py-2 justify-content-between align-items-center mb-5">
          <div class="col-auto">
            <h4>Hai un'identità SPID o CIE?</h4> <a :href="`${pathNameWithoutLastPage}/${configObject.path_ticket}`"
              class="assistance" aria-label="Apri modulo per nuova richiesta">
              <strong>Accedi alla area personale</strong>
            </a>
          </div>
          <div class="col-auto">
            <button @click="goToHome" class="btn btn-primary" :aria-label="`Vai a alla home`">
              VAI ALLA HOME
            </button>
          </div>
        </div>
      </template>

      <!-- FORM di assistenza per inviare ticket -->
      <form @submit.prevent="handleSubmit()" novalidate>
        <div class="row py-2 justify-content-center">
          <div class="col-auto">
            <h3>NUOVA RICHIESTA</h3>
          </div>
        </div>
        <div class="form-ticket">
          <p class="text-disabled">Tutti i campi con il simbolo * sono obbligatori</p>
          <!-- componente in cui vengono visualizzati gli errori RISCONTRATI NELLA VALIDAZIONE DEL FORM "validateForm()"-->
          <ShowErrors v-if="showTopError" :errors="errors" />
          <!-- ### Inserire Combo Tipologia Segnalazione prima di sbloccare tutto il form "Informazioni personali" se si è nel parametro "other" -->
          <template v-if="props.formType === 'other'">
            <div class="my-4">
              <h4 class="title-form">Tipologia Segnalazione</h4>
              <div class="csi-ce--tickets">
                <div class="card d-block clickable-card mt-3">
                  <div class="card-body">
                    <div class="it-form-group my-3 p-2">
                      <label for="tipologiaSegnalazione" class="form-label">*Tipologia Segnalazione</label>
                      <select class="form-control" id="tipologiaSegnalazione" v-model="form.tipologia_segnalazione"
                        :class="{ 'is-invalid': errors.tipologia_segnalazione }"
                        @click="resetErrors(errors, 'tipologia_segnalazione')" required>
                        <!-- ### ANDRA CICLATO UN ARRAY ESTERNO CON LE OPZIONI STATICHE-->
                        <option selected value="" disabled>Seleziona una tipologia di segnalazione</option>
                        <option v-for="segnalazione in TIPOLOGIA_SEGNLAZIONE" :key="segnalazione.id"
                          :value="segnalazione.id">
                          {{ segnalazione.name }}
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        {{ errors.tipologia_segnalazione }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- SEZIONE INFORMAZIONI PERSONALI -->
          <template v-if="props.formType === 'other' && form.tipologia_segnalazione || props.formType === 'blank'">
            <div class="my-4">
              <h4 class="title-form">Informazioni Personali</h4>
              <div class="csi-ce--tickets ">
                <div class="card d-block clickable-card mt-3">
                  <div class="card-body">
                    <div class="it-form-group my-2 p-2">
                      <label for="firstName" class="form-label">*Nome</label>
                      <input type="text" class="form-control" id="firstName" v-model="form.firstName"
                        :class="{ 'is-invalid': errors.firstName }" @click="resetErrors(errors, 'firstName')"
                        :disabled="props.userAuthenticated && props.userAuthenticated['nome']" autocomplete="off"
                        required />
                      <div class="invalid-feedback">
                        {{ errors.firstName }}
                      </div>
                    </div>
                    <div class="it-form-group my-2 p-2">
                      <label for="lastName" class="form-label">*Cognome</label>
                      <input type="text" class="form-control" id="lastName" v-model="form.lastName"
                        :class="{ 'is-invalid': errors.lastName }" @click="resetErrors(errors, 'lastName')"
                        :disabled="props.userAuthenticated && props.userAuthenticated['cognome']" autocomplete="off"
                        required />
                      <div class="invalid-feedback">
                        {{ errors.lastName }}
                      </div>
                    </div>
                    <div class="it-form-group my-2 p-2">
                      <label for="birthdate" class="form-label">*Data di nascita</label>
                      <input type="date" class="form-control" id="birthdate" v-model="form.birthdate"
                        placeholder="gg/mm/aaaa" pattern="\d{2}/\d{2}/\d{4}" :class="{ 'is-invalid': errors.birthdate }"
                        @click="resetErrors(errors, 'birthdate')" autocomplete="off" required />
                      <div class="invalid-feedback">
                        {{ errors.birthdate }}
                      </div>
                    </div>
                    <div class="it-form-group my-2 p-2">
                      <label for="cfFiscale" class="form-label">*Codice fiscale</label>
                      <input type="email" class="form-control" id="cfFiscale" v-model="form.codice_fiscale"
                        :class="{ 'is-invalid': errors.codice_fiscale }" @click="resetErrors(errors, 'codice_fiscale')"
                        @blur="validateCF(form, errors)"
                        :disabled="props.userAuthenticated && props.userAuthenticated['codicefiscale']"
                        autocomplete="off" required />
                      <div class="invalid-feedback">
                        {{ errors.codice_fiscale }}
                      </div>
                    </div>
                    <div class="it-form-group my-2 p-2">
                      <label for="email" class="form-label">*Email</label>
                      <input type="email" class="form-control" id="email" v-model="form.email"
                        :class="{ 'is-invalid': errors.email }" @click="resetErrors(errors, 'email')"
                        @blur="validateEmail(form, errors)" autocomplete="off" required 
                        :disabled="props.userAuthenticated && props.userAuthenticated['email']"/>
                      <div class="invalid-feedback">
                        {{ errors.email }}
                      </div>
                    </div>
                    <div class="it-form-group my-2 p-2">
                      <label for="phone" class="form-label">*Telefono</label>
                      <input type="tel" class="form-control" id="phone" v-model="form.phone" placeholder="+39000000000"
                        maxlength="14" :class="{ 'is-invalid': errors.phone }" @click="resetErrors(errors, 'phone')"
                        @blur="validatePhone(form, errors)" autocomplete="off" required />
                      <!-- ### TODO rivedere: FORZAMENTO SHOW d-block -->
                      <div class="invalid-feedback">
                        {{ errors.phone }}
                      </div>
                    </div>
                    <!-- ### TODO AGGIUNGERE QUI I CAMPI RICHIESTI NELLE TASKS
                    Nel caso di reclami / segnalazioni / elogi aggiungere in questa sezione, dopo il telefono, i campi:
                    -Se il campo SELECT autore_contatto è diverso da «interessato» allora devono essere compilati i campi:
                    - Parentela_autore_contatto, STRING label «Parentela»
                    - Cognome_paziente_interessato, STRING label «Cognome paziente interessato» 
                    - Nome_paziente_interessato, STRING label Nome paziente
                    - Campo autore_contatto con label «Autore dell’elogio/reclamo/segnalazione»
                    - Data_nascita_paziente_interessato, DATE label data di nascita paziente-->
                    <template v-if="['Reclami', 'Segnalazioni', 'Elogi'].includes(form.tipologia_segnalazione)">
                      <!-- SEZIONE AUTORE CONTATTO (solo x 'Reclami', 'Segnalazioni', 'Elogi')-->
                      <div class="it-form-group my-3 p-2">
                        <label for="autoreContatto" class="form-label">*Autore contatto</label>
                        <select class="form-control" id="autoreContatto" v-model="form.autore_contatto"
                          :class="{ 'is-invalid': errors.autore_contatto }" required
                          @click="resetErrors(errors, 'autore_contatto')">
                          <option selected value="" disabled>Seleziona un autore contatto</option>
                          <option v-for="contatto in AUTORE_CONTATTO" :key="contatto.id" :value="contatto.id">
                            {{ contatto.name }}
                          </option>
                        </select>
                        <div class="invalid-feedback">
                          {{ errors.autore_contatto }}
                        </div>
                      </div>
                      <!-- ### VERIFICARE SE L'AUTORE DEL CONTATTO E !=interessato e non è vuoto, 
                      se è true allora VANNO INSERITI NUOVI CAMPI CITATI PRIMA qui sopra! -->
                      <template v-if="form.autore_contatto.length > 0 && form.autore_contatto !== 'Interessato'">
                        <!-- SEZIONE PARENTELA AUTORE -->
                        <div class="it-form-group my-2 p-2">
                          <label for="parentelaAutoreContatto" class="form-label">*Parentela</label>
                          <input type="text" class="form-control" id="parentelaAutoreContatto"
                            v-model="form.parentela_autore_contatto"
                            :class="{ 'is-invalid': errors.parentela_autore_contatto }"
                            @click="resetErrors(errors, 'parentela_autore_contatto')" autocomplete="off" required />
                          <div class="invalid-feedback">
                            {{ errors.parentela_autore_contatto }}
                          </div>
                        </div>
                        <!-- SEZIONE COGNOME PAZIENTE -->
                        <div class="it-form-group my-2 p-2">
                          <label for="cognomePazienteInteressato" class="form-label">*Cognome paziente
                            interessato</label>
                          <input type="text" class="form-control" id="cognomePazienteInteressato"
                            v-model="form.cognome_paziente_interessato"
                            :class="{ 'is-invalid': errors.cognome_paziente_interessato }"
                            @click="resetErrors(errors, 'cognome_paziente_interessato')" autocomplete="off" required />
                          <div class="invalid-feedback">
                            {{ errors.cognome_paziente_interessato }}
                          </div>
                        </div>
                        <!-- SEZIONE NOME PAZIENTE -->
                        <div class="it-form-group my-2 p-2">
                          <label for="nomePazienteInteressato" class="form-label">*Nome paziente</label>
                          <input type="text" class="form-control" id="nomePazienteInteressato"
                            v-model="form.nome_paziente_interessato"
                            :class="{ 'is-invalid': errors.nome_paziente_interessato }"
                            @click="resetErrors(errors, 'nome_paziente_interessato')" autocomplete="off" required />
                          <div class="invalid-feedback">
                            {{ errors.nome_paziente_interessato }}
                          </div>
                        </div>
                        <!-- SEZIONE DATA DI NASCITA PAZIENTE -->
                        <div class="it-form-group my-2 p-2">
                          <label for="dataNascitaPazienteInteressato" class="form-label">*Data di nascita
                            paziente</label>
                          <input type="date" class="form-control" id="dataNascitaPazienteInteressato"
                            v-model="form.data_nascita_paziente_interessato" placeholder="gg/mm/aaaa"
                            pattern="\d{2}/\d{2}/\d{4}"
                            :class="{ 'is-invalid': errors.data_nascita_paziente_interessato }"
                            @click="resetErrors(errors, 'data_nascita_paziente_interessato')" autocomplete="off"
                            required />
                          <div class="invalid-feedback">
                            {{ errors.data_nascita_paziente_interessato }}
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <!-- SEZIONE RICHIESTA -->
            <div class="my-4">
              <h4 class="title-form">Richiesta</h4>
              <div class="csi-ce--tickets ">
                <div class="card d-block clickable-card mt-3">
                  <div class="card-body">
                    <!-- TITOLO -->
                    <div class="it-form-group my-2 p-2">
                      <label for="title" class="form-label">*Titolo</label>
                      <input type="text" class="form-control" id="title" v-model="form.title"
                        :class="{ 'is-invalid': errors.title }" autocomplete="off" @click="resetErrors(errors, 'title')"
                        required />
                      <div class="invalid-feedback">
                        {{ errors.title }}
                      </div>
                    </div>
                    <!-- DESCRIZIONE -->
                    <div class="it-form-group my-3 p-2">
                      <label for="description" class="form-label">*Descrizione</label>
                      <textarea class="form-control" id="description" rows="3" v-model="form.description"
                        :class="{ 'is-invalid': errors.description }" autocomplete="off" required
                        @click="resetErrors(errors, 'description')"></textarea>
                      <div class="invalid-feedback">
                        {{ errors.description }}
                      </div>
                    </div>
                    <!-- ARGOMENTO -->
                    <!-- ### Richiesta Nel caso di** (?form=other) ** reclami / segnalazioni / elogi togliere il campo argomento 
                    e sotto argomento -->
                    <template v-if="!['Reclami', 'Segnalazioni', 'Elogi'].includes(form.tipologia_segnalazione)">
                      <div class="it-form-group my-3 p-2">
                        <label for="argomento" class="form-label">*Argomento</label>
                        <select class="form-control" id="argomento" v-model="form.service_catalog_item_id"
                          :class="{ 'is-invalid': errors.service_catalog_item_id }" required
                          @click="resetErrors(errors, 'service_catalog_item_id')">
                          <option selected value="" disabled>Seleziona un argomento</option>
                          <option v-for="item in serviceCatalog" :key="item.id" :value="item.id">
                            {{ item.name }}
                          </option>
                        </select>
                        <div class="invalid-feedback">
                          {{ errors.service_catalog_item_id }}
                        </div>
                      </div>
                      <!-- SOTTO ARGOMENTO -->
                      <div class="it-form-group  my-3 p-2" v-if="subServiceCatalog.length > 0">
                        <label for="subArgomento" class="form-label">*Sotto argomento</label>
                        <select class="form-control" id="subArgomento" v-model="form.service_catalog_sub_item_id"
                          :class="{ 'is-invalid': errors.service_catalog_sub_item_id }" required
                          @click="resetErrors(errors, 'service_catalog_sub_item_id')">
                          <option selected value="" disabled>Seleziona un sotto argomento</option>
                          <option v-for="item in subServiceCatalog" :key="item.id" :value="item.id">
                            {{ item.name }}
                          </option>
                        </select>
                        <div class="invalid-feedback">
                          {{ errors.service_catalog_sub_item_id }}
                        </div>
                      </div>
                    </template>
                    <template v-if="spinnerSubItem">
                      <div class="row py-2 justify-content-center full-width overlay">
                        <div class="col-auto">
                          <div class="progress-spinner progress-spinner-active">
                            <span class="visually-hidden">Caricamento...</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <!-- ALLEGATI -->
            <div class="my-4">
              <h4 class="title-form">Allegati</h4>
              <div class="csi-ce--tickets ">
                <div class="card d-block clickable-card mt-3">
                  <div class="card-body">
                    <div lass="it-form-group my-2 p-2">
                      <FileUploaderComponent ref="attachmentsRef" @handleFileUpload="handleFileUpload"
                        @handleRemoveFile="handleRemoveFile" @handleRemoveAllFile="handleRemoveAllFile"
                        :maxFileSize=props.configObject />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- PRIVACY BOX E MODALE -->
            <div class="csi-ce--tickets ">
              <div class="card d-block clickable-card mt-3">
                <div class="card-body">
                  <div class="it-form-group my-2 p-2">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="privacy"
                        v-model="form.privacy_policy_accepted" :class="{ 'is-invalid': errors.privacy_policy_accepted }"
                        required @click="resetErrors(errors, 'privacy_policy_accepted')" />
                      <label class="form-check-label" for="privacy">*Privacy</label>
                      <div class="invalid-feedback">
                        {{ errors.privacy_policy_accepted }}
                      </div>
                    </div>
                    <!-- APERTURA MODALE PRIVACY -->
                    <a @click="showModal('privacy', true)" class="link-underline-primary my-2 p-2"
                      href="javascript:void(0)">
                      Leggi Privacy Policy
                    </a>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="reset" class="btn btn-outline-primary my-2 p-2" @click="resetForm"
                      style="margin-right: auto;">Reset form</button>
                    <button type="submit" class="btn btn-primary my-2 p-2" style="margin-left: auto;">Invia
                      richiesta</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </form>
    </template>
  </div>

</template>