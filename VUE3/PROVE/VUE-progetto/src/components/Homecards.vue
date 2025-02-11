<script setup>
// importiamo le card che andranno inserite all'interno di questo componente "Homecards.vue"
import Card from './Card.vue';

// dati da passare a ogni singola Card component da renderizzare
const datas = [
    {
        title: "Bella zi",
        text: "loremloremlore mjdsf osdjfkl sdfjklfds",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4tTki66kvbqrRnt9T8U3aepD8ZElLn99aw&s"
    },
    {
        title: "aoaoaoaoa zi",
        text: "dfs  rem gsdgs  ore mjdsf osdjfkl sdfjklfds",
        image: "https://assets.goal.com/images/v3/blt5d5dd57c5755b3e8/Udogie_Italia.jpg?auto=webp&format=pjpg&width=3840&quality=60"
    },
    {
        title: "ciaaaaaaaaaaaaao zi",
        text: "lores dff lore mjdsf osdjfkl sdfjklfds",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqBpCYxOZq709IMBgJbdhdfEEaw3NlZbnAw&s"
    }
];
</script>




<template>
    <div class="container">
        <!-- 
        andiamo a ciclare tutti i dati presenti nella lista PER OGNUNO SI CREA UNA CARD component
        *IMPORTANTE:
        utilizziamo ":" per passare un binding dinamico delle props invece di una stringa statica (come se stessimo utilizzando v-bind) 
        -->
        <Card v-for="(data, index) in datas" :card-data="data" />
    </div>
</template>




<style scoped>
.container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: orange;
    min-height: 200px;
}
</style>