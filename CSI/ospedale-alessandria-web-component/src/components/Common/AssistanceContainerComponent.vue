<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    assistances: {
        type: Object,
        required: true
    }
});
</script>


<template>
    <div class="container-assistance">
        <div class="row">
            <div class="col">
                <p class="h5 mb-4">Non hai risolto il problema?</p>
                <a :href="props.assistances.blank.url" class="assistance" aria-label="Apri modulo per nuova richiesta">
                    <strong>Apri una richiesta</strong>
                </a>
                <span> oppure </span>
                <a :href="props.assistances.other.url" class="assistance" aria-label="Apri modulo per altra assistenza">
                    <strong>altro tipo di assistenza</strong>
                </a>
            </div>
        </div>
    </div>
</template>