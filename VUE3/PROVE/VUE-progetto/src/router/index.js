// importiamo funzioni scaricare da "vue-router" per applicare il routing tra varie pagine/views nel nostro progetto!
import { createRouter, createWebHistory } from "vue-router";


// importiamo le varie views, all'interno di questo script per abilitare il routing e le sue azioni!
import Home from "@/views/Home.vue";
import Jobs from "@/views/Jobs.vue";
import AddJobs from "@/views/AddJobs.vue";

/* creiamo un istanza di routing tramite il createRouter(), inserendo un oggetto di configurazione con:
- history: tramite la funzione createWebHistory(), permette di applicare le azioni come una normale MPA (torna indietro o altro)
- routes: un array di oggetti, OGNI OGGETTO CONTIENE LE VIEWS DA NAVIGARE (path + name + component) */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/jobs",
            name: "jobs",
            component: Jobs
        },
        {
            path: "/addJobs",
            name: "addJobs",
            component: AddJobs
        },
        // {

        // }
    ]
});


// esportiamo la nostra istanza di routing da inserire all'interno dello script globale in assets/main.js di entry point!
export default router; 