<script setup>
import { inject } from 'vue';
import { alertModalDelete } from '@/services/constants';
import BiModal from '@csi/design-system-bootstrap-italia/components/general/BiModal.vue';
import AlertCard from '@/components/Shared/AlertCardComponent.vue';


/* DATA */
const formData = inject('formData'); // prendiamo l'oggetto reactive formData dal padre


/* EMITS */
const emit = defineEmits(['handleVisibilityModal']);


/* FUNZIONI */
// event emitter per gestire la visibilità del modal 
const handleModalVisibility = (show) => {
    emit('handleVisibilityModal', show);
};

</script>



<template>
    <BiModal id="modalContacts" size="lg" fade centered>
        <!-- HEADER -->
        <template #header="{ idTitle }">
            <h4 class="modal-title" :id="idTitle">Rinuncia alla domanda</h4>
        </template>

        <!-- BODY -->
        <template #body>
            <AlertCard :alert="alertModalDelete" />
        </template>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-outline-primary" @click="handleModalVisibility(false)">Annulla</button>
            <button type="button" class="btn btn-danger" @click="handleModalVisibility(false)">Si, rinuncio</button>
        </template>
    </BiModal>
</template>



<style scoped></style>