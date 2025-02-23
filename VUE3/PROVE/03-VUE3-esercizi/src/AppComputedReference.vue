<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
    name: 'John Doe',
    books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
});


const removeBook = () => {
    author.books.pop();
}

// a computed ref
const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
    <p>Has published books:
        <span :style="publishedBooksMessage ? {{ 'color: white' }} : { { } }">
            {{ publishedBooksMessage }}
        </span>
    </p>

    <ul>
        <li v-for="(book, index) in author.books" :key="index">
            {{ index }} Book: {{ book }}
        </li>
    </ul>

</template>