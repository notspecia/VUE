<script setup>
import { reactive } from 'vue';


const userTasks = reactive([
    {
        day: "task of today",
        tasks: [
            "play videogame",
            "clean house"
        ]
    },
    {
        day: "task of tomorrow",
        tasks: [
            "play chess",
            "cook the dinner"
        ]
    },
    {
        day: "task of 10/03",
        tasks: [
            "ride a bike whit friends",
            "go to the hospital"
        ]
    }
])
</script>




<template>
</template>





<style scoped></style>