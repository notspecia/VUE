<script setup>
import { defineProps, inject, onMounted } from 'vue';
import { alertStepThree } from '@/services/constants';
import Data from '../DataComponent.vue';
import Declaration from '../DeclarationComponent.vue';
import AlertCardComponent from '@/components/Shared/AlertCardComponent.vue';


/* PROPS
da probabilmetne sostituire e usare una rotta dinamica passando e predendo dall'url l'id del dettaglio della domanda */
const props = defineProps({
    readonly: {
        type: Boolean,
        default: false,
        required: false,
    }
});


/* INJECT (i dati arrivano sia nel momento di compilazioni dello step + dalla rotta "QuestionDetails") */
const formData = inject('formData');
console.log(formData); // per debug, da rimuovere in produzione


/* EMITS */
const emit = defineEmits(['update:isValid', 'changeStep']); // usati solo in fase di compilazione del form con stepper


/* FUNZIONI emits verso StepsView */
const handleStepChange = (direction) => {
    emit('changeStep', direction);
};


/* ONMOUNTED */
onMounted(() => {
    // se è modalità compilazione, emettiamo che il form è valido
    if (!props.readonly) {
        emit('update:isValid', true);
    }
});
</script>



<template>
    <!-- allert card sopra tutto lo step component -->
    <AlertCardComponent v-if="!readonly" :alert="alertStepThree" class="mt-5" />

    <!-- card conetnente tutti i dati del formData dallo steps/dettaglio domanda dalla home -->
    <div class="px-5 py-5 bg-gray">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Dati del richiedente</h2>
            <span v-if="!readonly" class="modify" @click="handleStepChange(false)">Modifica</span>
        </div>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">{{ formData.richiedente.nome }} {{ formData.richiedente.cognome }}</h3>
                    <!-- dati del destinatario accordare la GET API -->
                    <div class="card-text pt-2">
                        <hr>
                        <Data title="Codice fiscale" :value="formData.richiedente.cf" />
                        <Data title="Titolo di studio" :value="formData.studio_richiedente" />
                        <Data title="Occupazione" :value="formData.lavoro_richiedente" />
                        <Declaration dichiarazione="Dichiaro di essere residente in Piemonte" />
                        <Declaration dichiarazione="Dichiaro di convivere con il minore" />
                        <Data title="Rapporto del dichiarante con il minore" :value="formData.relazione_destinatario" />
                        <!-- se viene scelto affidatario AGGIUNGERE CAMPI PER ALLEGARE PDF -->
                        <template v-if="formData.relazione_destinatario === 'Affidatario'">
                            <p>Documento affidatario</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Dati del minore</h2>
            <span v-if="!readonly" class="modify" @click="handleStepChange(false)">Modifica</span>
        </div>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="card-text pt-2">
                        <HR>
                        </HR>
                        <!-- dati del minore, accordare dove storare i dati presi dal CF inserito -->
                        <Data title="Codice Fiscale" :value="formData.destinatario.cf" />
                        <Data title="Nome" :value="formData.destinatario.nome" />
                        <Data title="Cognome" :value="formData.destinatario.cognome" />
                        <Data title="Dati di nascita" :value="formData.destinatario.data_nascita" />
                        <Declaration dichiarazione="Dichiaro che il minore è portatore di disabilità" />
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>ISEE</h2>
            <span v-if="!readonly" class="modify" @click="handleStepChange(false)">Modifica</span>
        </div>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="card-text">
                        <hr>
                        <Data title="Valore ISEE" :value="formData.fascia_isee" />
                        <Declaration dichiarazione="Autorizzo interrogazione da parte di INPS" />
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Compatibilità</h2>
            <span v-if="!readonly" class="modify" @click="handleStepChange(false)">Modifica</span>
        </div>
        <div class="card-wrapper mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="card-text">
                        <hr>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto minima voluptates non,
                            unde
                            iure
                            quo officiis, sunt aspernatur quibusdam, officia tenetur! Nulla vel, facilis reprehenderit
                            in
                            sunt
                            pariatur autem!
                        </p>
                        <Declaration
                            dichiarazione="Dichiaro di non fruire di contributi di altre PA incompatibili con la misura del bando" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<style scoped>
h3 {
    font-size: 25px;
}

.modify {
    color: #003799;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
}
</style>
