// importiamo funzioni scaricare da "vue-router" per applicare il routing tra varie pagine/views nel nostro progetto!
import { createRouter, createWebHistory } from "vue-router";


// importiamo le varie views COMPONENTS, all'interno di questo script per abilitare il routing e le sue azioni!
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import JobDetailsView from "@/views/JobdetailsView.vue";
import AddJobsView from "@/views/AddJobsView.vue";
import DeletejobView from "@/views/DeletejobView.vue";
import EditjobView from "@/views/EditjobView.vue";
import NotfoundView from "@/views/NotfoundView.vue";


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
            component: HomeView
        },
        {
            path: "/jobs",
            name: "jobs",
            component: JobsView
        },
        { 
            path: '/jobs/:id', 
            name: 'jobDetail', 
            component: JobDetailsView, 
        },
        {
            path: "/addJobs",
            name: "addJobs",
            component: AddJobsView
        }, 
        // path di VIEWS accessibili all'interno di "Jobdetails.vue" per modificare/cancellare il job selezionato
        {
            path: "/jobs/edit/:id",
            name: "editJob",
            component: EditjobView
        },
        {
            path: "/jobs/delete/:id",
            name: "deleteJob",
            component: DeletejobView
        },
        // catchiamo tutte le rotte != da quelle definite, renderizzando a una pagina personalizzata 404
        {
            path: "/:catchAll(.*)",
            name: "not-found",
            component: NotfoundView
        }

    ]
});


// esportiamo la nostra istanza di routing da inserire all'interno dello script globale in assets/main.js di entry point!
export default router; 