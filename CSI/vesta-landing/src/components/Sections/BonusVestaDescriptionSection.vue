<script setup>
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';
</script>



<template>
    <section class="container text-black">

        <!-- TITOLO, FUORI DALLA ROW PER MOBILE -->
        <h2 class="mb-5 dot-title d-block d-md-none">
            Cos’è il Buono VESTA
        </h2>

        <div class="row">
            <!-- IMMAGINE - MOBILE SOTTO TITOLO / DESKTOP A SINISTRA -->
            <div class="col-12 col-md-6 d-flex justify-content-center align-items-start g-md-5 order-1 order-md-2">
                <img src="@/assets/images/descrizione-bonus-section.jpg" alt="immagine sezione descrizione bonus vesta"
                    class="img-fluid mb-5 mb-md-0" />
            </div>
            <!-- TESTO - MOBILE DOPO IMMAGINE / DESKTOP A DESTRA  -->
            <div class="col-12 col-md-6 order-md-1 order-1">
                <h2 class="mb-5 dot-title d-none d-md-block">Cos’è il Buono VESTA</h2>
                <h3>
                    Il Buono Vesta è un nuovo voucher introdotto nel 2025 dalla Regione Piemonte per sostenere le
                    famiglie con <span class="highlights">figli di età compresa tra 0 e 6 anni.</span>
                </h3>
                <p class="mt-4">
                    L'iniziativa, promossa dall'Assessorato regionale alle Famiglie, prevede l’impiego di <strong>34
                        milioni di euro</strong>, provenienti dal Fondo Sociale Europeo (Fse), suddivisi sul
                    <strong>triennio 2025-2027.</strong>
                    Il buono può essere richiesto dal genitore o affidatario, e assegna un importo graduale:
                </p>
                <ul class="d-flex flex-column gap-2">
                    <li>
                        <span class="text-danger">1.200 euro</span> per le famiglie con <strong>Isee inferiore a
                            10.000;</strong>
                    </li>
                    <li>
                        <span class="text-danger">1.000 euro </span>per le famiglie con <strong>Isee tra 10.000 e 35.000
                            euro;</strong>
                    </li>
                    <li>
                        <span class="text-danger">800 euro</span>per le famiglie con <strong>Isee tra 35.000 e 40.000
                            euro.</strong>
                    </li>
                </ul>
                <p>
                    Nel caso di minori con disabilità <span class="text-danger">1.200 euro</span> con <strong>isee
                        inferiore a 40.000 euro</strong>
                </p>
                <!-- accordion card -->
                <div class="accordion" id="accordionBonusExplanation">
                    <div class="card mb-4">
                        <div class="card-body">
                            <p class="card-title">
                                <button class="fw-bold accordion-button collapsed px-0 py-0" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseBonusExplanation"
                                    aria-expanded="false" aria-controls="collapseBonusExplanation"
                                    style="font-size: inherit;">
                                    Per quali spese potrà essere utilizzato il buono
                                </button>
                            </p>
                            <div class="card-text">
                                <!-- Contenuto visibile quando l'accordion è aperto -->
                                <div id="collapseBonusExplanation" class="accordion-collapse collapse mt-3"
                                    data-bs-parent="#accordionBonusExplanation">
                                    <p> Potrà essere utilizzato per <strong>nido d'infanzia, micronido, sezioni
                                            primavera, nido
                                            in
                                            famiglia, spazio gioco per bambini, centro per bambini e famiglie, scuole
                                            per
                                            l’infanzia e servizi di assistenza scolastica correlati</strong> (iscrizione
                                        e frequenza,
                                        pre, post orario, mensa), scuola primaria e servizi di assistenza correlati
                                        (iscrizione e frequenza, pre, post orario, mensa);<strong> centri vacanza
                                            estivi/invernali,
                                            baby-sitting</strong> presso il domicilio della persona richiedente,
                                        iscrizione e
                                        frequenza a
                                        diverse attività (ginnastica, psicomotricità, nuoto e acquaticità, danza,
                                        massaggio
                                        infantile/espressione corporea, avvicinamento all’apprendimento di una lingua
                                        straniera).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>
                    Per maggiori informazioni,
                    <a href="#"> visualizza il bando
                        <BiIcon color="primary" name="it-external-link" size="sm" />
                    </a>
                </p>
            </div>
        </div>
    </section>
</template>



<style scoped lang="scss">
// rimozione bordo in basso alle card di accordion
div.accordion {
    border-left: 4px solid red;
    border-bottom: none !important;
}

// notifiche nuove domande e comunicazioni
.new {
    font-size: 10px;
    padding: 4px;
}

span {
    font-weight: bold;
}
</style>