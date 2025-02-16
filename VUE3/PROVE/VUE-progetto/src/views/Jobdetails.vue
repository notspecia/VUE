<script setup>

// andiamo ad importare la funzione useRoute(), che permette di accedere ai parametri dell'URL (ci serve per prendere l'id del job selezionato)
import { onMounted, reactive } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
// importazione dell'API script, per caricare il singolo job della view (passando l'ID grazie alla route)
import GetJob from '@/api/GetJob.api';


// variabile che conterrà l'oggetto del job, caricato tramite GET dopo monraggio del componente
const stateJob = reactive({
    job: {},
    isLoading: true
});


// assegnamo la route ad una variabile
const route = useRoute();
// assegnamo ad una variabile l'id della rotta (ci servirà per la GET del job selezionato)
const jobID = route.params.id;


// andiamo a creare il contenitore reattivo del job selezionato preso poi dalla GET
onMounted(() => {
    setTimeout(async () => {
        try {
            const res = await GetJob(jobID);
            stateJob.job = res;
            console.log(job);
        } catch (error) {
            console.log(error.message);
        } finally {
            stateJob.isLoading = false;
        }
    }, 1000)
});

</script>




<template>

    <!-- attendiamo che job e job.company (oggetto nestato) siano caricati correttamente! altrimenti mostriamo un loader! -->
    <div v-if="stateJob.job && stateJob.job.company">

        <div class="job-detail">
            <!-- desctizione della card con tutte le proprietà del JOB caricato -->
            <h3>{{ stateJob.job.title }}</h3>
            <p class="job-type">{{ stateJob.job.type }}</p>
            <p class="job-location">{{ stateJob.job.location }}</p>

            <div class="job-image">
                <img :src="stateJob.job.image" alt="image of the job">
            </div>

            <div class="job-description">
                <h3>Description</h3>
                <p>{{ stateJob.job.description }}</p>
            </div>

            <div class="job-salary">
                <h3>Salary</h3>
                <p>{{ stateJob.job.salary }}</p>
            </div>

            <div class="company-info">
                <h3>Company</h3>
                <p>{{ stateJob.job.company.description }}</p>
                <p><strong>Email:</strong> {{ stateJob.job.company.contactEmail }}</p>
                <p><strong>Phone:</strong> {{ stateJob.job.company.contactPhone }}</p>
            </div>
        </div>

        <!-- pulsante che permette di ritornare ai jobs -->
        <div class="button-return-jobs">
            <RouterLink to="/jobs" class="return-job">Torna ai jobs</RouterLink>
            <i class="pi pi-arrow-left" style="font-size: 1.1rem; color: white;"></i>
        </div>

    </div>


    <!-- inserito un loader nel caso in cui l'oggetto job non sia stato ancora scaricato correttamente -->
    <div v-else class="spinner">
        <i class="pi pi-spin pi-spinner" style="font-size: 4rem"></i>
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
    margin-top: 50px;
}

.job-image {
    display: flex;
    justify-content: center;
}

.job-image img {
    width: 50%;
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

/* style per l'icona di spinner */
div.spinner {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* bottone che renderizza di nuovo alla pagina del jobs */
div.button-return-jobs {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    background-color: green;
    text-align: center;
    padding: 20px 10px;
    border-radius: 10px;
    margin: 30px auto;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgb(0, 88, 0);
    }
}

.return-job {
    color: white;
    font-size: 18px;
    font-family: var(--font-subtitle);
    text-decoration: none;
    margin-right: 10px;
}
</style>