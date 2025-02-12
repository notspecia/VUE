import './assets/reset.css'
import './assets/main.css'
import router from './router'


// per poter utilizzare istanze o applicarle all'app creiamo una costante e non montiamo direttamente l'App.vue
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router); // applichiamo all'App.vue principale il routing impostato all'interno di routes/index.js
app.mount("#app"); // montaggio dell'App.vue presente all'interno dell'index.html