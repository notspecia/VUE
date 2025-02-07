# Introduzione a Vue.js

Vue.js è un **framework client-side** basato su **JavaScript, HTML e CSS**.
Non utilizza linguaggi server-side come PHP o Node.js e aiuta a costruire interfacce utente nel browser in modo efficiente e reattivo.

## Cosa offre il corso Udemy?

è un corso grosso, con tanti contenuti con un analisi profondita, ecco uno schema da seguire durante il corso:
[link allo schema](https://csip.udemy.com/course/vuejs-2-the-complete-guide/learn/lecture/21463712#content)

## Perché usiamo Vue.js?

Le applicazioni mobile e web moderne sono **responsive** e **interattive**, consentendo la navigazione tra vari schermi senza dover ricaricare la pagina ogni volta che avviene un'azione.

- **Manipolazione del DOM**: JavaScript viene caricato durante il parsing del documento nel browser, permettendo di aggiornare il DOM dinamicamente senza dover effettuare richieste continue al server per ottenere nuove pagine.
- **Efficienza e ottimizzazione**: Vue.js consente di evitare la ripetizione di codice e di seguire **best practices** per lo sviluppo.
- **Facilità di collaborazione**: Lavorare in team diventa più semplice grazie a un framework che impone regole e strutture standardizzate.

## Come possiamo usare Vue.js?

Vue.js può essere utilizzato in due modi principali:

1. **Interattività parziale del DOM**: Possiamo controllare specifiche parti della pagina per renderle interattive, come una **sidebar** o una **chat**.
2. **Single Page Application (SPA)**: Vue.js può controllare l'intera applicazione, ricevendo i dati iniziali dal server e gestendo tutto il rendering lato client.

---

## Esempio di integrazione di Vue.js in Vanilla JavaScript

All'inizio del corso verrà mostrato un confronto tra **JavaScript Vanilla puro** e **JavaScript Vanilla con Vue.js** integrato.

### Importazione di Vue.js via CDN

Non è necessario scaricare pacchetti tramite npm. Possiamo importare Vue.js direttamente nel nostro progetto tramite **CDN**:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Dopo l'importazione, possiamo creare un'app Vue con la funzione `Vue.createApp()`:

```js
const app = Vue.createApp({
  data() {
    return {
      goals: [],
      goalInput: "",
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.goalInput);
      this.goalInput = ""; // reset input
    },
  },
});

app.mount("#app");
```

### Collegamento tra Vue.js e HTML

Per collegare Vue agli elementi HTML e manipolarli dinamicamente:

- Utilizziamo `v-model` per collegare gli **input** ai dati dello script:

```html
<input type="text" v-model="goalInput" />
```

- Aggiungiamo un `v-on:click` per eseguire una funzione al click di un pulsante:

```html
<button v-on:click="addGoal">Aggiungi Goal</button>
```

- Usiamo `v-for` per iterare un array e generare dinamicamente elementi:

```html
<ul>
  <li v-for="goal in goals">{{ goal }}</li>
</ul>
```

### Collegamento Vue.js al DOM

Dobbiamo specificare **quale parte della pagina** deve essere controllata da Vue. Lo facciamo con l'`id="app"` nel container principale:

```html
<div id="app">
  <input type="text" v-model="goalInput" />
  <button v-on:click="addGoal">Aggiungi Goal</button>
  <ul>
    <li v-for="goal in goals">{{ goal }}</li>
  </ul>
</div>
```

Infine, montiamo l'app Vue su questo container con:

```js
app.mount("#app");
```

Questo permette a Vue.js di gestire gli aggiornamenti del DOM in modo automatico ed efficiente, collegandosi l'HTML ai dati e alla logica gestiti dallo script collegato a VUE.js, senza andarci a perdere nel vanilla JS con una sintassi poco stabile e difficile da mantenere.

## Introduzione alla sintassi di VUE.js

l'app di VUE create contiene unoggetto che possiamo usare per configurare quel pezzo di app scelto tramite querySelector! possiamo memorizzare questi dati all'interno dell'oggetto di configurazione (COPPIA `CHIAVE + VALORE`) tramite:

```js
data() {
    return {
      goals: [],
      goalInput: "",
    };
  },
```

### Interpolation e Data Binding

#### Interpolation

TUTTO CIO CHE è all'interno dell'oggetto e restituito (quindi i dati) possiamo utilizzarli e renderizzarli all'interno del nostro HTML tramite le `{{}}`, se questa sintasi viene utilizzata in un pezzo di HTML che è controllata da VUE, quest'ultimo ci permetterà di accedere `alle proprietà returnate all'interno dei data(){}` viene chiamata INTERPOLAZIONE, esempio:

```js
Vue.createApp({
  // dati dinamici manipolati tramite DOM HTML in quel pezzo di app, può contenere oggetti, array, stringhe, numeri...
  data() {
    return {
      titolo: "VUEEEEEEEEEEEEEEEEEE",
      goal: {
        name: "Vue",
        descrizione: "imparare VUE IMMEDIATAMENTE!",
        tempo: 10,
      },
    };
  },
}).mount("#appCourse");
```

```html
<div id="appCourse">
  <!-- inseriamo i dati tramite INTERPOLATION anche di un oggetto con i vari dati e proprietà di un corso -->
  <h2>I miei corsi {{titolo}}</h2>
  <p><strong>nome corso:</strong> {{ goal.name }}</p>
  <p><strong>descrizione corso:</strong> {{ goal.descrizione }}</p>
  <p><strong>tempo per imparare:</strong> {{ goal.tempo }} ore</p>
</div>
```

all'interno delle {{}} possiamo pure creare `delle espressioni js direttamente nell'interpolazione {{}}`, quindi volendo possiamo invocare direttamente delle funzioni interno, o creare degli operatori ternari:

```html
<p>{{learnProgramming()}}</p>
```

#### Binding con "v-bind"

se proviamo ad esempio ad inserire un link dinamico gestito tramite VUE, **NON** possiamo fare come sempre come fatto tramite INTERPOLATION, come in questo esempio errato

```html
<p>Scopri di più di <a href="{{vueDocs}}">Vue</a></p>
```

quindi da quanto visto, questo metodo è utilizzabile esclusivamente solo per l'apertura e la chiusa di TAG HTML, ma dovremo utilizzare in questo caso il `Data Binding`, tramite un attributo HTML che è riconosciuto da VUE ossia `v-bind:href='nomeDato'`:

```html
<p>Scopri di più di <a v-bind:href="propietà">Vue</a></p>
```

quindi è necessario in alcuni casi in cui è NECESSARIO IMPOSTARE IL VALORE DI ALCUNI ATTRIBUTI COME `href`

### Methods

### v-html

spero mai di non utilizzarlo, metodo di VUE che permette di caricare un dato contenente gia un tag HTML
una review delle guida fatta fin'ora clicca [QUI](https://csip.udemy.com/course/vuejs-2-the-complete-guide/learn/lecture/21463156#content)


---

### differenze nell'utilizzo di v-model VS v-bind:value + event change NEGLI INPUT
ciao,
allora è come dici;
nel dettaglio vue, come la più parte dei framework di oggi funziona con un "one-way binding" ovvero tu ad un componente passi dentro delle prop (reattive, quindi se le prop cambiano, il componente ri-renderizza) ma il componente tali prop non le può modificare, per farlo deve emettere un evento verso il componente padre che possiede i dati e sarà lui ad aggiornarli;
 
tuttavia, ci sono alcuni pattern molto comuni, ad esempio i campi dei form, dove si vuole praticamente un "two ways binding"; per esempio una input di un form tipicamente ha sempre lo stesso comportamento: riceve il proprio valore dal componente padre, e quando l'utente lo modifica, emette un evento change che chiede al padre di aggiornarlo; in pratica questo:
 
 <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
e poi nel componente padre ascoltare l'evento ed aggiornare modelValue col valore che viene passato nell'evento;
 
è un pattern comune e sarebbe noioso scriverselo sempre a mano; in quel caso usando v-modello scrive lui per te;
in pratica un valore passato con v-model può venire aggiornato direttamente dal componente che lo riceve, senza emettere eventi verso il genitore che glielo passa (ma dietro le quinte il funzionamento resta lo stesso), ovvero vue emette per te l'evento e lo gestisce nel genitore; pertanto usare v-model oppure :value e poi emettere l'evento e gestirlo sono totalmente equivalenti
 
è spiegato molto bene nella guida https://vuejs.org/guide/components/v-model.html
 


### Prima problematica riscontrata con VUE js
nel momento in cui torniamo all'`esempio del bottone che incrementa un data proprietà come count`, quest'ultimo quando viene eseguito l'evento IL COMPONENTE SI RIMONTA E SI AGGIORNA, e se magari sono presenti all'interno dell'html invocazioni di funzioni che ritornano direttamente dei DATI senza MEMORIZZARLI all'interno di un dato, la funzione verrà reinvocata ogni volta che viene incrementato o decrementato il counter tramite gli EVENTI.

per vedere gli effetti collaterali, guardare `02-vue+vanilla-methods-events`

#### soluzione: COMPUTED PROPERTIES
è da aggiungere all'OGGETTO DI CONFIGURAZIONE NELLA CREAZIONE DELL'APP:
```js
```