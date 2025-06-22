<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { stepsSummary } from '@/services/constants';
import DownloadRicevuta from '@/components/Shared/DownloadRicevutaComponent.vue';
import TimeLine from '@/components/Shared/TimelineComponent.vue';
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';


/* DATA */
const formData = inject('formData'); // prendiamo l'oggetto reactive formData dal padre
const router = useRouter();
const currentDate = new Date().toLocaleDateString('it-IT', { // ottenimento la data corrente e formattata
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});


/* FUNZIONI */
const handleRedirectAreaPersonale = () => {
    router.push('/');
};
</script>



<template>
    <div class="narrow-content">
        <h2 class="mt-3">
            <BiIcon name="it-check-circle" color="success" size="lg" />
            Richiesta inviata
        </h2>
        <p>Grazie, abbiamo ricevuto la tua richiesta per la pratica <strong>AN4059281 Bonus VESTA</strong></p>
        <p class="mt-5">
            Inviato il: <strong>{{ currentDate }}</strong> <br>
            Procedimento associato: <strong>2025/8336</strong>
        </p>
        <p class="mt-5">
            Abbiamo inviato il riepilogo all'email: <br>
            <strong>galileo.galilei@gmail.com</strong>
        </p>
        <DownloadRicevuta />
        <TimeLine :steps="stepsSummary" />
        <p class="mt-5 pt-5"><span class="link text-decoration-underline" @click="handleRedirectAreaPersonale">
                Consulta la richiesta</span> nella tua area riservata
        </p>
    </div>
</template>



<style scoped>
.narrow-content {
    max-width: 75%;
    margin: 0 auto 0;
}
</style>