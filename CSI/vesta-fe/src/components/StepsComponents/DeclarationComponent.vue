<script setup>
import { defineProps } from 'vue';

/* PROPS */
const props = defineProps({
    dichiarazione: {
        type: String,
        required: true, // la dichiarazione è obbligatoria
    }
});
</script>



<template>
    <p class="dichiarazione">{{ props.dichiarazione }}</p>
</template>



<style scoped>
.dichiarazione {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
</style>