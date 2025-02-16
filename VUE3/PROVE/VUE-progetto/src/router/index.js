// importiamo funzioni scaricare da "vue-router" per applicare il routing tra varie pagine/views nel nostro progetto!
import { createRouter, createWebHistory } from "vue-router";


// importiamo le varie views COMPONENTS, all'interno di questo script per abilitare il routing e le sue azioni!
import Home from "@/views/Home.vue";
import Jobs from "@/views/Jobs.vue";
import AddJobs from "@/views/AddJobs.vue";
import Jobdetails from "@/views/Jobdetails.vue";
import Notfound from "@/views/Notfound.vue";

/* 
* creiamo un istanza di routing tramite il createRouter(), inserendo un oggetto di configurazione con:
- history: tramite la funzione createWebHistory(), permette di applicare le azioni come una normale MPA (torna indietro o altro)
- routes: un array di oggetti, OGNI OGGETTO CONTIENE LE VIEWS DA NAVIGARE (path + name + component) 
- aggiunta anche la pagina diciamo 404, in caso venisse inserita una rotta diversa da quelle elencate nell'oggetto
*/
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
            path: '/jobs/:id', 
            name: 'jobDetail', 
            component: Jobdetails, 
        },
        {
            path: "/addJobs",
            name: "addJobs",
            component: AddJobs
        }, 
        {
            path: "/:catchAll(.*)", // catchiamo tutte le rotte != da quelle definite
            name: "not-found",
            component: Notfound
        }

    ]
});


// esportiamo la nostra istanza di routing da inserire all'interno dello script globale in assets/main.js di entry point!
export default router; 