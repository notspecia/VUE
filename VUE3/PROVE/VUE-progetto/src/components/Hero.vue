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
    <h3>{{ subtitle }}</h3>
</template>




<style scoped>
h1 {
    text-align: center;
    background-color: yellow;
}
</style>