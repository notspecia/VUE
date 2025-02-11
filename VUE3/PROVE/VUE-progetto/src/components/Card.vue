<script setup>
// importiamo e memorizziamo i dati props passati dal genitore container "Homecards.vue"
import { defineProps } from 'vue';

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
        <div class="card-content">
            <h3 class="card-title">{{ cardData.title }}</h3>
            <p class="card-text">{{ cardData.text }} </p>
        </div>
    </div>
</template>




<style scoped>
.card {
    width: 300px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
    background-color: blue;
}

.card:hover {
    transform: scale(1.05);
}

.card img {
    width: 300px;
    height: 200px;
}

.card-content {
    padding: 15px;
    background: #fff;
}

.card-title {
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: bold;
}

.card-text {
    font-size: 0.9em;
    color: #555;
}
</style>