<script setup>
import { defineProps } from 'vue';
import Bialert from '@csi/design-system-bootstrap-italia/components/general/BiAlert.vue';


/* PROPS */
defineProps({
    alert: {
        type: Object,
        required: true,
    }
});
</script>



<!-- card alert resa riutilizzabile, passando un titolo contesto (tramite innerHTML) e link (facoltativo!) -->
<template>
    <Bialert is-dismissible animation class="my-4">
        <h4 class="alert-heading mb-4">{{ alert.title }}</h4>
        <p v-for="(description, index) in alert.descriptions" :key="index" v-html="description" />
        <p v-if="alert.link" class="link text-decoration-underline">{{ alert.link }}</p>
    </Bialert>
</template>



<style scoped></style>