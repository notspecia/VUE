import { toast } from 'vue3-toastify'
import { scrollOnFireFox } from './utils';
import 'vue3-toastify/dist/index.css'


// /**
//  * showToast
//  * funzione generica per mostrare un toast richiamando dal componente il tipo di toast preconfigurato che si vuole mostrare
//  * @param {string} message - messaggio testuale da mostrare nel corpo del toast
//  * @param {string} type - tipologia di toast, passato già dalle funzioni preconfigurate dei toast in base a quello che viene invocato nei componenti
// * @param {object} options - oggetto di configurazione passato dal componente con tutte le caratteristiche (opzionali) per modficare il singolo toast
//  */
// const showToast = (message, type = 'info', options = {}) => {
//     toast[type](message, options);
// };
// /*
// configurazioni di toasts per usi comuni all'interno dei componenti (passando da essi il testo di contenuto, opzioni...)
// di default, il 2 parametro ovvero le opzioni di configurazioni del toast sono vuote
// */
// export const toastSuccess = (message, options = {}) => showToast(message, 'success', options);
// export const toastError = (message, options = {}) => showToast(message, 'error', options);
// export const toastWarning = (message, options = {}) => showToast(message, 'warning', options);
// export const toastInfo = (message, options = {}) => showToast(message, 'info', options);

const ERROR_MESSAGE_DEFAULT = "Errore durante l'operazione! riprova più tardi!"

// ---------------------------------------------------------------------------------------------

// per sovvrascrivere il toast di loader passando il type (success / error)
const showToast = (id, message, type, res, handleRouting) => {
  toast.update(id, {
    render: message,
    type,
    isLoading: false,
    autoClose: 4000,
    onClick: () => {
      if (handleRouting) {
        handleRouting(res);
      }
    },
  });
};

/**
 * toastPromise
 * Arrow function per impostare inizialmente su schermo il loading del toast quando si effettua un sollecito/creazione ticket/duplicazione
 * dopo aver risolto la Promise passata come argomento, andrà in base al successo o errore mostrare il relativo toast all'utente
 * con contesto testuale al suo interno un messaggio di successo preso dalla parsingCallback (che potrebbe contenere altre funzionalità
 * all'interno della propria chiamata del componente)
 * @param {string} message - Messaggio da mostrare nel loader del toast
 * @param {Function} parsingCallback - funzione di callback con delle funzionalità sulla chiamata singola + messaggio di successo 
 * @param {Promise} promise - promise inizializzata all'interno del componente (ancora in fase di pending da risolvere qui)
 */
export const toastPromise = async (message, parsingCallback, promise, handleRouting = null) => {

  // mostra un toast di caricamento e salva ID del toast
  const id = toast.loading(message);
  scrollOnFireFox(false);
  try {
    const res = await promise // risoluzione della promise con await
    const resultMessage = parsingCallback(res) // callback per ottenere il messaggio di successo da poi inserire come valore nella prop del toast.update

    // creiamo e aggiorniamo il toast di loader in uno di successo passando ID del toast messaggio creato dalla callback e il type
    showToast(id, resultMessage, 'success', res, handleRouting);

  } catch (error) {
    // per gestire i toast di errore passando il messaggio di errore e il type per creare il toast di errore
    showToast(id, message = ERROR_MESSAGE_DEFAULT, 'error', error);
  }
}