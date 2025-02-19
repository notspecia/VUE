<script setup>
import { ref, defineProps, computed } from 'vue';

// prendiamo come props, il job passato dal genitore "Joblisting.vue"
const props = defineProps({
    job: {
        type: Object,
        required: true
    }
});


/*
* adesso andiamo a lavorare utilizzando computed(), è una funzione che:
- VIENE RUNNATO quando un particolare valore viene cambiato
- simile all'useEffect() di react
- esempio cliccando un bottone nelaìla card permette di leggere + info sulla descrizione del job
*/

/*
settiamo un flag che cambia quando viene cliccato il bottone per "read more", è reattivo,
e al cambiamento di esso viene eseguito il computed(), restituendo la descrizione piena 
*/
const showFullDescription = ref(false);

// EVENTO che modifica lo stato di rettività del flag "showFullDescription" a true e false, eseguendo il computed()
const handleReading = () => {
    showFullDescription.value = !showFullDescription.value;
}


// ***riceverà la desceizione aggiornata ogni volta che "showFullDescription" si aggiornerà!***
const reactiveDescription = computed(() => {

    // inizialmente diamo come valore PIENO la descrizione del job passato come prop dal genitore
    let description = props.job.description;

    // verifichiamo il flag, se è false (READ MORE deve essere ancora cliccato), TRONCHIAMO la frase + la frase deve essere almeno > di 90 caratteri!
    if (!showFullDescription.value && description.length > 90) {
        description = `${description.slice(0, 90)}...`;
    }

    return description; // returniamo la descrizione elaborata al cambiamento del flag -> "showFullDescription"
});

</script>




<template>
    <div class="card">
        <h3>{{ props.job.title }}</h3>
        <p class="job-location">
            Location: {{ props.job.location }}
            <i class="pi pi-map-marker" style="color: green; font-size: 1rem;"></i>
        </p>
        <p class="job-type">Type: {{ props.job.type }}</p>
        <p class="job-salary">Salary: {{ props.job.salary }} </p>
        <p class="job-description">Description: {{ reactiveDescription }} </p>
        <!-- 
        aggiungiamo un metodo a un RouterLink, che al click va a:
        - modificare lo stato di"showFullDescription"
        - al momento della modifica va a rieseguire il computed che contiene esso, cambiando la descrizione in maniera dinamica
        *in tal caso è true, andiamo a mostrare un bottone che permette di leggere meno e TRONCARE DI NUOVO LA DESCRIZIONE cambiando il flag
        -->
        <div class="button-read-toggle" v-if="props.job.description.length > 90">
            <button v-if="!showFullDescription" class="read-more" @click="handleReading()">Read all
                description...</button>
            <button v-else class="read-less" @click="handleReading()">Read Less</button>
        </div>

        <!-- 
        settiamo anche il Router link per il bottone che porta a schermo completamente LE INFORMAZIONI DI QUEL JOB
        un una view a parte singola nella rotta "/jobs/job/JOB.ID" all'interno della view "Jobsdetails.vue"
        -->
        <div class="button-read-more">
            <RouterLink :to="'/jobs/' + props.job.id" class="read-more-job">Leggi di più</RouterLink>
            <i class="pi pi-eye" style="color: white;font-size: 1.2rem;"></i>
        </div>
    </div>
</template>




<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 500px;
    background-color: rgb(232, 249, 242);
    box-shadow: 3px 7px 8px 2px rgba(255, 255, 255, 0.2);
    font-family: var(--font-text);
    padding: 40px 20px;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
}

.card:hover {
    transform: scale(1.02);
}

h3 {
    text-align: center;
    font-size: 20px;
    font-family: var(--font-subtitle);
    font-weight: bold;
    margin-bottom: 30px;

}

.job-location,
.job-type,
.job-salary {
    font-size: 1rem;
    color: #555;
}

.job-description {
    font-size: 1rem;
    line-height: 1.3;
}

.company-info {
    font-size: 0.9rem;
    color: #555;
}

.company-name {
    font-weight: bold;
}

/* bottone toggle per mostrare di + della descrizione o di - */
button.read-more,
button.read-less {
    font-size: 18px;
    text-decoration: underline;
    border: none;
    padding: 0;
}

button.read-more {
    color: green;
}

button.read-less {
    color: gray;
}

/* bottone che porta a un nuovo componente che permette di leggere singolarmente la card di quel job */
div.button-read-more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    background-color: grey;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgb(0, 104, 0);
    }

    ;
}

.read-more-job {
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    margin-right: 10px;
}
</style>