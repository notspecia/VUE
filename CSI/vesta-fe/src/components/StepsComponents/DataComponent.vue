<script setup>
import { defineProps } from 'vue';

/* PROPS */
const props = defineProps({
    title: {
        type: String,
        required: true, // Il titolo è obbligatorio
    },
    value: {
        type: String,
        required: true, // Il valore è obbligatorio
    },
});
</script>



<template>
    <p class="data-title">{{ props.title }}</p>
    <p class="data-value">{{ props.value }}</p>
    <hr>
</template>



<style scoped>
p {
    font-size: 16px;
    line-height: 20px;
}


.data-value {
    font-weight: bold;
}
</style>