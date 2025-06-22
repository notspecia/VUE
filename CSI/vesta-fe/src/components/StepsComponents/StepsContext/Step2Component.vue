<script setup>
import { defineEmits, inject, onMounted, ref, watch, watchEffect } from 'vue';
import { useForm } from 'vee-validate';
import { setFields } from '@/services/utils';
import { iseeValuesProva, occupazioniProva, titoliStudioProva } from '@/services/constants';
import * as yup from 'yup';
import DataComponent from '../DataComponent.vue';
import BiToggle from '@csi/design-system-bootstrap-italia/components/forms/BiToggle.vue';
import BiRadio from '@csi/design-system-bootstrap-italia/components/forms/BiRadio.vue';
import BiInputText from '@csi/design-system-bootstrap-italia/components/forms/BiInputText.vue';
import BiSelect from '@csi/design-system-bootstrap-italia/components/forms/BiSelect.vue';
import BiUpload from '@csi/design-system-bootstrap-italia/components/forms/BiUpload.vue';


/* DATA */
const formData = inject('formData');
const isCFConfirmed = ref(false);


/* EMITS */
const emit = defineEmits(['update:isValid']);


/* VEEVALIDATE SCHEMAS */
// schema con i campi obbligatori e le regole di validazione di essi (values)
const schema = yup.object({
    richiedente: yup.object({
        cf: yup.string().required(),
        nome: yup.string().required(),
        cognome: yup.string().required(),
        residente_piemonte: yup.boolean().oneOf([true], 'Devi dichiarare di essere residente in Piemonte'),
    }),
    destinatario: yup.object({
        cf: yup.string()
            .required('Codice fiscale obbligatorio')
            .matches(/^[A-Za-z]{6}\d{2}[ABCDEHLMPRSTabcdehlmprst]\d{2}[A-Za-z]\d{3}[A-Za-z]$/, 'Codice fiscale non valido'),
        nome: yup.string().required(),
        cognome: yup.string().required(),
        data_nascita: yup.string().required(),
    }),
    relazione_destinatario: yup.string().required('Selezionare il rapporto con il minore'),
    convivenza: yup.boolean().oneOf([true], 'Devi dichiarare di convivere con il minore'),
    studio_richiedente: yup.string().required('Campo obbligatorio'),
    lavoro_richiedente: yup.string().required('Campo obbligatorio'),
    beneficiario_disabile: yup.boolean().oneOf([true], 'Devi dichiarare che il minore è portatore di disabilità'),
    fascia_isee: yup.number().required('Campo obbligatorio'),
    accesso_inps: yup.boolean().oneOf([true], 'Devi autorizzare l\'interrogazione INPS'),
    nessuna_incompatibilita: yup.boolean().oneOf([true], 'Devi accettare la compatibilità con altri contributi')
});

// crea il form con lo schema con veevalidate, specifichiamo l'oggetto da validare con yup in attesa che sia valido + specifichiamo valori iniziali da settare o da prendere dal formData
const { values, setFieldValue, errors, meta } = useForm({
    validationSchema: schema,
    initialValues: {
        richiedente: {
            cf: formData.richiedente.cf || '',
            nome: formData.richiedente.nome || '',
            cognome: formData.richiedente.cognome || '',
            residente_piemonte: formData.richiedente.residente_piemonte || false,
        },
        destinatario: {
            cf: formData.destinatario.cf || '',
            nome: formData.destinatario.nome || '',
            cognome: formData.destinatario.cognome || '',
            data_nascita: formData.destinatario.data_nascita || '',
        },
        relazione_destinatario: formData.relazione_destinatario || '',
        convivenza: formData.convivenza || false,
        studio_richiedente: formData.studio_richiedente || '',
        lavoro_richiedente: formData.lavoro_richiedente || '',
        beneficiario_disabile: formData.beneficiario_disabile || false,
        fascia_isee: formData.fascia_isee || '',
        accesso_inps: formData.accesso_inps || false,
        nessuna_incompatibilita: formData.nessuna_incompatibilita || false,
    }
});


/* FUNZIONI */
const handleChange = (field, value) => {
    setFieldValue(field, value);
};

// Fake assegnazione dati minore quando si conferma il CF
const generateDataFromCF = () => {
    handleChange('destinatario.nome', 'Mario');
    handleChange('destinatario.cognome', 'Rossi');
    handleChange('destinatario.data_nascita', '01/01/2020');
    isCFConfirmed.value = true;
};


/* WATCH */
// aggiorna i dati del formData con i valori correnti del form e vedere se il form è valido
watchEffect(() => {
    setFields(formData, values);
    emit('update:isValid', meta.value.valid);
});

// reset automatico dei dati se il CF viene modificato dopo la conferma + reset del flag di bottone conferma
watch(() => values.destinatario.cf,
    (newVal, oldVal) => {
        if (isCFConfirmed.value && newVal !== oldVal) {
            handleChange('destinatario.nome', '');
            handleChange('destinatario.cognome', '');
            handleChange('destinatario.data_nascita', '');
            isCFConfirmed.value = false;
        }
    }
);


/* ONMOUNT COMPONENTE */
onMounted(() => {
    // controlliamo che se il codice fiscale del destinatario è già stato inserito e i dati sono stati gia generati, allora confermiamo il CF
    if (formData.destinatario.nome) {
        isCFConfirmed.value = true;
    }
    emit('update:isValid', meta.value.valid);
});
</script>



<template>
    <p class="mt-5">Tutti i campi sono obbligatori</p>

    <div class="px-5 py-5 bg-gray">
        <h2 class="mb-4">Dati del richiedente</h2>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">{{ values.richiedente.nome }} {{ values.richiedente.cognome }}</h3>
                    <div class="card-text pt-2">
                        <hr>
                        <DataComponent title="Codice fiscale" :value="values.richiedente.cf" />
                        <div class="mt-5 responsive-select">
                            <!-- SELECT x selezionare il titolo di studio del richiedente -->
                            <BiSelect id="titolo-studio" :options="titoliStudioProva" label="Titolo di studio"
                                class="radio" :placeholder="'Seleziona un titolo di studio'"
                                :value="values.studio_richiedente"
                                @onSelect="val => handleChange('studio_richiedente', val)" />
                            <!-- SELECT x l'occupazione del richiedente -->
                            <BiSelect id="occupazione" :options="occupazioniProva" label="Occupazione" class="radio"
                                placeholder="Seleziona un'occupazione" :value="values.lavoro_richiedente"
                                @onSelect="val => handleChange('lavoro_richiedente', val)" />
                        </div>
                        <div class="mt-4 mb-4">
                            <BiToggle id="check-residente-piemonte" label="Dichiaro di essere residente in Piemonte"
                                :check="values.richiedente.residente_piemonte"
                                @onInput="val => handleChange('richiedente.residente_piemonte', val)" />
                        </div>
                        <div class="mb-4">
                            <BiToggle id="check-convivere-minore" label="Dichiaro di convivere con un minore"
                                :check="values.convivenza" @onInput="val => handleChange('convivenza', val)" />
                        </div>

                        <p>Rapporto del dichiarante con il minore</p>
                        <div class="d-flex flex-column gap-4 flex-md-row gap-md-5 my-4">
                            <BiRadio type="radio" id="genitore-option" label="Genitore" name="rapporto"
                                :value="'Genitore'" :check="values.relazione_destinatario"
                                @onChange="(val) => handleChange('relazione_destinatario', val)" />
                            <BiRadio type="radio" id="affidatario-option" label="Affidatario" name="rapporto"
                                :value="'Affidatario'" :check="values.relazione_destinatario"
                                @onChange="(val) => handleChange('relazione_destinatario', val)" />
                        </div>
                        <template v-if="values.relazione_destinatario === 'Affidatario'">
                            <p class="mt-4">Allega il certificato di affidamento del minore</p>
                            <BiUpload id="upload-documento" label="Carica documento" name="uploadFile" :multiple="false"
                                hint="Caricare un file in formato pdf, jpg, png" />
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <h2>Dati del minore</h2>
        <p class="my-4">
            Inserisci e conferma il codice fiscale del figlio di età minore di 6 anni a cui intendi collegare la domanda
        </p>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="card-text pt-2">
                        <div class="row">
                            <div class="col-lg-9 col-md-8">
                                <BiInputText type="text" id="cf-minore" label="*Codice fiscale"
                                    :value="values.destinatario.cf" placeholder="Inserisci il codice fiscale"
                                    @onInput="val => handleChange('destinatario.cf', val)" />
                            </div>
                            <div
                                class="col-lg-3 col-md-4 d-flex align-items-center justify-content-md-end justify-content-sm-start mb-sm-4">
                                <button v-if="!isCFConfirmed" class="btn btn-outline-primary text-primary"
                                    :disabled="errors['destinatario.cf'] || values.destinatario.cf.length < 16"
                                    @click="generateDataFromCF">
                                    Conferma
                                </button>
                            </div>
                        </div>
                        <template v-if="isCFConfirmed">
                            <DataComponent title="Nome" :value="values.destinatario.nome" />
                            <DataComponent title="Cognome" :value="values.destinatario.cognome" />
                            <DataComponent title="Dati di nascita" :value="values.destinatario.data_nascita" />
                        </template>
                        <BiToggle id="minore-disabile" label="Dichiaro che il minore è portatore di disabilità"
                            :check="values.beneficiario_disabile"
                            @onInput="val => handleChange('beneficiario_disabile', val)" />
                    </div>
                </div>
            </div>
        </div>

        <h2>ISEE</h2>
        <p class="my-4">
            Inserisci la tua fascia ISEE e autorizza INPS a verificarla
        </p>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="card-text">
                        <BiSelect id="fascia-ISEE" :options="iseeValuesProva" label="Fascia ISEE"
                            class="responsive-select" :placeholder="'Seleziona fascia ISEE'" :value="values.fascia_isee"
                            @onSelect="val => handleChange('fascia_isee', val)" />
                        <BiToggle id="check-interrogazione-inps" label="Autorizzo interrogazione da parte dell'INPS"
                            :check="values.accesso_inps" @onInput="val => handleChange('accesso_inps', val)" />
                    </div>
                </div>
            </div>
        </div>

        <h2 class="mb-4">Compatibilità</h2>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="card-text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita rerum blanditiis optio enim
                            harum porro. Ducimus, deleniti sint veritatis possimus voluptas voluptates dolorum, tenetur
                            ex,
                            quisquam optio magni aut accusamus!</p>
                        <BiToggle id="check-compatiblita"
                            label="Dichiaro di non fruire di contributi di altre PA incompatibili con la misura del bando"
                            :check="values.nessuna_incompatibilita"
                            @onInput="val => handleChange('nessuna_incompatibilita', val)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.form-check {
    margin: 0 !important;
}

.responsive-select {
    width: 50%;
}

@media (width <768px) {
    .responsive-select {
        width: 100%;
    }
}
</style>