<script setup>
// importiamo la funzione che ci permette di definire i props passati dal genitore "App.vue"
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

import ProgrammatoreImgHero from '@/assets/images/programmatore-hero.png';

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
});
</script>




<template>
    <div class="hero">
        <h1>{{ title }}</h1>
        <h4>{{ subtitle }}</h4>
        <div class="hero-image"> <img :src="ProgrammatoreImgHero" alt=""></div>


        <!-- bottone CTA per portare alla View di "jobs/" -->
        <div class="CTA">
            <RouterLink :to="'jobs'" class="context">Scopri i nostri Jobs!</RouterLink>
            <i class="pi pi-briefcase" style="font-size: 1.3rem; color: white;"></i>
        </div>
    </div>
    <slot />
</template>




<style scoped>
/* contenitore Hero da centrare nello schermo*/
.hero {
    height: 65vh;
    margin-top: 250px;
}

h1 {
    background: linear-gradient(120deg, #42d392 25%, #647eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Proprietà opzionali per compatibilità con altri browser */
    background-clip: text;
    text-fill-color: transparent;

    text-align: center;
    font-size: 60px;
    font-family: var(--font-title);
    margin-bottom: 20px;
}

h4 {
    color: rgba(235, 235, 235, .6);
    text-align: center;
    font-size: 24px;
    font-family: var(--font-subtitle);
}

/* immaggine sotto la hero title centrata */
.hero-image {
    display: flex;
    justify-content: center;
}

.hero-image img {
    width: 300px;
}

/* style del bottone CTA che porta alla route di "jobs/" */
/* bottone che porta a un nuovo componente che permette di leggere singolarmente la card di quel job */
div.CTA {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    background-color: rgb(15, 54, 26);
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    margin: 50px auto 0;
    cursor: pointer;
    animation: borderLight 3.5s infinite linear;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        background-color: rgb(0, 88, 0);
        transform: scale(1.02);
        /* leggero ingrandimento per effetto hover */
    }
}

div.CTA .context {
    color: white;
    font-size: 20px;
    font-family: var(--font-subtitle);
    text-decoration: none;
    margin-right: 10px;
}
</style>