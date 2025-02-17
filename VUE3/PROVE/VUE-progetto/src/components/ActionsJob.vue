<script setup>

import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

// importiamo come props a questo componente il job presente nella VIEW in cui ci trova
const props = defineProps({
    job: {
        type: Object,
        required: true
    }
});

</script>




<template>
    <div class="job-actions">
        <h3>Gestisci il Job</h3>
        <!-- 
        settiamo anche il Router link per i bottoni/container che porta a schermo a una sezione che esegue azioni sul JOB 
        - modificare il JOB
        - cancellare definitivamente il JOB 
        -->
        <div class="job-edit">
            <RouterLink :to="'/jobs/edit/' + props.job.id" class="job-content">Edit Job</RouterLink>
            <i class="pi pi-pen-to-square" style="font-size: 1.1rem; color: white;"></i>
        </div>
        <div class="job-delete">
            <RouterLink :to="'/jobs/delete/' + props.job.id" class="job-content">Delete Job</RouterLink>
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
    width: 35%;
    padding: 30px 0;
}

.job-actions h3 {
    text-align: center;
    font-size: 25px;
    font-family: var(--font-subtitle);
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