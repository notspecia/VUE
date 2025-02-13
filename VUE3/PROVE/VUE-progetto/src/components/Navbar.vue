<script setup>
// ORA AL POSTO di usare i link normali con in vanilla <a :href""/>, usiamo la funzione Routerlink importata da VUE
import { RouterLink } from "vue-router";

// importiamo il logo all'interno del componente in assets/ (è != se fosse all'interno di public/) con v-bind (:src)
import vueLogo from "@/assets/logos/vue-logo.png";
</script>



<!-- 
usiamo RouterLink come tag per permettere di navigare tra le rotte impostare nel router index.js
al posto di :href usiamo l'attributo -> to="" cosi diventerà una SPA senza ricaricare le pagine ma smontando e montando componenti dall'App.vue collegato al router.js
-->
<template>
    <header>
        <RouterLink id="logo" to="/"><img :src="vueLogo" alt="logo"></RouterLink>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/">Home</RouterLink>
                    <i class="pi pi-home" style="font-size: 1.3rem; color: white;"></i>
                </li>
                <li>
                    <RouterLink to="/jobs">Jobs</RouterLink>
                    <i class="pi pi-briefcase" style="font-size: 1.1rem; color: white;"></i>
                </li>
                <li>
                    <RouterLink to="/addJobs">Add Jobs</RouterLink>
                    <i class="pi pi-plus" style="font-size: 0.9rem; color: white;"></i>
                </li>
            </ul>
        </nav>
    </header>
</template>




<style scoped>
img {
    width: 60px;
}

/* dare spazio tra i 3 containers principali della nav bar tramite FLEX-BOX
diamo anche un po di spazio ai lati all'header (quindi tutti gli elementi al suo interno) */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(230deg, black, green);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    text-align: center;
    padding: 20px 2%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}


/* mettiamo un po di spazio tra i link tramite altro padding, e allineamoli sulla stessa riga
tramite display: inline-block */
header nav ul li {
    display: inline-block;
    padding: 0 30px;
}

header nav ul li i {
    margin-left: 5px;
}

header nav ul li a {
    color: white;
    font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        color: greenyellow;
    }
}
</style>