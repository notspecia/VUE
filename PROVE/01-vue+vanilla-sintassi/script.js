// come sempre, dobbiamo dire creare una VUE app, e dirgli quale parte di HTML vogliamo collegare ad esso

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
      vueDocs: "https://vuejs.org/",
      win: null,
    };
  },

  // i metodi ci permettono di eseguire quando viene resa dinamica l'applicazione quando magari viene scattato un event listener tramite bottone
  methods: {
    // proviamo un metodo che al click genera un numero random e va a settare se è >0.5 il dato se ho vinto o no
    letsPlay() {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        this.win = true;
      } else {
        this.win = false;
      }
    },
    // proviamo un metodo che restituisce direttamente al pezzo di HTML manipolato da VUE una stringa senza settare tramite dato!
    learnProgramming() {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        return "studia REACT";
      } else {
        return "studia VUE";
      }
    },
  },
}).mount("#appCourse");
