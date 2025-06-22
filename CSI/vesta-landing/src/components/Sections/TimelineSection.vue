<script setup>
const steps = [
    { label: "Approvazione bando", completed: true },
    { label: "Raccolta domande", completed: true },
    { label: "Verifica ammissibilità domande", completed: true },
    { label: "Assegnazione buoni", completed: true },
    { label: "Caricamento spese", completed: false },
    { label: "Verifica correttezza delle spese", completed: false },
    { label: "Erogazione buoni", completed: false },
];
</script>



<template>
    <section>
        <div class="container">
            <h2 class="text-center pb-5">A che punto è il progetto</h2>
            <div class="d-flex flex-column flex-lg-row mt-5 gap-5 gap-lg-3">
                <div v-for="(step, index) in steps" :key="index"
                    class="d-flex flex-lg-column align-items-center text-center step">
                    <div :class="[
                        'circle mb-lg-4',
                        step.completed ? 'completed text-white' : 'bg-white border border-warning',
                    ]">
                        <span v-if="step.completed && index < 3" class="text-primary">✔</span>
                    </div>
                    <p class="step-label ">{{ step.label }}</p>

                    <!-- LINEA DI COLLEGAMENTO (non dopo l'ultimo) -->
                    <div v-if="index < steps.length - 1" class="connector-horizontal d-none d-lg-block"></div>
                    <div v-if="index < steps.length - 1" class="connector-vertical d-block d-lg-none"></div>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped lang="scss">
section {
    background-color: #FFFCEE;
}

// mettiamoli 1 layer z-index piu alto da mettere cosi sotto la linea che collega gli step
.step {
    position: relative;
    flex: 1;
    z-index: 1;
}

// style per il cerchio che rappresenta lo step singolo
.circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

.completed {
    background-color: #FFAE46;
}

.step-label {
    max-width: 100px;
    font-size: 16px;
    font-weight: 700;

    @media screen and (max-width: 991px) {
        text-align: start;
        max-width: 150px;
        margin-left: 20px;
    }
}
</style>