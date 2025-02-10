// importa il file css principale per applicare gli STILI GLOBALI all'applicazione
import './assets/main.css'

// importa la funzione per creare un'istanza dell'applicazione vue (direttamente dal pacchetto vue npm)
import { createApp } from 'vue'

// importa il componente principale (root component) che verrà renderizzato nel browser, conterrà tutta l'applicazione
import App from './App.vue'

// -----------------------------------------

// crea un'istanza dell'applicazione vue utilizzando il componente App e la monta sull'elemento con id 'app'
createApp(App).mount('#app') 
