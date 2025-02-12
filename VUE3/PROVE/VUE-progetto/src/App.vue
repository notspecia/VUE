<script setup>
// il settaggio delle rotte lo applichiamo all'interno del main.js importando il router istanza da assets/index.js, qui importiamo le funzioni per utilzzarlo!
import { RouterView } from 'vue-router';

// importiamo il componente Navbar e il RouterView, contenente i path e componenti associati l'un altro, per navigare di rotta in rotta
import Navbar from './components/Navbar.vue';
</script>




<template>
  <!-- importato componente navbar (base) -->
  <Navbar />

  <!-- routing pagine, contiene tutte le views specificate nel routing -->
  <RouterView />
</template>




<style scoped></style>