<script setup>
// importiamo il RouterLink() creando un bottone che renderizzi alla rotta di Home.vue
import { RouterLink } from "vue-router";
</script>




<template>
    <div class="notFound">
        <i class="pi pi-exclamation-triangle icon"></i>
        <h1>404</h1>
        <p>Oops! The source you are looking for does not exist.</p>
        <RouterLink to="/" class="homeButton">Go back home</RouterLink>
    </div>
</template>




<style scoped>
.notFound {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: black;
    font-family: var(--font-title);
}

.icon {
    color: red;
    font-size: 4rem;
    margin-bottom: 30px;
}

h1 {
    font-size: 5rem;
    margin: 0;
}

p {
    font-size: 1.2rem;
    margin-bottom: 20px;
}

.homeButton {
    padding: 10px 20px;
    background-color: white;
    color: black;
    border: 2px solid black;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.1s ease-in-out;

    &:hover {
        transform: scale(1.04);
    }
}
</style>
