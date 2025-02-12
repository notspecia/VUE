## installazione
per installare il progetto via npm una SPA nella propria macchina locale con VUE, seguire la guida di [Vue.js](https://vuejs.org/guide/quick-start.html#with-build-tools).
Ora si dovrebbe avere il primo progetto Vue in esecuzione! Nota che i componenti di esempio nel progetto generato sono scritti usando la Composition API e <script setup>, anziché la Options API



# file immagini loghi
- **public**: Queste immagini sono accessibili direttamente dall'URL senza bisogno di import.
    - *Dove metterle*: Usa public/ per immagini statiche come loghi, icone, favicon o immagini che non cambiano dinamicamente.
    Sono servite direttamente dal server e non vengono processate da Webpack o Vite.
    esempio:
    ```vue
    <template>
      <img src="/logo.png" alt="Logo" />
    </template>
    ```

- **assets**: Le immagini in src/assets/ vengono gestite da Webpack/Vite e possono essere importate nei componenti.
    - *Dove metterle*: Usa src/assets/ per immagini che vengono elaborate dal build system (es. immagini dinamiche o con binding Vue).
    esempio di come importarle nei componenti:
    ```vue
    <script setup>
        import logo from '@/assets/logo.svg';
    </script>

    <template>
        <img :src="logo" alt="Logo Vue" />
    </template>

    ```

📂 progetto-vue
│── 📂 public        <-- Immagini statiche accessibili direttamente
│     ├── logo.png  
│     ├── immagini/ 
│── 📂 src
│     ├── 📂 assets  <-- Immagini usate nei componenti
│     │     ├── logo.svg
│     │     ├── sfondo.jpg
│     ├── 📂 components
│     │     ├── Navbar.vue
│     │     ├── Home.vue
│     ├── App.vue
│── index.html



# Computed() funzione
In Vue 3 con Composition API, la funzione **computed()** viene utilizzata per `creare proprietà computate (computed properties)`. Queste *proprietà vengono ricalcolate solo quando le loro dipendenze cambiano*, rendendole più efficienti rispetto ai metodi normali.
esempio:
```js
// importiamo le funzioni dai pacchetti VUE
import { ref, computed } from "vue";

    // rendiamo reattivi due costanti
    const price = ref(100);
    const quantity = ref(2);

    // proprietà computata per calcolare il totale (VIENE AGGIORNATA OGNI VOLTA CHE PRICE E QUANTITY VARIANO IL LORO VALORE)
    const totalPrice = computed(() => price.value * quantity.value);
```
👉 totalPrice viene ricalcolato solo quando price o quantity cambiano.

## Quando usare computed() ?
- ✅ Quando devi calcolare un *valore derivato da dati reattivi*.
- ✅ Quando vuoi migliorare le prestazioni evitando calcoli inutili.
- ✅ Quando hai bisogno di un valore memorizzato in cache fino al cambio delle dipendenze.


# Vue router
comando per installare i pacchetti per poterlo utilizzare in VUE:
```cmd
npm i vue-router
```