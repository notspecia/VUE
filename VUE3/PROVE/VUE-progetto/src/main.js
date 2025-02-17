// per poter utilizzare istanze o applicarle all'app creiamo una costante e non montiamo direttamente l'App.vue
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

// -----------------------------

// style impostato dal programmatore GLOBALMENTE per tutte le View/Components
import './assets/reset.css'
import './assets/main.css'

// importazione style dal package di "primeicons"
import 'primeicons/primeicons.css'

// importazioni dello style + toast template dal package di "toastification"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
app.use(Toast); // applichiamo all'App.vue principale l'utilizzo dei Toast package npm

// importiamo le rotte impostare dentro il file index.js 
import router from './router'
app.use(router); // applichiamo all'App.vue principale il routing impostato all'interno di routes/index.js


// ----------------------------

app.mount("#app"); // montaggio dell'App.vue presente all'interno dell'index.html