<script setup>
/*
VeeValidate	Gestisce la validazione dei form in Vue: stato, messaggi, submit, ecc.
Yup	È un validator di schema: definisce le regole di validazione in modo dichiarativo e riutilizzabile 
*/

import { reactive, ref, provide, watch } from 'vue';
import { goTopPage } from '@/services/utils';
// componente STEPPER per tenere traccia del punto in cui ci si trova + componente bottone per andare avanti di step e inviare all'ultimo step
import Stepper from '@/components/StepsComponents/StepperComponent.vue';
import StepControls from '@/components/StepsComponents/StepsControlComponent.vue';
// contenuto renderizzato con :is in base all'index dello step attuale
import Step1 from '@/components/StepsComponents/StepsContext/Step1Component.vue';
import Step2 from '@/components/StepsComponents/StepsContext/Step2Component.vue';
import Step3 from '@/components/StepsComponents/StepsContext/Step3Component.vue';
// componente per riepilogo della richiesta inviata dopo aver completato gli steps
import ConfirmationSummary from '@/components/StepsComponents/ConfirmationSummaryComponent.vue'
import ModalContacts from '@/components/Modals/ModalContactsComponent.vue';


/* DATA */
const currentStep = ref(0);
const stepsComponents = [Step1, Step2, Step3]; // da passare come componente da renderizzare tramite :is
const isStepValid = ref(false); // tenere traccia dinamicamente se lo step componente renderizzato, è valido, abilitando/disabilitando bottone per andare avanti
const isModalVisible = ref(false); // tenere traccia se la modale di conferma per invio del formData è aperta o chiusa
const isFormValid = ref(false); // tenere traccia se il form è valido o meno, abilitando/disabilitando il bottone per inviare il form finale, e mostrare il nuovo template


// contenitore di dati WIP DA MANDARE IN POST AL SERVER
const formData = reactive({
    // dati del richiedente verranno ricevuti prima di inziare lo stepper (dati fittizzi iniziali)
    richiedente: {
        cf: 'RSSXPJ78A27H366X',
        nome: 'Alberto',
        cognome: 'Galilei',
        residente_piemonte: false
    },
    destinatario: {
        cf: '',
        nome: '',
        cognome: '',
        data_nascita: '',
    },
    privacy_accetata: false,
    relazione_destinatario: '',
    convivenza: false,
    studio_richiedente: '',
    lavoro_richiedente: '',
    beneficiario_disabile: false,
    fascia_isee: '',
    accesso_inps: false,
    nessuna_incompatibilita: false,
});


/* DEFINIZIONE PROVIDE DA INNIETTARE NEI COMPONENTI FIGLI */
provide('formData', formData);


/* FUNZIONI */
// funzione per passare da uno step all'altro, emit dal figlio "StepControls"
const changeStep = (direction) => {
    if (direction) {
        currentStep.value++;
    } else {
        currentStep.value--;
    }
};

// funzione per gestire la visiblità della modale dell'ultimo step3 (show === true||false)
const handleVisibilityModal = (show) => {
    isModalVisible.value = show;
};

// qui andrà la logica per inviare il form finale
const handleSubmitForm = (send) => {
    isFormValid.value = send;
    // Porta l'utente in cima allo schermo
    goTopPage();
}


/* WATCH DI DEBUGG */
watch(() => formData,
    (newVal) => {
        console.log(newVal);
    },
    { deep: true }
);
</script>



<template>

    <!-- modale che appare cliccando il bottone INVIA quando si è l'ultimo step, aprendola e successivamente chiuderla inviando/premere bottone INDIETRO -->
    <ModalContacts @handleVisibilityModal="handleVisibilityModal" @handleSubmitForm="handleSubmitForm"
        v-model="isModalVisible" />

    <!-- template contenente gli STEP per compilare il formData{}, fino a quando il form sarà VALIDO! -->
    <template v-if="!isFormValid">
        <!-- STEPPER componente statico per mostrare nello step attuale in cui si trova (STATICO) -->
        <Stepper :currentStep="currentStep" />
        <!-- CONTENUTO dello step corrente con il suo contenuto -->
        <div class="narrow-content">
            <component :is="stepsComponents[currentStep]" v-model:isValid="isStepValid" @changeStep="changeStep" />
            <!-- CONTENITORE di pulsanti per muoversi tra gli step + inviare il form compilato -->
            <StepControls :currentStep="currentStep" :isStepValid="isStepValid" @changeStep="changeStep"
                @handleVisibilityModal="handleVisibilityModal" />
        </div>
    </template>

    <!-- pagina di conferma che il formData{} degli step è stato inviato con successo TRAMITE modale -->
    <ConfirmationSummary v-else />

</template>



<style scoped></style>