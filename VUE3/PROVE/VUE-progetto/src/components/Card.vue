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
            <h3>{{ cardData.title }}</h3>
            <p>{{ cardData.text }} </p>
        </div>
    </div>
</template>




<style scoped>
.card {
    width: 350px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
    background-color: green;
}

.card:hover {
    transform: scale(1.02);
}

.card img {
    width: 100%;
    height: 220px;
}

.card-content {
    padding: 15px;
    background: #fff;
}

.card-content h3 {
    font-size: 17px;
    font-weight: 600;
    font-family: var(--font-subtitle);
    margin-bottom: 15px;
}

.card-content p {
    font-size: 14px;
    font-family: var(--font-text);
    line-height: 1.4;
}

.card-content h3,
.card-content p {
    text-align: center;
}
</style>