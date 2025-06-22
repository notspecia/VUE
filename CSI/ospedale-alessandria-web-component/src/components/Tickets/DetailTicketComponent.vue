<script setup>
import { defineProps, ref } from 'vue';
import { convertAttachmentZammad } from '../../../services/utils'
import TicketTimelineComponent from '../Tickets/TicketTimelineComponent.vue';
import FileUploaderComponent from '../Common/FileUploaderComponent.vue';

/* PROPS */
const props = defineProps({
  ticket: Object,
  ticketArticles: Array,
  id: String
});

/* EMIT */
const emit = defineEmits(['updateTicket', 'closeTicket', 'showCustomToast']);

/* DATA */
const warningModal = ref(false);
const attachmentsArrayConverted = ref([]);
const detailUpdateForm = ref({
  body: '',
  attachments: attachmentsArrayConverted.value
});

/* FUNZIONI */
const updateTicket = (ticket, detailUpdateForm) => {
  emit('updateTicket', ticket, detailUpdateForm);
};
const closeTicket = (ticket) => {
  emit('closeTicket', ticket);
};
const handleFileUpload = async (event) => {
  try {
    const file = event;
    const obj = await convertAttachmentZammad(file); // Use await here
    attachmentsArrayConverted.value.push(obj);
  } catch (error) {
    console.error('Error handling file upload:', error);
  }
};
const handleRemoveFile = (index) => {
  attachmentsArrayConverted.value.splice(index, 1);
};
</script>

<template>
  <div class="row justify-content-between gap-2 py-2 form-ticket">
    <!-- SOTTO COMPONENTE TIMELINE INSERITO IN UN ELEMENTO SCROLLABILE -->
    <div class="my-4">
      <h4 class="title-form text-center text-md-start">Storico richiesta</h4>
      <div class="it-form-group my-3 p-2" role="region" aria-label="Storico della richiesta">
        <div class="csi-ce--tickets">
          <div class="card d-block clickable-card mt-3">
            <div class="card-body">
              <TicketTimelineComponent :ticketArticles="props.ticketArticles" :id="props.id" :ticket="props.ticket"
                aria-label="Timeline dei ticket">
              </TicketTimelineComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- AREA MODIFICA E CHIUSURA RICHIESTA -->
    <template v-if="props.ticket && props.ticket.state_id !== 8 && props.ticket.state_id !== 4">
      <div class="my-4">
        <h4 class="title-form text-center text-md-start">Aggiungi nota e allegati</h4>
        <div class="csi-ce--tickets">
          <div class="card d-block clickable-card mt-3">
            <div class="card-body">
              <!-- AREA NOTE -->
              <div class="it-form-group my-2 p-2">
                <label for="nota" class="form-label">Nota*</label>
                <textarea class="form-control my-3" id="nota" rows="3" v-model="detailUpdateForm.body"
                  aria-required="true" autocomplete="off"
                  placeholder="Una volta scritta la nota sarà possibile inserire anche degli allegati, senza nota non sarà possibile allegare file">
                </textarea>
              </div>
              <!-- AREA ALLEGATI -->
              <template v-if="detailUpdateForm.body.length > 0">
                <div class="it-form-group my-2 p-2">
                  <label for="file-upload" class="form-label">Allega file</label>
                  <!-- COMPONENTE ALLEGATI -->
                  <FileUploaderComponent id="file-upload" @handleFileUpload="handleFileUpload"
                    @handleRemoveFile="handleRemoveFile" aria-label="Carica o rimuovi file">
                  </FileUploaderComponent>
                </div>
                <!-- SUBMIT NOTE E ALLEGATI -->
                <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2">
                  <button @click="updateTicket(props.ticket, detailUpdateForm)" class="btn btn-outline-primary mt-3"
                    aria-label="Aggiungi nota e allegati alla richiesta">
                    Invia note e allegati
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- SEZIONE CHIUSURA RICHIESTA -->
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center my-2">
          <button @click="warningModal = true" class="btn btn-primary mt-3" v-if="!warningModal"
            aria-label="Chiudi la richiesta">
            Chiudi richiesta
          </button>
        </div>
        <div class="csi-ce--tickets" v-if="warningModal">
          <div class="card d-block clickable-card mt-3">
            <div class="card-body">
              <div class="it-form-group my-2 p-2">
                <h4>Attenzione</h4>
                <p>Una volta chiusa la richiesta non potrà più essere modificata. Procedere comunque?</p>
                <button @click="warningModal = false" class="btn btn-outline-primary mt-3 me-2"
                  aria-label="Annulla la chiusura della richiesta">
                  Annulla
                </button>
                <button @click="closeTicket(props.ticket)" class="btn btn-primary mt-3"
                  aria-label="Conferma la chiusura della richiesta">
                  Conferma
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
