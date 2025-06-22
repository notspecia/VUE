<script setup>
import { useRouter } from 'vue-router';
import DownloadRicevuta from '@/components/Shared/DownloadRicevutaComponent.vue';
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';


/* ROUTER DATA */
const router = useRouter();


/* EMITS */
const emit = defineEmits(['handleVisibilityModal', 'handleCreateRequest']);


/* FUNZIONI emits verso HomeView */
const handleVisibilityModal = () => {
    emit('handleVisibilityModal', true);
};

const handleCreateRequest = () => {
    emit('handleCreateRequest');
};


/*FUNZIONI */
// funzione per andare alla rotta di dettaglio della domanda
const handleGoToDetails = () => {
    router.push(`/question/3`);
};
</script>


<template>

    <div class="col-12 col-md-8 mb-4">

        <!-- titolo sezione delle domande -->
        <h2 class="d-flex align-items-center mb-4">
            <BiIcon name="it-files" class="me-2" size="lg" />
            Le tue domande
            <span class="new badge rounded-pill bg-danger ms-2">2</span>
        </h2>

        <!-- card contenente tutte le richieste/domande dell'utente DA CICLARE! -->
        <div class="card mb-5">
            <div class="card-body">
                <h5 class="card-title d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary go-detail" @click="handleGoToDetails">
                        <BiIcon color="primary" name="it-clip" class="me-2" />Domanda Bonus Vesta per
                        Alberto Galilei
                    </span>
                    <span class="text-success">
                        <BiIcon color="success" name="bi bi-send" class="me-2" />Inviata
                    </span>
                </h5>
                <div class="card-text">
                    <p>
                        Inviato il: <strong>04/05/2025</strong><br>
                        Procedimento associato: <strong>2025/8336</strong>
                    </p>
                    <div class="d-flex justify-content-start mt-3">
                        <DownloadRicevuta />
                        <button class="btn btn-outline-danger px-3 ms-3" @click="handleVisibilityModal">
                            <BiIcon name="it-delete" color="danger" class="me-2" />
                            RINUNCIA ALLA DOMANDA
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- bottone che porta alla rotta step/ per aggiungere una nuova richiesta -->
        <div class="d-flex justify-content-end align-items-center">
            <button class="btn btn-primary w-50  py-3" @click="handleCreateRequest">AGGIUNGI DOMANDA</button>
        </div>
    </div>

</template>



<style scoped>
h5.card-title {
    font-weight: normal !important;

}

.go-detail {
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>