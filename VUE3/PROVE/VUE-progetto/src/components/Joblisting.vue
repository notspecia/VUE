<script setup>

/*
importiamo: 
- defineProps(): per ricevere props 
- onMounted(): per eseguire la callback function al suo interno
- ref(): per rendere le variabili reattive modificandole tramite il .value + events listeners
- defineEmits(): per definire gli emitters
- useRouter(): per gestire errori di caricamento e renderizzamento in caso alla pagina 404 errore
*/
import { defineProps, onMounted, reactive, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

// importiamo il componente Cardjob che renderizzera i dati dei jobs
import CardJob from '@/components/CardJob.vue';
// importiamo API script, per caricare i jobs all'interno del componente quando viene montato
import GetJobs from '@/api/GetJobs.api';

// * ---------------------------------------------------


/* 
prendiamo la props passate dall'App.vue principale (limite di cardsjob da mostrare):
- limit:number = limito massimo di card da mostrare nella pagina HOME
- isShowed:boolean = booleano che se è false andrà a nascondere il bottone per mostrarare altre card / true per mostrare il bottone
*/
const props = defineProps({
    limit: {
        type: Number,
    },
    allShowed: {
        type: Boolean,
    }
});


// * ---------------------------------------------------


// andiamo a fare una chiamata GET al json server (locale), per prendere tutti i jobs, li settiamo in reactive()
let stateJobs = reactive({
    jobs: [],
    isLoading: true
});

// in caso il fetching andrebbe male, renderizziamo nel catch{} alla pagina 404 personalizzata
const router = useRouter();

// al montaggio del componente, tramite la funzione onMounted(), andiamo a recuperare tramite GET tutti i jobs
onMounted(async () => {
    try {
        const res = await GetJobs();
        stateJobs.jobs = res;
    } catch (error) {
        console.log(error);
        router.push("/not-found"); // in caso di errore fetching, renderizza alla schermata 404 personalizzata
    } finally {
        stateJobs.isLoading = false; // quando ha finito di caricare (sia TRY che CATCH), andiamo a rimuovere il loader
    }
});


// * ---------------------------------------------------


// definizione degli emitters[] passati come props che contengono l'evento nel genitore per la modifica di "limit"
const emit = defineEmits(["show", "hide"]);

// funzioni per passare gli emits + length dei jobs al genitore "HomeView.vue"
const handleShowJobs = (length) => {
    emit("show", length)
}

const handleHideJobs = (length) => {
    emit("hide", length);
}

</script>




<template>
    <!-- importiamo il contenuto messo in mezzo ai tag del VIEW "HomeView.vue", contenente l'immagine -->
    <slot />

    <!-- se capiamo di essere nella View "JobListing.vue", diamo del margin top al titolo -->
    <h2 :style="{ marginTop: !props.limit ? '180px' : '0' }">I Nostri Lavori Disponibili!</h2>

    <p>Una raccolta dei nostri progetti migliori, realizzati con passione e attenzione ai dettagli. Scopri le soluzioni
        innovative che abbiamo creato per aiutare aziende e professionisti a crescere nel digitale.</p>


    <!-- QUANDO AVRA CARICATO, MOSTRA TUTTE LE CARD PREVIEW DEI JOBS -->
    <div v-if="!stateJobs.isLoading">
        <!-- 
        andiamo a ciclare temporaneo (usiamo il v-for="" vecchio dato che ogni jobs ha già un suo id come proprietà)
        *passiamo come props al figlio Cardjob.vue, l'oggetto contenente i dati di quel jobs 
        *AGGIORNAMENTO: inizialmente mostriamo solo le 3 card jobs, mettiamo un bottone che permette di visualizzarle tutte al click del bottone
        *se il valore limit non è true (quindi non viene trovato), allora va a renderizzare tutti i jobs
        -->
        <div class="container">
            <CardJob v-for="job of stateJobs.jobs.slice(0, limit || stateJobs.jobs.length)" :key="job.id" :job="job" />
        </div>

        <!-- 
        in base al flag passato come prop "allShowed" se è:
        - false: andiamo a mostrare il bottone che permette di mostrare tutti i jobs passando la length della lista che li contiene
        - true: andiamo a mostrare il bottone che permette di nascodere i jobs tornando a mostrarne solo 3  
        -->
        <div v-if="!props.allShowed && props.limit" class="buttonStyle">
            <div @click="handleShowJobs(stateJobs.jobs.length)">
                Mostra <i class="pi pi-plus" style="font-size: 0.9rem;"></i> jobs
            </div>
        </div>
        <div v-else-if="props.allShowed && props.limit" class="buttonStyle">
            <div @click="handleHideJobs(stateJobs.jobs.length)">
                Mostra <i class="pi pi-minus" style="font-size: 0.9rem;"></i> jobs
            </div>
        </div>

    </div>


    <!-- inserito un loader nel caso in cui i jobs non siano stati ancora caricati completamente -->
    <div v-else class="spinner">
        <i class="pi pi-spin pi-spinner"></i>
    </div>
</template>




<style scoped>
h2 {
    color: white;
    text-align: center;
    font-size: 40px;
    font-family: var(--font-title);
    margin: 70px 0 20px;
}

p {
    width: 45%;
    color: rgba(235, 235, 235, .6);
    text-align: center;
    font-size: 16px;
    line-height: 1.4;
    font-family: var(--font-subtitle);
    margin: 0 auto;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin: 50px 0 40px;
}

.buttonStyle {
    display: flex;
    justify-content: center;
    color: green;
    font-size: 25px;
    font-family: var(--font-subtitle);
    text-decoration: underline;
    padding: 10px 0;
    margin: 30px;
    cursor: pointer;
}

/* style per l'icona di spinner */
div.spinner {
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>