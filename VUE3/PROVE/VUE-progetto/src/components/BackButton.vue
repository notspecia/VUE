<script setup>
import { RouterLink } from 'vue-router';
</script>




<template>
    <div class="button-return-jobs">
        <RouterLink to="/jobs" class="return-job">
            <i class="pi pi-arrow-circle-left" style=" color: rgba(235, 235, 235, .7); font-size: 1.3rem;"></i>
            Torna ai jobs
        </RouterLink>
    </div>
</template>




<style scoped>
/* bottone che renderizza di nuovo alla pagina del jobs */
div.button-return-jobs {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    cursor: pointer;
    margin: 150px 0 90px;
}

.return-job {
    color: rgba(255, 255, 255, 0.7);
    font-size: 22px;
    font-family: var(--font-subtitle);
    text-decoration: none;
    transition: transform 0.4s ease-in-out;

    &:hover {
        transform: scale(1.03);
    }
}
</style>