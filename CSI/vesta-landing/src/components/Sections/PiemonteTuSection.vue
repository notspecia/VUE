<script setup>
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';

</script>



<template>
    <section>
        <div class="container">
            <div class=" row">
                <!-- SEZIONE DESCRIZIONE PIEMONTE TU -->
                <div class="col-12 col-md-8">
                    <!-- logo PIEMONTE TU 2 -->
                    <img src="@/assets/images/piemonte-tu-footer.png" alt="piemonte tu logo" class="mb-4 img-fluid" />
                    <p>Questo è un servizio di <strong>PiemonteTu</strong>, la tua area personale in cui puoi:</p>
                    <ul class="d-flex flex-column gap-2">
                        <li>Accedere ai <strong>servizi digitali</strong> della Regione Piemonte</li>
                        <li>Conservare in archivio tutta la tua <strong>documentazione</strong></li>
                        <li>
                            Essere aggiornato sulle <strong>scadenze</strong> e <strong>sull’avanzamento</strong> delle
                            pratiche
                        </li>
                        <li>Gestire nel tuo profilo <strong>contatti e preferenze di notifica</strong></li>
                    </ul>
                    <a href="#"> Vai a PiemonteTU
                        <BiIcon color="primary" name="it-external-link" size="sm" />
                    </a>
                </div>
                <!-- 2 DESCRIZIONE SERVIZI-ONLINE -->
                <div class="col-12 col-md-4">
                    <p>CIAO</p>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped lang="scss">
section {
    background-color: #EEF9FF;
}

// punti lista custom per questa sezione
li::marker {
    color: #0E40AF;
}
</style>