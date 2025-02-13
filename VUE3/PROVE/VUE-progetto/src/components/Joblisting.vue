<script setup>

import { defineProps, onMounted, ref } from 'vue';

// importiamo il componente Cardjob che renderizzera i dati dei jobs
import Cardjob from './Cardjob.vue';

// importiamo API per caricare i jobs all'interno del componente quando viene montato
import GetJobs from '@/api/GetJobs.api';

/* 
prendiamo la props passate dall'App.vue principale (limite di cardsjob da mostrare):
- limit:number = limito massimo di card da mostrare
- isShowed:boolean = booleano che se è false andrà a nascondere il bottone per mostrarare altre card / true per mostrare il bottone
*/
const props = defineProps({
    limit: {
        type: Number,
    },
    allShowed: {
        type: Boolean,
    },
    showJobs: {
        type: Function,
    },
    hideJobs: {
        type: Function,
    }
});


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
})

</script>




<template>
    <h2>I Nostri Lavori Disponibili!</h2>
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
        <button @click="showJobs(jobs.length)">Mostra tutti i jobs!</button>
    </div>
    <div v-else-if="props.allShowed && props.limit" class="buttonStyle">
        <button @click="hideJobs(jobs.length)">Mostra meno jobs</button>
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
    margin: 70px auto 40px;
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