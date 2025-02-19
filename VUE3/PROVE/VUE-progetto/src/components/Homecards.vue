<script setup>
// importiamo le card che andranno inserite all'interno di questo componente "Homecards.vue"
import CardHome from '@/components/CardHome.vue';

// dati da passare a ogni singola Card component da renderizzare
const datas = [
    {
        title: "Opportunità di lavoro in Informatica",
        text: "Scopri le opportunità di carriera nel settore informatico. Dalle posizioni junior a quelle senior, ti offriamo supporto per entrare nel mondo della tecnologia, con aggiornamenti costanti sui lavori più richiesti e sulle tendenze del settore.",
        image: "https://www.stellarsolutions.it/wp-content/uploads/2018/01/lavorare-informatica.png"
    },
    {
        title: "Corsi per la crescita professionale",
        text: "Accedi a corsi gratuiti per migliorare le tue competenze. Offriamo una vasta gamma di corsi online in vari settori, tra cui sviluppo software, gestione aziendale e marketing digitale, per aiutarti a restare competitivo nel mondo del lavoro.",
        image: "https://lacerba.io/blog/wp-content/uploads/2021/10/FrontEndDeveloper.png"
    },
    {
        title: "Diventa Front-End Developer",
        text: "Impara le basi dello sviluppo front-end con il nostro programma di formazione. Dallo sviluppo web alla creazione di interfacce utente, questo percorso ti offre le competenze per lavorare come sviluppatore front-end e affrontare progetti reali.",
        image: "https://img.freepik.com/free-photo/person-playing-3d-video-games-device_23-2151005751.jpg?semt=ais_hybrid"
    }
];

</script>




<template>
    <section>
        <h2>Cosa offriamo:</h2>
        <p>Siamo la piattaforma ideale per chi cerca opportunità di lavoro nel mondo del front-end. Qui potrai trovare
            offerte mirate, entrare in contatto con aziende innovative e dare una svolta alla tua carriera nel web
            design e
            nello sviluppo front-end.</p>
        <div class="container-job">
            <!-- 
        andiamo a ciclare tutti i dati presenti nella lista PER OGNUNO SI CREA UNA CARD component
        *IMPORTANTE:
        utilizziamo ":" per passare un binding dinamico delle props invece di una stringa statica (come se stessimo utilizzando v-bind) 
        -->
            <CardHome v-for="(data, index) of datas" :card-data="data" :key="index" />
        </div>
    </section>
</template>




<style scoped>
section {
    background-color: rgb(29, 29, 29);
    padding: 80px 0;
    margin-top: 50px;

}

h2 {
    color: white;
    text-align: center;
    font-size: 40px;
    font-family: var(--font-title);
    margin-top: 0;
    margin-bottom: 20px;
}

p {
    width: 60%;
    color: rgba(235, 235, 235, .6);
    text-align: center;
    font-size: 16px;
    line-height: 1.4;
    font-family: var(--font-subtitle);
    margin: 0 auto;
}

.container-job {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
}
</style>