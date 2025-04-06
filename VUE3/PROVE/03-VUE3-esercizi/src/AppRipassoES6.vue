<script setup>
const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
    { id: 4 } // per testare i valori di default nel destructuring dell'utente selezionato
];

// -----------------------------------

// 1️⃣ prendiamo il nome e l'eta del primo UTENTE TRAMITE destructuring + rinominiamole + parametri di default!!
const { name: firstUserName = "Missigno", age: firstUserAge = 99 } = users[0];

// ----------------------------------

// 2️⃣ Crea un nuovo array aggiungendo un nuovo utente con spread operator
const newUsers = [...users,
{ id: 4, name: "Luigi", age: 46 }
];

// 3️⃣ Funzione fittizia per ottenere i post di un utente (simula un'API)

// 4️⃣ Completa questa funzione usando async/await per ottenere i post di ogni utente



// 5️⃣ Filtra gli utenti che hanno più di 24 anni e stampali
const filteredUsers = newUsers.filter((user) => user.age > 24); // condizione true, restituisce l'utente

// Mappa utenti raddoppiando per ogni utente la sua età
const grownedUsers = newUsers.map((user) => (
    {
        ...user, // prendiamo i dati dell'utente attuale dal "newUsers[index]"
        age: user.age * 2 // sostituiamo all'oggetto originale l'età con una raddoppiata
    }
));

</script>




<template>

    <h2 style="margin-bottom: 200px;">Io sono il primo utente: {{ firstUserName }}, {{ firstUserAge }} anni</h2>


    <p>Ecco gli utenti con anni > di 20!:</p>
    <ul style="margin-bottom: 100px;">
        <li v-for="(user, index) in filteredUsers" :key="index">
            {{ user.name }} che ha {{ user.age }} anni attualmente
        </li>
    </ul>

    <p>Ecco gli utenti con anni raddoppiati:</p>
    <ul style="margin-bottom: 100px;">
        <li v-for="(user, index) in grownedUsers" :key="index">
            {{ user.name || "missigno" }} ha ora: {{ user.age }} anni
        </li>
    </ul>

</template>





<style scoped></style>