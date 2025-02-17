<script setup>
// andiamo ad importare la funzione useRoute(), che permette di accedere ai parametri dell'URL (ci serve per prendere l'id del job selezionato)
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// importazione dell'API script, per caricare il singolo job della view (passando l'ID grazie alla route)
import GetJob from '@/api/GetJob.api';
import ActionsJob from '@/components/ActionsJob.vue';
import BackButton from '@/components/BackButton.vue';


// assegnamo la route ad una variabile, che contiene i parametri  +  assegnamo ad una variabile lo useRouter() per renderizzare in pagine
const route = useRoute();
const router = useRouter();
// assegnamo ad una variabile l'id della rotta (ci servirà per la GET del job selezionato)
const jobID = route.params.id;


// variabile che conterrà l'oggetto del job, caricato tramite GET dopo monraggio del componente
const stateJob = reactive({
    job: {},
    isLoading: true
});

// andiamo a creare il contenitore reattivo del job selezionato preso poi dalla GET
onMounted(async () => {
    try {
        const res = await GetJob(jobID);
        stateJob.job = res;
    } catch (error) {
        console.log(error.message);
        router.push("/not-found"); // renderizziamo alla pagina 404 se la fetch GET del job fallisce tramite il router()
    } finally {
        stateJob.isLoading = false;
    }
});

</script>




<template>

    <!-- attendiamo che job e job.company (oggetto nestato) siano caricati correttamente! altrimenti mostriamo un loader! -->
    <div v-if="stateJob.job && stateJob.job.company">

        <!-- pulsante/collegamento component, che permette di ritornare ai jobs -->
        <BackButton />

        <!-- CONTENITORE DEL CARD JOB DETAIL (descrizioni + menu amministratore destra per modificare job!) -->
        <div class="job-container">

            <!-- descrizione della card con tutte le proprietà del JOB caricata tramite ID della route con fetch() -->
            <div class="job-detail">
                <h3 class="job-title">{{ stateJob.job.title }}</h3>
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

            <!-- sezione laterale per modificare il JOB tramite azioni con RouterLink renderizzando ad un altra view il JOB -->
            <ActionsJob :job="stateJob.job" />

        </div>

    </div>



    <!-- inserito un loader nel caso in cui l'oggetto job non sia stato ancora scaricato correttamente -->
    <div v-else class="spinner">
        <i class="pi pi-spin pi-spinner" style="font-size: 4rem"></i>
    </div>
</template>




<style scoped>
/* contenitore con all'interno card con tutte le descrizioni del job + laterlamente una sezione di gestione amministrativa della card */
.job-container {
    display: flex;
    column-gap: 10px;
    max-width: 75%;
    box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto 100px;
}

.job-detail {
    width: 65%;
}

.job-detail h3.job-title {
    color: #333;
    text-align: center;
    font-size: 35px;
    font-weight: 600;
    font-family: var(--font-title);
    margin-bottom: 10px;
}

.job-type,
.job-location {
    font-size: 18px;
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
</style>