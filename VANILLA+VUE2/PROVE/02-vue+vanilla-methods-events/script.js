// come sempre, dobbiamo dire creare una VUE app, e dirgli quale parte di HTML vogliamo collegare ad esso

Vue.createApp({
  data() {
    return {
      count: 10,
      name: ""
    }
  },
  // metodi ed eventi per gestire il contatore passando come argomento un numero da incrementare o decrementare
  methods: {
    increase(num) {
      this.count = this.count + num;
    },
    decrease(num) {
      this.count = this.count - num;
    },

    // metod0 per gestire l'input change event
    handleChange(e, cognome) {
      this.name = `${e.target.value} ${cognome}`;
    },

    // metod per gestire il submit del form di iscrizione
    handleSubmit(e) {
      e.preventDefault(); // preveniamo il reload della pagina
      alert("ciao! ti sei iscritto");
    },

    //! test per problema del rimontaggio componente
    generateRand() {
      return Math.random();
    }

  }
}).mount("#appCourse");
