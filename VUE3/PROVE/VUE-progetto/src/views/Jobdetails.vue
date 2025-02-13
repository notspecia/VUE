<script setup>

// andiamo ad importare la funzione useRoute(), che permette di accedere ai parametri dell'URL (ci serve per prendere l'id del job selezionato)
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import GetJob from '@/api/GetJob.api';


// assegnamo la route ad una variabile
const route = useRoute();

// assegnamo ad una variabile l'id della rotta (ci servirà per la GET del job selezionato)
const jobID = route.params.id;

// variabile che conterrà l'oggetto del job, caricato tramite GET dopo monraggio del componente
const job = ref({});

// andiamo a creare il contenitore reattivo del job selezionato preso poi dalla GET
onMounted(async () => {
    try {
        const res = await GetJob(jobID);
        job.value = res;
        console.log(job);
    } catch (error) {
        console.log(error.message);
    }
});

</script>




<template>
    <!-- attendiamo che job e job.company (oggetto nestato) siano caricati correttamente! altrimenti mostriamo un loader! -->
    <div v-if="job && job.company" class="job-detail">
        <h3>{{ job.title }}</h3>
        <p class="job-type">{{ job.type }}</p>
        <p class="job-location">{{ job.location }}</p>

        <div class="job-image">
            <img :src="job.image" alt="image of the job">
        </div>

        <div class="job-description">
            <h3>Description</h3>
            <p>{{ job.description }}</p>
        </div>

        <div class="job-salary">
            <h3>Salary</h3>
            <p>{{ job.salary }}</p>
        </div>

        <div class="company-info">
            <h3>Company</h3>
            <p>{{ job.company.description }}</p>
            <p><strong>Email:</strong> {{ job.company.contactEmail }}</p>
            <p><strong>Phone:</strong> {{ job.company.contactPhone }}</p>
        </div>
    </div>

    <!-- todo possiamo mettere un loader nel frattempo che carica il json -->
    <div v-else>
        <p>caricamento...</p>
    </div>

    <!-- pulsante che permette di ritornare ai jobs -->
    <div class="button-return-jobs">
        <RouterLink to="/jobs" class="return-job">Leggi di più</RouterLink>
    </div>
</template>




<style scoped>
.job-detail {
    max-width: 50%;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    margin: 170px auto 0;
}

.job-detail>h3 {
    color: #333;
    text-align: center;
    font-size: 35px;
    font-weight: 600;
    font-family: var(--font-title);
    margin-bottom: 10px;
}

.job-type,
.job-location {
    font-size: 20px;
    color: #777;
    text-align: center;
    margin-bottom: 10px;
}

.job-description,
.job-salary,
.company-info {
    margin-top: 20px;
}

.job-image {
    display: flex;
    justify-content: center;
}

.job-image img {
    width: 40%;
    height: 250px;
    border-radius: 10px;

}

h3 {
    font-size: 24px;
    font-family: var(--font-subtitle);
    color: green;
    margin: 30px 0 10px;
}

.job-description p,
.job-salary p,
.company-info p {
    font-size: 18px;
    line-height: 1.6;
    color: #555;
}

.company-info p strong {
    font-weight: bold;
}

/* bottone che renderizza di nuovo alla pagina del jobs */
div.button-return-jobs {
    width: 30%;
    background-color: green;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    margin: 10px auto;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgb(0, 88, 0);
    }
}

.return-job {
    color: white;
    font-size: 16px;
    font-family: var(--font-subtitle);
    text-decoration: none;
}
</style>