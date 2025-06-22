<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { alertHome, stepsHome } from '@/services/constants';
import { goTopPage } from '@/services/utils';
import AlertCard from '@/components/Shared/AlertCardComponent.vue';
import ListComunications from '@/components/HomeComponents/Communications/ListComunicationsComponent.vue';
import ListQuestions from '@/components/HomeComponents/Questions/ListQuestionsComponent.vue';
import Requirements from '@/components/HomeComponents/RequirementsComponent.vue';
import Timeline from '@/components/Shared/TimelineComponent.vue';
import ModalDelete from '@/components/Modals/ModalDeleteComponent.vue';


/* DATA */
const isModalVisible = ref(false); // tenere traccia se la modale di conferma per invio del formData è aperta o chiusa
const router = useRouter();


/* FUNZIONI */
const handleCreateRequest = () => {
    router.push('/steps');
    goTopPage();
};

// funzione per gestire la visiblità della modale dell'ultimo step3 (show === true||false)
const handleVisibilityModal = (show) => {
    isModalVisible.value = show;
};


/* ONMOUNTED */
onMounted(() => {
    goTopPage();
})
</script>



<template>

    <!-- modale che appare cliccando il bottone dentro la card COMUNICAZIONE per cancellare la richiesta -->
    <ModalDelete @handleVisibilityModal="handleVisibilityModal" v-model="isModalVisible" />

    <!-- hint card di avviso! -->
    <AlertCard :alert="alertHome" />

    <!-- contenitore ROW che contiene una sezione di card COMUNICAZIONE + sezione di card LE TUE RICHIESTE -->
    <div class="row mt-5">
        <!-- colonna tue richieste -->
        <ListQuestions @handleVisibilityModal="handleVisibilityModal" @handleCreateRequest="handleCreateRequest" />
        <!-- colonna Comunicazioni -->
        <ListComunications />
    </div>

    <!-- COmponente con lista dei requisti per effettuare il buono -->
    <Requirements />

    <!-- Timeline dei prossimi passi anche su HOME -->
    <Timeline :steps="stepsHome" />
</template>



<style scoped>
button {
    font-size: 17px;
}
</style>