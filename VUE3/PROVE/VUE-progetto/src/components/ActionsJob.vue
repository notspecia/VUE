<script setup>

import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
// import script contenente la fetch API per il DELETE del job in questione, passandogli l'id
import DeleteJob from '@/api/DeleteJob.api';

// importiamo come props a questo componente il job presente nella VIEW in cui ci trova
const props = defineProps({
    job: {
        type: Object,
        required: true
    }
});

// assegniamo a delle variabile gli import delle funzioni per rendere dinamiche le azioni API
const router = useRouter();
const toast = useToast();

// ----------------------------------------

const handleDelete = async () => {
    try {
        // creiamo una modale window per confermare la DELETE del job
        const confirmDelete = window.confirm(`Sei sicuro di voler cancellare il JOB: ${props.job.title}?`);

        // se è true andiamo a fare la FETCH DELETE, successo mostra un toast positivo + renderizzamento alla View route di "jobs/"
        if (confirmDelete) {
            await DeleteJob(props.job.id);
            toast.success("Job cancellato con successo!");
            setTimeout(() => {
                router.push("/jobs");
            }, 2000);
        }

    } catch (error) {
        console.log(error.message);
    }
}
</script>




<template>
    <div class="job-actions">
        <h3>Gestisci il Job</h3>

        <div class="job-edit">
            <RouterLink :to="'/jobs/edit/' + props.job.id" class="job-content">Edit Job</RouterLink>
            <i class="pi pi-pen-to-square" style="font-size: 1.1rem; color: white;"></i>
        </div>
        <div class="job-delete" @click="handleDelete()">
            <p class="job-content">Delete Job</p>
            <i class="pi pi-trash" style="font-size: 1.1rem; color: white;"></i>
        </div>

    </div>
</template>




<style scoped>
.job-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    padding: 10px;
    background: linear-gradient(80deg, #ffffff 65%, rgb(1, 113, 1));


}

.job-actions h3 {
    text-align: center;
    font-size: 30px;
    font-family: var(--font-title);
    font-weight: 600;
    margin-bottom: 40px;
}

.job-actions .job-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background-color: green;
    border-radius: 10px;
    margin: 10px 0 30px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgb(0, 88, 0);
    }
}

.job-actions .job-delete {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background-color: red;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgb(153, 0, 0);
    }
}

.job-actions .job-edit .job-content,
.job-actions .job-delete .job-content {
    color: white;
    font-size: 18px;
    font-family: var(--font-text);
    text-decoration: none;
    padding: 15px;
}
</style>