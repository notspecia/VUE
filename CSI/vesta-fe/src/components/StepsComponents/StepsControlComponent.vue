<script setup>
import { defineProps, defineEmits, inject } from 'vue';
import { goTopPage } from '@/services/utils';
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';

/* PROPS */
const props = defineProps({
    currentStep: {
        type: Number,
        required: true
    },
    isStepValid: {
        type: Boolean,
        required: true
    }
});


/* DATA */
const formData = inject('formData'); // prendiamo l'oggetto reactive formData dal padre


/* EMITS */
const emit = defineEmits(['changeStep', 'handleVisibilityModal']);


/* FUNZIONI emits verso StepsView */
const handleStepChange = (direction) => {
    emit('changeStep', direction);
    goTopPage();
};

const handleModalVisibility = () => {
    emit('handleVisibilityModal', true);
};
</script>



<template>
    <hr>
    <div class="d-flex py-2"
        :class="currentStep === 0 ? 'justify-content-center' : 'flex-column align-items-center justify-content-center flex-sm-row justify-content-sm-between'">
        <!-- bottone per tornare indietro al primo step viene nascosto -->
        <div v-if="currentStep > 0" class="text-primary px-5 py-2 go-back mb-4 mb-sm-0"
            @click="handleStepChange(false)">
            <BiIcon name="it-chevron-left" color="primary" size="sm" /> Indietro
        </div>
        <!-- bottone per andare avanti (dal 1 al 4 step) / bottone per inviare tutto l'oggetto formData (al 5 step) -->
        <button v-if="props.currentStep < 2" class="btn btn-primary px-5 py-2" @click="handleStepChange(true)"
            :disabled="!isStepValid">
            Avanti
            <BiIcon name="it-chevron-right" color="white" size="sm" />
        </button>
        <button v-else class="btn btn-primary px-5 py-2" @click="handleModalVisibility">
            Invia
            <BiIcon name="it-chevron-right" color="white" size="sm" />
        </button>
    </div>
</template>



<style scoped>
button,
div {
    font-size: 18px;
    font-weight: bold;
}

.go-back {
    cursor: pointer;
}
</style>