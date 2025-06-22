<script setup>

import { defineProps } from 'vue';

// oggetto contenente le props di map colori dei label delle tabelle in "Tickets.vue / AssetsTable.vue"
const props = defineProps({
    label: {
        type: String,
    },
    colors: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <span class="status-label" :class="`bg-${props.colors[props.label] || 'primary'}`">
        {{ props.label }}
    </span>
</template>

<style scoped>
td.stato span.status-label {
    width: fit-content;
    color: white;
}
</style>