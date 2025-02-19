<script setup>
// importiamo e memorizziamo i dati props passati dal genitore container "Homecards.vue"
import { defineProps } from 'vue';

// prendiamo come props i dati della card presi dall'array di {} statico, con i card datas
defineProps({
    cardData: {
        type: Object,
        required: true
    }
});
</script>




<template>
    <div class="card">
        <img :src="cardData.image" alt="Immagine della card">
        <div class="cardContent">
            <h3>{{ cardData.title }}</h3>
            <p>{{ cardData.text }} </p>
        </div>
    </div>
</template>




<style scoped>
.card {
    width: 380px;
    overflow: hidden;
    background: linear-gradient(90deg, rgb(46, 255, 46), black);
    box-shadow: 0 7px 8px 2px rgba(255, 255, 255, 0.2);
    border-radius: 6px;
}

.card img {
    width: 100%;
    height: 240px;
}

.cardContent {
    padding: 15px;
    background: #ffffff;
}

.cardContent h3,
.cardContent p {
    text-align: center;
}

.cardContent h3 {
    font-size: 19px;
    font-weight: 600;
    font-family: var(--font-title);
    margin-bottom: 15px;
}

.cardContent p {
    font-size: 14px;
    font-family: var(--font-text);
    line-height: 1.3;
}
</style>