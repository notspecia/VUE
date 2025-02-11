<script setup>

import { ref } from 'vue';

// importiamo i componenti all'interno dell'app root principale renderizzate nel DOM per effettuare tests su VUE
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Homecards from './components/Homecards.vue';
import Joblisting from './components/Joblisting.vue';

/* creiamo PER TESTING dei dati che passiamo come prop da modificare al componente figlio (limite e flag booleano)
passando DATO + METODO PER LA MODIFICA di quel dato
SI POTREBBERO METTERE DIRETTAMENTE NEL COMPONENTE FIGLIO, MA E A FINE DI TESTING! */
const limit = ref(3);
const allShowed = ref(false);

// quando il bottone non è stato cliccato e + espandersi mostrando tutti i jobs, PASSIAMO LA LUNGHEZZA DELL'ARRAY CON TUTTI I JOBS COME NUOVO "LIMIT"
const showJobs = (length) => {
  limit.value = length;
  allShowed.value = true;
}

// quando il bottone è stato cliccato permette di nascondere tutti i jobs, ritornando a mostrare i primi 3
const hideJobs = () => {
  limit.value = 3;
  allShowed.value = false;
}
</script>




<template>
  <!-- importato componente navbar (base) -->
  <Navbar />

  <!-- importato componente hero (passando delle props dati ad esso ossia dati)
  passiamo un dato di intestazione per il titolo della HERO e il sottotitolo della HERO -->
  <Hero title="Benvenuto sul nostro JOB placement!" subtitle="cerca e trova subito lavoro!" />

  <!-- importato componente che funge da container per delle card contenente dati e altri componenti <Card /> -->
  <Homecards />

  <!-- importiamo il componente che renderizzera tutti i lavori presi dal -> "jobs.json" 
  SONO VALORI REATTIVI QUINDI LI PASSIAMO TRAMITE v-binding -> : -->
  <Joblisting :limit="limit" :allShowed="allShowed" :showJobs="showJobs" :hideJobs="hideJobs" />
</template>




<style scoped></style>