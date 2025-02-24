<script setup>
import { reactive, ref, computed } from 'vue'

// molto + comodo da usare rispetto a ref(), in quanto possiamo ad accedere con reactive() direttamente senza il .value
const author = reactive({
    name: 'John Doe',
    books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
});

const newBook = ref("");

// metodo collegato a un bottone, permettendo di rimuovendo l'ultimo book
const removeBook = () => {
    author.books.pop();
}

// metodo collegato a un bottone permettendo di aggiungere un nuovo book tramite input v-model
const addBook = () => {
    if (newBook.value.trim()) {
        author.books.push(newBook.value);
        newBook.value = ""; //reset del campo
    }
}

// ------------------------------------------------------------------

/* 
a computed ref, si modifica ogni volta che i parametri all'interno si vanno a modificare,
ristituendo una stringa che va a mostrare in base al suo valore (yes/no) un determianto template
*/
const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No';
});
</script>




<template>
    <p>Has published books?
        <span :class="publishedBooksMessage === 'Yes' ? 'ok' : 'error'">
            {{ publishedBooksMessage }}, ne ha pubblicati in totale: {{ author.books.length }}
        </span>
    </p>

    <ul>
        <li v-for="(book, index) in author.books" :key="index">
            {{ index }} Book: {{ book }}
        </li>
    </ul>

    <div class="buttons">
        <button @click="removeBook()">Rimuovi Book</button>

        <div class="add-button">
            <input type="text" v-model="newBook">
            <button @click="addBook()">Aggiungi Book</button>
        </div>
    </div>

</template>





<style scoped>
.error {
    color: red;
}

.ok {
    color: green;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.add-button {
    display: flex;
    flex-direction: column;
}
</style>