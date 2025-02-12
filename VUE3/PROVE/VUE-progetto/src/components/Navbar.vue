<script setup>
/*
*/
// importiamo il logo all'interno del componente in assets/ (è != se fosse all'interno di public/) con v-bind (:src)
import vueLogo from "@/assets/logos/vue-logo.png";
</script>




<template>
    <header>
        <a id="logo" href="#"><img :src="vueLogo" alt="logo"></a>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/jobs">Jobs</a></li>
                <li><a href="/addJobs">Add Jobs</a></li>
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
}


/* mettiamo un po di spazio tra i link tramite altro padding, e allineamoli sulla stessa riga
tramite display: inline-block */
header nav ul li {
    display: inline-block;
    padding: 0 30px;
}


header nav ul li a {
    color: white;
    font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        color: rgb(61, 113, 182);
    }
}
</style>