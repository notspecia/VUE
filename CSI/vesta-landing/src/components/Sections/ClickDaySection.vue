<script setup>

</script>



<template>
    <section class="container text-black">
        <!-- TITOLO, FUORI DALLA ROW PER MOBILE -->
        <h2 class="mb-5 dot-title d-block d-md-none">
            Il Click Day per presentare la domanda
        </h2>

        <div class="row">
            <!-- IMMAGINE -->
            <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <img src="@/assets/images/click-day-section.jpg" alt="immagine sezione cosa fare al click day"
                    class="img-fluid mb-5 mb-md-0" />
            </div>
            <!-- TESTO + TITOLO SOLO PER DESKTOP -->
            <div class="col-12 col-md-6">
                <h2 class="mb-5 dot-title d-none d-md-block">
                    Il Click Day per presentare la domanda
                </h2>
                <div class="d-flex flex-column gap-3">
                    <p>
                        A <span class="highlights">settembre 2025</span>, sarà istituito un Click Day in cui accedere a
                        questa pagina per compilare la domanda.
                    </p>
                    <p>La <strong>data del Click Day</strong> sarà comunicata in questa pagina.</p>
                    <p><span class="highlights">Le domande saranno accolte in ordine di arrivo!</span></p>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped lang="scss">
section {
    padding-top: 15rem;
}

h2+div {
    font-size: 24px;
}

div>p {
    font-size: inherit;
}
</style>