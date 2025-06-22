<script setup>

</script>



<template>
    <section class="container text-black">
        <!-- TITOLO, FUORI DALLA ROW PER MOBILE -->
        <h2 class="mb-5 dot-title d-block d-md-none">
            Cosa puoi fare prima del Click Day
        </h2>

        <div class="row">
            <!-- IMMAGINE -->
            <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <img src="@/assets/images/before-click-day-section.jpg"
                    alt="immagine sezione cosa fare prima del click day" class="img-fluid mb-5 mb-md-0" />
            </div>
            <!-- TESTO + TITOLO SOLO PER DESKTOP -->
            <div class="col-12 col-md-6">
                <h2 class="mb-4 dot-title d-none d-md-block">Cosa puoi fare prima del Click Day</h2>
                <ul class="d-flex flex-column gap-3">
                    <li>Recarti presso un CAF o collegarti al sito INPS per ottenere l’attestato <strong>ISEE</strong>
                    </li>
                    <li>Tenere a portata di mano il <strong>codice fiscale dei figli</strong> per cui presenterai le tue
                        domande</li>
                    <li>Procurarti le credenziali <strong>SPID</strong>, se ancora non ne sei munito.
                        <a href="#">Scopri come
                            <BiIcon color="primary" name="it-external-link" size="sm" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>



<style scoped lang="scss"></style>