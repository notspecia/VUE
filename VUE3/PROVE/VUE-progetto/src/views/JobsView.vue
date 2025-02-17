<script setup>
import Joblisting from '@/components/Joblisting.vue';
import jobsImage from '@/assets/images/jobsView.jpg';
</script>




<template>
    <Joblisting>
        <!-- passiamo l'immagine sottoforma di <slot/> al componente "Joblisting.vue" -->
        <div class="jobImageContainer">
            <img :src="jobsImage" alt="job hero image">
        </div>
    </Joblisting>
</template>




<style scoped>
.jobImageContainer {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

img {
    display: inline-block;
    width: 40%;
    border-radius: 10px;
}
</style>
