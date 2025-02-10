<!-- 
!usiamo gli stessi dati di OPTIONS API, ma lo applichiamo con COMPONENTS API
!QUESTA E LA VERSIONE LUNGA DI SETUP() PER I DATI E METODI

* abbiamo bisogno ora di rendere lo stato dei dati REATTIVI! quindi dobbiamo importare 
* funzione ref() dai pacchetti vue di npm -->
<!-- <script>
import { ref } from 'vue';

export default {

  /* wrappiamo tutti i: dati + metodi arrow   
  dentro un setup() function
  CAMBIA IL METODO DI ASSEGNAZIONE, ORA SIAMO DENTRO UNA FUNZIONE!! */
  setup() {
    // dati da inserire dentro il template/elaborarli (diventano REATTIVI tramite la funzione ref() )
    const name = ref("Gabriele");
    const status = ref("Attivo");
    const foods = ref(['pizza', 'pasta', 'risotto']);

    /* funzioni metodi arrow function (la nomeclatura cambia rispetto a quello di prima)
    - non usiamo THIS, dato che non siamo + in un oggetto come i data() di options API
    - USIAMO IL DATO.VALUE -> name.value / status.value */
    const handleClick = () => {
      if (status.value === 'active') {
        status.value = 'inactive';
      } else {
        status.value = 'active';
      }
    }

    // in fondo al setup, andiamo a restituire un oggetto contenente tutti i dati/metodi
    return {
      name,
      status,
      foods,
      handleClick
    }
  }

}
</script> -->


<!-- ---------------------------- versione corta riduttiva ---------------------------------- -->


<!-- 
!usiamo gli stessi dati di OPTIONS API, ma lo applichiamo con COMPONENTS API
!QUESTA E LA VERSIONE CORTA PER SETUPPARE I DATI E METODI
!aggiungiamo l'attributo setup allo script tag embedded

* abbiamo bisogno ora di rendere lo stato dei dati REATTIVI! quindi dobbiamo importare 
* funzione ref() dai pacchetti vue di npm un po come se fosse lo STATE IN REACT -->
<script setup>
import { ref } from 'vue';

// dati da inserire dentro il template/elaborarli (diventano REATTIVI tramite la funzione ref() )
const name = ref("Gabriele");
const status = ref("Attivo");
const foods = ref(['pizza', 'pasta', 'risotto']);

/* funzioni metodi arrow function (la nomeclatura cambia rispetto a quello di prima)
- non usiamo THIS, dato che non siamo + in un oggetto come i data() di options API
- USIAMO IL DATO.VALUE -> name.value / status.value */
const handleClick = () => {
  if (status.value === 'active') {
    status.value = 'inactive';
  } else {
    status.value = 'active';
  }
}

</script>



<template>
  <h1>ciao {{ name }}</h1>

  <!--* 01. rendiamo il template dinamico tramite alcune direttive (condizionali, cicli, eventi) -->

  <!-- 
direttiva v-if, se status è true/active allora renderizza il paragrafo
con v-else-if, mettiamo un altra codizione if, se nemmeno questa è true allora renderizza il paragrafo nell'else!
con v-else non renderizza l'altra opzione se il status è false 
-->
  <h2 v-if="status === 'active'">sono ATTIVO</h2>
  <h2 v-else-if="status === 'inactive'">sono INATTIVO</h2>
  <h2 v-else>sono sbagliato! D:</h2>

  <!-- 
v-for possiamo usarlo per "scorrere" gli elementi di un dato array, su molteplici elementi
usando "ELEMENTOSINGOLO in ARRAYELEMENTI"
inoltre come in react o altri frameework, assegniamo ad ogni elemento una key, in questo caso l'indice dell'elemento
-->
  <h3>Cibi preferiti:</h3>
  <ul>
    <li v-for="food in foods" :key="foodID">{{ food }}</li>
  </ul>

  <!-- piccola revisione su v-on per gli eventi al click di un elemento con un metodo collegato
 v-on:click usato in vue options api 
 @click introdotto con vue 3 (stesso funzionamento ma + corto)-->
  <button @click="handleClick">cliccami e cambio lo stato</button>
</template>



<style scoped></style>