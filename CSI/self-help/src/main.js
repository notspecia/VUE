import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router';
import globalSvgs from './services/svgs'

// importazione libreria per poter utilizzare i toast (da montare all'app)
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

// possibile inserzione di impostazioni GLOBALI di default da applicare a tutti i toasts oltre al montaggio all'interno dell app.vue
/* 
UTILIZZO:
creare una funzione di callback collegata all'evento del bottone per mostrare il toast notification
- 1 parametro: contenuto testuale da mostrare nel toast
- 2 parametro: oggetto di configurazione di quel determinato toast (type, autoclose, transition... )
https://vue3-toastify.js-bridge.com/api/container.html
https://vue3-toastify.js-bridge.com/api/toast.html
*/
app.use(Vue3Toastify,
    {
        autoClose: 3000, // durata in millisecondi prima della chiusura
        position: 'bottom-right', // posizione della notifica nello schermo
        transition: "slide", // transizione di entrata e di uscita del toast nello schermo
        theme: 'light',
        style: {
            zIndex: 999 // necessario che sia uno z-inde x < della modale per le azioni sui ticket
        }
    }

);

app.config.globalProperties.$svgs = globalSvgs

// montaggio app
app.mount('#self-help-frontend')
