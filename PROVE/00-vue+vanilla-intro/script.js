Vue.createApp({
  // dati che si collegano all'HTML in maniera dinamica al DOM quando modificati
  data() {
    return {
      todoList: [], // conterrà i vari todo aggiunti al click del bottone
      todo: "", // contiene il todo compilato all'interno dell'input (inizialmente vuoto)
    };
  },

  // metodi e funzioni collegati all'HTML tramite DOM in cui possiamo modificare i dati di sopra
  methods: {
    addTodo() {
      this.todoList.push(this.todo);
      this.todo = ""; // resettiamo il todo input a una stringa vuota
    },
  },
}).mount("div#appTodo");
