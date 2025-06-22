<script setup>
import { defineProps } from 'vue';
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';


/* PROPS */
const props = defineProps({
    currentStep: {
        type: Number,
        required: true,
    }
});


/* DATA */
const steps = [
    '01. Informativa privacy',
    '02. Inserimento dati',
    '03. Riepilogo'
];
</script>



<template>
    <div class="steppers mt-5 mb-4">
        <div class="steppers-header">
            <ul>
                <li v-for="(step, index) in steps" :key="index" :class="{
                    'confirmed': index < props.currentStep,
                    'active': index === props.currentStep
                }">
                    {{ step }}
                    <template v-if="index < props.currentStep">
                        <span class="visually-hidden">Confermato</span>
                    </template>
                    <template v-else-if="index === props.currentStep">
                        <span class="visually-hidden">Attivo</span>
                    </template>
                    <!-- aggiunta l'icona per gli step completati -->
                    <BiIcon v-if="index < props.currentStep" name="it-check-circle" color="success" size="md"
                        class="ms-3" />
                </li>
            </ul>
            <span class="steppers-index" aria-hidden="true">
                {{ props.currentStep + 1 }}/{{ steps.length }}
            </span>
        </div>
    </div>
</template>



<style scoped>
.active {
    background-color: #F2F7FC;
}
</style>
