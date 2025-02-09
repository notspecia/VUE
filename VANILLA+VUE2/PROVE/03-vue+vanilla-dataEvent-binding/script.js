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

    // metodo per gestire l'input change event
    handleChange(e) {
      this.name = `${e.target.value}`;
    },

    // metodo per gestire il reset dell'input inserito nel campo presente nel DOM
    resetInput() {
      this.name = "";
    }

  }
}).mount("#appCourse");
