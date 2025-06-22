<script setup>
import { ref, reactive, onMounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import Step3 from '@/components/StepsComponents/StepsContext/Step3Component.vue'


/* ROUTER DATA */
// prendiamo la rotta corrente in cui ci troviamo (rotta dettaglio della domanda che si vuole visualizzare)
const route = useRoute();
// prendiamo l'id della domanda dalla rotta
const id = route.params.id;


/* DATA */
// mokup contenitore per i dati della domanda iniziali
const formData = reactive({});
// controllo per il caricamento e l'errore delle chiamate API
const isLoading = ref(true);
const error = ref(null);


/* DEFINIZIONE PROVIDE DA INNIETTARE NEL COMPONENTE STEP3 PER DETTAGLIO DOMANDA */
provide('formData', formData);


/* ONMOUNTED */
onMounted(async () => {
    try {
        setTimeout(() => {
            // prova fetch API, usare Object.assign per mantenere la reattività dell'oggetto
            Object.assign(formData, {
                richiedente: {
                    cf: 'RSSXPJ78A27H366X',
                    nome: 'Alberto',
                    cognome: 'Galilei',
                },
                destinatario: { // <-- qui il nome corretto
                    cf: 'ABCDEF12G34H567I',
                    nome: 'Gabriele',
                    cognome: 'Speciale',
                    data_nascita: '23/07/2020',
                },
                relazione_destinatario: 'Affidatario',
                studio_richiedente: 'Laurea',
                lavoro_richiedente: 'Disoccupato',
                fascia_isee: '20000', // <-- qui il nome corretto
            });
            console.log(formData);
            isLoading.value = false;
        }, 2000); // simula un caricamento di 2 secondi 

    } catch {
        error.value = 'Errore nel recupero dati';
        isLoading.value = false;
    }
})
</script>



<template>
    <h1 class="mb-5">Dettaglio domanda</h1>

    <div class="narrow-content">
        <p v-if="isLoading">Caricamento in corso...</p>
        <!-- una volta finito il caricamento dei formData, li innettiamo nello Step3 + passiamo un flag per dire che è solo di lettura e non modificabile! -->
        <Step3 v-else :readonly="true" />
        <p v-if="error">{{ error }}</p>
    </div>
</template>



<style scoped></style>