<script setup>
/*
importiamo il ref() funzione che permette di rendere i dati reattivi
importiamo onMounted() funzione che viene da vue che viene eseguita al montaggio del componente VUE
*/
import { ref, onMounted } from 'vue';

const tasks = ref([]); // contenitore delle task aggiornato tramite form
const newTask = ref(""); // collegato all'input tramite v-model (si aggiorna all'aggiornamento di esso)

const handleSubmit = () => {
    if (newTask.value.trim()) {
        tasks.value.unshift(newTask.value); // aggiungiamo la task alla lista
        newTask.value = ""; // reset del valore del task
    }
}

const handleDelete = (index) => {
    tasks.value.splice(index, 1);
}

//**** funzione onMounted() che contiene una callback function async che carica delle tasks via fetch GET API ***** 
onMounted(async () => {
    try {
        // otteniamo il json con le task e lo convertiamo in una array da json
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();

        // assegniamo all'array delle tasks, solamente i titoli di essi
        tasks.value = data.map((task) => {
            return task.title;
        });

    } catch (error) {
        console.log(error.message);
    }
})

</script>



<template>
    <h2>Form Vue dinamici reattivi</h2>

    <!-- 
    aggiungiamo l'evento quando il form viene submitato dal bottone
    + preveniamo il comportamento di default che ricarica la pagina tramite:
    @submit.prevent 
    -->
    <form @submit.prevent="handleSubmit()">
        <label for="newTask">Aggiungi task</label>
        <input type="text" name="newTask" id="newTask" v-model="newTask" required>
        <button type="submit">Aggiungi task!</button>
    </form>


    <!-- qui dentro la lista non ordinata andiamo a renderizzare le task -->
    <ul>
        <!--
        creiamo all'interno di ogni task, anche un bottone per cancellarla
        passiamo l'ID di quella task al metodo listener!
        se vogliamo accedere all'index correttamente, dobbiamo usare un altro modo:
         -->
        <li v-for="(task, index) in tasks" :key="taskID">
            <span>
                {{ task }}
            </span>
            <button style="background-color: red;" @click="handleDelete(index)">Cancella task!</button>
        </li>
    </ul>
</template>



<style scoped></style>