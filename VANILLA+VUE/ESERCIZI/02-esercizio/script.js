Vue.createApp({
    data() {
        return {
            username: "", // username modificato dall'evento dell'input quando cambiato
            confirmedUsername: "" // username che viene riempito quando dopo aver compilato la prop username, dopo aver premuto ed effettuato evento "v-on:keydown"
        }
    },
    methods: {

        // al click tramite "v-on:click" scatta evento di questa funzione invocando l'alert al suo interno
        showAlert() {
            alert("ciao!");
        },

        // evento che viene effetutato passando il target dell'input quando viene esso modificato
        handleChange(e) {
            this.username = e.target.value;
        },

        // nel momento in cui il tasto viene rilasciato, la proprietà "confirmedUsername" assumera il valore di username
        handleConfirm() {
            this.confirmedUsername = this.username;
        }
    }
}).mount("#assignment");