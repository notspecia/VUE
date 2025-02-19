<!-- 
!data: 12/02/2025
!quello che abbiamo fatto fin'ora, è stato dall'App.vue component principale all'interno di questa pagina/view Home.vue
!(I COMPONENTI PRINCIAPLI CHE FORMANO LA VIEW DI HOME)

- all'interno di App.vue, lo rendiamo come si punto di ingresso, MA PER TUTTE LE ROTTE (le pagine) 
- sopra tutto il routing, dentro App.vue, incluederemo il componente Navbar.vue, che permette di navigare fra le rotte disponibli in views
- quella di default ("/") quando aperto il sito, sarà Home.vue -->


<script setup>
// importiamo i componenti da renderizzare nella View principlae home
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListing from '@/components/JobListing.vue';

// importiamo immagine della bag job
import bagJob from '@/assets/images/bag-job.png';


// --------------------------------------------

/* 
creiamo PER TESTING dei dati che passiamo come prop da modificare al componente figlio (limite e flag booleano)
passando DATO + METODO PER LA MODIFICA di quel dato
SI POTREBBERO METTERE DIRETTAMENTE NEL COMPONENTE FIGLIO, MA E A FINE DI TESTING!
*/
import { ref } from 'vue';

const limit = ref(3); // limite iniziale imposto come N massimo per mostrare x jobs cards nell "HomeView.vue"
const allShowed = ref(false);


// quando il bottone non è stato cliccato e + espandersi mostrando tutti i jobs, PASSIAMO LA LUNGHEZZA DELL'ARRAY CON TUTTI I JOBS COME NUOVO "LIMIT"
const showJobs = (length) => {
    limit.value = length;
    allShowed.value = true;
}

// quando il bottone è stato cliccato permette di nascondere tutti i jobs, ritornando a mostrare i primi 3
const hideJobs = (length) => {
    limit.value = 3; // dimezziamo i jobs visualizzabili
    allShowed.value = false;
}
</script>




<template>
    <!-- importato componente hero (passando delle props dati ad esso ossia dati)
    passiamo un dato di intestazione per il titolo della HERO e il sottotitolo della HERO
    SONO VALORI STATICI, quindi senza usare il v-binding -->
    <Hero title="Diventa Un Programmatore VUE!" subtitle="Cerca e trova subito lavoro come front-end developer!"></Hero>

    <!-- importato componente che funge da container per delle card contenente dati e altri componenti <Card /> -->
    <HomeCards />

    <!-- importiamo il componente che renderizzera tutti i lavori presi dal -> "jobs.json" 
    SONO VALORI REATTIVI QUINDI LI PASSIAMO TRAMITE v-binding -> : 
    
    !PER PASSARE GLI EVENTI MODIFICATORI DI PROPS DA: figlio a genitore   usiamo defineEmitters() -->
    <JobListing :limit="limit" :allShowed="allShowed" @show="showJobs" @hide="hideJobs">
        <!-- passiamo l'immagine sottoforma di <slot/> al componente "Joblisting.vue" ritraente una bag da lavoro (SOLO IN HOME RENDER!) -->
        <div class="jobImageContainer">
            <img :src="bagJob" alt="job hero image">
        </div>
    </JobListing>
</template>




<style scoped>
.jobImageContainer {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}

img {
    display: inline-block;
    width: 10%;
    border-radius: 10px;
}
</style>