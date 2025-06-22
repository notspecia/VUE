<script setup>
import { defineProps, defineEmits, ref, reactive, onMounted } from 'vue';
import { format } from 'date-fns'
import { postFetch } from '../../../services/api';
import SpinnerComponent from '../Common/SpinnerComponent.vue';


/* PROPS */
const props = defineProps({
    modalObject: {
        type: Object,
        required: true
    }
});


/* EMIT */
const emit = defineEmits(['showModal', 'sendTicket', 'stopLoading']);


/* DATA */
const isLoading = ref(false);
const OTPCodice = ref(null);
const OTPData = reactive({
    success: null,
    message: '',
    email: '',
    data_scadenza: ''
});
const errore_OTP = ref(null);


/* FUNZIONI */
// emitta un segnale per CHIUDERE la modale dell'OTP quando viene verificato tutto!, se viene chiusa dal ANNULLA, allora stoppiamo il loader del form
const closeModal = (cancelSend = false) => {
    if (cancelSend) {
        emit('stopLoading');
    }
    emit('showModal', 'OTP', false);
};

// funzione eseguita al montaggio della modale generando e mandando l'avvio alla verificazione con generazione di un OTP associata alla email
const generateOTP = async () => {
    try {
        isLoading.value = true;
        const response = await postFetch(import.meta.env.VITE_BASE_URL_API + '/otp/genera', { email: props.modalObject.email });
        // salvataggio dei dati nell'oggetto OTP reactive, info da mostrare nel template (+ formattazione data con libreria)
        if (response.success) {
            OTPData.success = response.success;
            OTPData.message = response.message;
            OTPData.email = response.email;
            OTPData.data_scadenza = format(new Date(response.data_scadenza.replace(' ', 'T')), 'dd/MM/yyyy H:mm');
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}

// funzione eseguita dopo che la modale è stata aperta + generato il codice OTP e salvato nel DB associato alla email del richiedente
const verifyOTP = async () => {
    errore_OTP.value = null; // resettiamo l'errore prima di ogni nuova verifica inviata
    isLoading.value = true;
    try {
        const response = await postFetch(import.meta.env.VITE_BASE_URL_API + '/otp/verifica', { email: props.modalObject.email, otp: OTPCodice.value });
        // se l'OTP inserito corrisponde all'email, chiudiamo modale facciamo fare la POST OTP ALL'UTENTE! tramite emit verso il padre
        if (response.success) {
            closeModal();
            emit('sendTicket');
        }
    } catch (error) {
        errore_OTP.value = "Errore durante la verifica del codice OTP.";
    } finally {
        isLoading.value = false;
    }
}

/* MONTAGGIO DEL COMPONENTE MODALE */
onMounted(async () => {
    await generateOTP(); // generazione del codice primo step
});
</script>


<template>
    <div class="modal-overlay" aria-hidden="false">
        <div class="modal-content" @click.stop tabindex="-1" role="dialog" aria-labelledby="modalTitle"
            aria-describedby="modalBody" aria-modal="true">
            <!-- HEADER -->
            <div class="modal-header mb-3">
                <h2 id="modalTitle h5" class="modal-title">Verifica OTP</h2>
            </div>
            <!-- BODY -->
            <form @submit.prevent="verifyOTP()" id="otpForm" novalidate>
                <div class="modal-body px-2">
                    <!-- LOADER -->
                    <div v-if="isLoading" class="d-flex justify-content-center py-3">
                        <div class="col-auto">
                            <SpinnerComponent />
                        </div>
                    </div>
                    <!-- MESSAGGIO E INPUT per OTP -->
                    <template v-else-if="OTPData.success">
                        <p class="mb-5 lh-base" style="font-size: 17px;">
                            <span>codice OTP generato e inviato con successo alla email: </span><br />
                            <strong>{{ modalObject.email }}</strong><br />
                            <span class="text-muted">
                                Scade il: {{ OTPData.data_scadenza }}
                            </span>
                        </p>
                        <div class="it-form-group mt-2">
                            <label for="OTP">*Inserisci codice OTP</label>
                            <input type="text" class="form-control" id="OTP" inputmode="numeric" pattern="[0-9]*"
                                maxlength="6" v-model="OTPCodice" :class="{ 'is-invalid': errore_OTP }"
                                aria-describedby="OTPHelp" autocomplete="one-time-code" required />
                            <div class="invalid-feedback">
                                {{ errore_OTP }}
                            </div>
                            <small id="OTPHelp" class="form-text text-muted">
                                Inserisci il codice ricevuto via email. Deve essere composto da 6 cifre.
                            </small>
                        </div>
                    </template>
                    <!-- TEMPLATE in caso la generazione e invio dell'OTP ALLA EMAIL non è andata con successo! -->
                    <template v-else-if="!OTPData.success">
                        <div class="alert alert-danger mt-3" role="alert">
                            <strong>Errore:</strong> non è stato possibile generare o inviare il codice OTP alla tua
                            email.<br>
                            <span class="d-block mt-2">Verifica che l'indirizzo email sia corretto oppure riprova più
                                tardi.</span>
                        </div>
                    </template>
                </div>
            </form>
            <!-- NEL FOOTER (bottone submit abilitato solo se l'OTP è stato generato + inserito un codice OTP dall'utente)
            bottone per annulare l'OTP e anche invio del ticket (lasciando i campi riempiti) -->
            <div class="modal-footer d-flex justify-content-between">
                <div class="d-flex justify-content-center">
                    <button class="btn btn-outline-secondary my-2 p-2" style="margin-left: auto;"
                        @click="closeModal(true)">
                        Annulla
                    </button>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary my-2 p-2" form="otpForm" style="margin-left: auto;"
                        :disabled="isLoading || !OTPData.success || !OTPCodice">
                        Verifica codice OTP
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>