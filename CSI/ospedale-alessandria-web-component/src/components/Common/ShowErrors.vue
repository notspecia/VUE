<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    errors: {
        type: Object,
        required: true
    }
});
</script>


<template>
    <!-- ### TODO REVIEW CON DANIEL PER ACCESSIBILTA DEGLI ERRORS! -->
    <div v-for="(error, index) in props.errors" role="alert">
        <div v-if="error" class="alert alert-danger" tabindex="-1" :key="index">
            <strong>- {{ error }}</strong>
        </div>
    </div>
</template>