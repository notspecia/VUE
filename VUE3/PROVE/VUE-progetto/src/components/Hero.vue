<script setup>
// importiamo la funzione che ci permette di definire i props passati dal genitore "App.vue"
import { defineProps } from 'vue';

/* composto da:
- nome della proprietà / props
- {} oggetto con valori riferenti a quella props (type, defualt value...)*/
defineProps({
    title: {
        type: String,
        default: "Missing title props"
    },
    subtitle: {
        type: String,
        default: "Missing subtitle props"
    }
})
</script>




<template>
    <h1>{{ title }}</h1>
    <h4>{{ subtitle }}</h4>
</template>




<style scoped>
h1 {
    text-align: center;
    font-size: 45px;
    font-family: var(--font-title);
    margin-bottom: 25px;
    margin-top: 250px;
}

h4 {
    text-align: center;
    font-size: 20px;
    font-weight: lighter;
    font-family: var(--font-subtitle);
    opacity: 0.5;
}
</style>