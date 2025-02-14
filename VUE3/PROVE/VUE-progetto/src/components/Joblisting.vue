<script setup>

/*
importiamo: 
- defineProps(): per ricevere props 
- onMounted(): per eseguire la callback function al suo interno
- ref(): per rendere le variabili reattive modificandole tramite il .value + events listeners
- defineEmits(): per definire gli emitters
*/
import { defineProps, onMounted, ref, defineEmits } from 'vue';

// importiamo il componente Cardjob che renderizzera i dati dei jobs
import Cardjob from './Cardjob.vue';
// importiamo API per caricare i jobs all'interno del componente quando viene montato
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


// andiamo a fare una chiamata GET al json server (locale), per prendere tutti i jobs
let jobs = ref([]);

// al montaggio del componente, tramite la funzione onMounted(), andiamo a recuperare tramite GET tutti i jobs
onMounted(async () => {
    try {
        const res = await GetJobs();
        jobs.value = res;
    } catch (error) {
        console.log(error);
    }
});


// * ---------------------------------------------------


// definizione degli emitters[] passati come props che contengono l'evento nel genitore per la modifica di "limit"
const emit = defineEmits(["show", "hide"]);

// funzioni per passare gli emits + length dei jobs al genitore
const handleShowJobs = (length) => {
    emit("show", length)
}

const handleHideJobs = (length) => {
    emit("hide", length);
}

</script>




<template>
    <h2>I Nostri Lavori Disponibili!</h2>

    <!-- importiamo il contenuto messo in mezzo ai tag del VIEW "Jobs.vue", contenente l'immagine -->
    <slot />
    <!-- 
    andiamo a ciclare temporaneo (usiamo il v-for="" vecchio dato che ogni jobs ha già un suo id come proprietà)
    *passiamo come props al figlio Cardjob.vue, l'oggetto contenente i dati di quel jobs 
    *AGGIORNAMENTO: inizialmente mostriamo solo le 3 card jobs, mettiamo un bottone che permette di visualizzarle tutte al click del bottone
    *se il valore limit non è true (quindi non viene trovato), allora va a renderizzare tutti i jobs
    -->
    <div class="container">
        <Cardjob v-for="job of jobs.slice(0, limit || jobs.length)" :key="job.id" :job="job" />
    </div>

    <!-- in base al flag passato come prop "allShowed" se è:
    - false: andiamo a mostrare il bottone che permette di mostrare tutti i jobs passando la length della lista che li contiene
    - true: andiamo a mostrare il bottone che permette di nascodere i jobs tornando a mostrarne solo 3  -->
    <div v-if="!props.allShowed && props.limit" class="buttonStyle">
        <button @click="handleShowJobs(jobs.length)">Mostra tutti i jobs!</button>
    </div>
    <div v-else-if="props.allShowed && props.limit" class="buttonStyle">
        <button @click="handleHideJobs(jobs.length)">Mostra meno jobs</button>
    </div>
</template>




<style scoped>
h2 {
    text-align: center;
    font-size: 35px;
    font-family: var(--font-title);
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
    margin: 50px auto 40px;
}

.buttonStyle {
    display: flex;
    justify-content: center;
}

button {
    width: 15%;
    background-color: black;
    color: white;
    font-size: 18px;
    font-family: var(--font-subtitle);
    padding: 10px 0;
    border: none;
    border-radius: 10px;
    margin-bottom: 20px;
}
</style>