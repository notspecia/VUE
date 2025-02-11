<script setup>
// importiamo il logo all'interno del componente in assets/ (è != se fosse all'interno di public/)
import vueLogo from "@/assets/logos/vue-logo.png";
</script>




<template>
    <!-- inseriamo il logo tramite il v-bind:src accoriato a   :src, passando il logo importato -->
    <img :src="vueLogo" alt="logo di vue.js">
</template>




<style scoped>
img {
    width: 100px;
    background-color: red;
}
</style>