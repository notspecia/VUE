<!-- questo file che è il componente principale di root che verrà montato nella nostra applicazione, è il contenitore o entry point
 che conterrà tutti gli altri componenti del progetto, composto principalmente INIZIALMENTE DAL RUN DEV:
 
 - script (contiene la logica dell'applicazione) 
 - template (quello che viene renderizzato)
 - style
-->

<!-- embedded script per il componet root principale -->
<script>

// definiamo i dati del componente all'interno dello script, ed esportiamo l'impostazione predefinita negli oggetti
// PER ORA ANCORA USIAMO OPTIONS API!!!!!!!
export default {
  data() {
    return { // restituito oggetto con i nostri dati
      name: 'Gabriele',
      message: 'Hello VUE try!',
      status: 'active',
      foods: ['pizza', 'pasta', 'risotto'],
      link: 'https://www.google.com'
    }
  },

  // metodi del componente (metodi che possono essere richiamati all'interno del template) tramite v-on...
  methods: {
    handleClick() {
      if (this.status === 'active') {
        this.status = 'inactive'
      } else {
        this.status = 'active'
      }
    }

  }
}
</script>



<!-- embedded template per il component root principale (quello che effettivamente viene renderizzato) -->
<template>
  <h1>{{ message }}, {{ name }}</h1>

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

  <!-- utilizzo di v-bind (per aggiungere contenuto agli attributi come link) 
   si può usare anche :href per aggiungere attributi agli elementi (+ corto) -->
  <a :href="link">clicca per vedere google</a>

  <!-- piccola revisione su v-on per gli eventi al click di un elemento con un metodo collegato
   v-on:click usato in vue options api 
   @click introdotto con vue 3 (stesso funzionamento ma + corto)-->
  <button @click="handleClick">cliccami e cambio lo stato</button>
</template>



<!-- embedded style per il component root principale (diamo attributo scoped per applicare lo stile solo a questo componente) -->
<style scoped>
h1 {
  color: red;
}
</style>
