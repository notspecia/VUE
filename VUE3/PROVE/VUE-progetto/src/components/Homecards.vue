<script setup>
// importiamo le card che andranno inserite all'interno di questo componente "Homecards.vue"
import CardHome from '@/components/Cardhome.vue';

// dati da passare a ogni singola Card component da renderizzare
const datas = [
    {
        title: "Opportunità di lavoro in Informatica",
        text: "Scopri le opportunità di carriera nel settore informatico. Dalle posizioni junior a quelle senior, ti offriamo supporto per entrare nel mondo della tecnologia, con aggiornamenti costanti sui lavori più richiesti e sulle tendenze del settore.",
        image: "https://www.stellarsolutions.it/wp-content/uploads/2018/01/lavorare-informatica.png"
    },
    {
        title: "Corsi gratuiti per la crescita professionale",
        text: "Accedi a corsi gratuiti per migliorare le tue competenze. Offriamo una vasta gamma di corsi online in vari settori, tra cui sviluppo software, gestione aziendale e marketing digitale, per aiutarti a restare competitivo nel mondo del lavoro.",
        image: "https://iformsrl.it/wp-content/uploads/2024/05/Corsi-gratuiti-1024x664.png"
    },
    {
        title: "Diventa Front-End Developer",
        text: "Impara le basi dello sviluppo front-end con il nostro programma di formazione. Dallo sviluppo web alla creazione di interfacce utente, questo percorso ti offre le competenze per lavorare come sviluppatore front-end e affrontare progetti reali.",
        image: "https://lacerba.io/blog/wp-content/uploads/2021/10/FrontEndDeveloper.png"
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
        <CardHome v-for="(data, index) of datas" :card-data="data" :key="index" />
    </div>
</template>




<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
}
</style>