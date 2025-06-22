<script setup>
import { useForm } from 'vee-validate';
import { alertModalContacts } from '@/services/constants';
import * as yup from 'yup';
import BiModal from '@csi/design-system-bootstrap-italia/components/general/BiModal.vue';
import AlertCard from '@/components/Shared/AlertCardComponent.vue';
import BiInputText from '@csi/design-system-bootstrap-italia/components/forms/BiInputText.vue';

/* EMITS */
const emit = defineEmits(['handleVisibilityModal', 'handleSubmitForm']);


/* VEEVALIDATE SCHEMAS */
// definisci lo schema di validazione da effettuare yup
const schema = yup.object({
    email: yup.string().email().required('Campo obbligatorio'),
    telefono: yup.string().required('Campo obbligatorio'),
});

// crea il form con lo schema con veevalidate, specifichiamo l'oggetto da validare con yup in attesa che sia valido + specifichiamo valori iniziali da settare o da prendere dal formData
const { values, setFieldValue, meta } = useForm({
    validationSchema: schema, // tiene traccia di tutti i valori richiesti e che matchano con validazioni!
    initialValues: {
        email: '',
        telefono: '',
    }
});


/* FUNZIONI */
// aggiorna tramite veevalidate passando il valore e il campo all'@onChange del componente input
const handleChange = (field, value) => {
    setFieldValue(field, value);
};

// event emitter per gestire la visibilità del modal 
const handleModalVisibility = (show) => {
    emit('handleVisibilityModal', show);
};

const handleSubmit = () => {
    emit('handleVisibilityModal', false);
    emit('handleSubmitForm', true);
};

</script>



<template>
    <BiModal id="modalContacts" size="lg" fade centered>
        <!-- HEADER -->
        <template #header="{ idTitle }">
            <h4 class="modal-title" :id="idTitle">Inserisci i tuoi contatti</h4>
        </template>

        <!-- BODY -->
        <template #body>
            <AlertCard :alert="alertModalContacts" />
            <BiInputText type="text" id="email-contatto" label="Email" :value="values.email"
                placeholder="Inserisci email" @onInput="val => handleChange('email', val)" />
            <BiInputText type="text" id="telefono-contatto" label="Telefono" :value="values.telefono"
                placeholder="Inserisci telefono" @onInput="val => handleChange('telefono', val)" />
        </template>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-outline-primary" @click="handleModalVisibility(false)">Annulla</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="!meta.valid">Conferma e
                invia</button>
        </template>
    </BiModal>
</template>



<style scoped></style>