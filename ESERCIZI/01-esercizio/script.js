Vue.createApp({
  data() {
    return {
      name: "Gabriele",
      age: 20,
      myFavImage: "https://www.agrore.it/wp-content/uploads/2022/03/15.png",
      myInput: "", // si aggiorna dinamicamente quando viene modificato l'input collegato a questo dato
    };
  },
  methods: {
    generateRandomNum() {
      return Math.random();
    },
  },
}).mount("#appEx");
