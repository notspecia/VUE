<script setup>
import { ref, defineProps, computed } from 'vue';


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

    // verifichiamo il flag, se è false (READ MORE deve essere ancora cliccato), TRONCHIAMO la frase
    if (!showFullDescription.value) {
        description = `${description.slice(0, 90)}...`;
    }

    return description; // returniamo la descrizione elaborata al cambiamento del flag -> "showFullDescription"
});




</script>




<template>
    <div class="card">
        <h3>{{ job.title }}</h3>
        <p class="job-location">Location: {{ job.location }}</p>
        <p class="job-type">Type: {{ job.type }}</p>
        <p class="job-salary">Salary: {{ job.salary }} </p>
        <p class="job-description">Description:{{ reactiveDescription }} </p>
        <!-- 
        aggiungiamo un metodo a un RouterLink, che al click va a:
        - modificare lo stato di"showFullDescription"
        - al momento della modifica va a rieseguire il computed che contiene esso, cambiando la descrizione in maniera dinamica
        *in tal caso è true, andiamo a mostrare un bottone che permette di leggere meno e TRONCARE DI NUOVO LA DESCRIZIONE cambiando il flag
        -->
        <div class="button-read-toggle">
            <button v-if="!showFullDescription" class="read-more" @click="handleReading()">Read more...</button>
            <button v-else class="read-less" @click="handleReading()">Read Less</button>
        </div>
        <div class="company-info">
            <p class="company-name">Company: {{ job.company.name }} </p>
            <p class="company-description">{{ job.company.description }}</p>
            <p class="contact-email">Contact Email: {{ job.company.contactEmail }} </p>
            <p class="contact-phone">Contact Phone: {{ job.company.contactPhone }} </p>
        </div>
        <!-- settiamo anche il Router link per il bottone che porta a schermo completamente LE INFORMAZIONI DI QUEL JOB, provare se:
        - creare una nuova viwe con una rotta predefinita o boh 
        -->
        <div class="button-read-more">
            <RouterLink :to="'/jobs/' + job.id" class="read-more-job">Leggi di più</RouterLink>
            <i class="pi pi-eye" style="font-size: 1.1rem; color: white;"></i>
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    background-color: green;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgb(0, 88, 0);
    }
}

.read-more-job {
    color: white;
    font-size: 16px;
    text-decoration: none;
    margin-right: 10px;
}
</style>