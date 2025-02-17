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
    width: 370px;
    overflow: hidden;
    background-color: green;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    transition: transform 0.3s;
}

.card:hover {
    transform: scale(1.04);
}

.card img {
    width: 100%;
    height: 220px;
}

.cardContent {
    padding: 15px;
    background: #fff;
}

.cardContent h3 {
    font-size: 17px;
    font-weight: 600;
    font-family: var(--font-subtitle);
    margin-bottom: 15px;
}

.cardContent p {
    font-size: 14px;
    font-family: var(--font-text);
    line-height: 1.4;
}

.cardContent h3,
.cardContent p {
    text-align: center;
}
</style>