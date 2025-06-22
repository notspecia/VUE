<script setup>
const requisiti = [
    'Codice fiscale del minore a cui intendi collegare la domanda',
    'Valore del tuo ISEE familiare',
    'Se sei affidatario, certificato di affidamento del minore'
]
</script>



<template>
    <h2 class="mb-4 pt-5">Cosa ti serve per completare la domanda</h2>
    <ol class="list-unstyled d-flex flex-column gap-4 position-relative text-primary">
        <li v-for="(item, index) in requisiti" :key="index" class="d-flex gap-4">
            <div class="d-flex align-items-center gap-2 container">
                <span class="number">{{ index + 1 }}</span>
                <span class="pallino"></span>
            </div>
            <div class="card">
                <div class="card-body p-3">
                    {{ item }}
                </div>
            </div>
        </li>
    </ol>
</template>



<style scoped>
h2 {
    font-size: 35px
}

ol::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 70px;
    /* posizione della linea */
    width: 2px;
    background-color: #003799;
}

.container {
    width: fit-content;
}

.number {
    font-size: 35px;
    font-weight: lighter;
}

.pallino {
    width: 10px;
    height: 10px;
    background-color: #0033A0;
    border-radius: 50%;
}

.card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 7px;
    background-color: #F0F5F8;
    border-radius: 3px 0 0 3px;
}
</style>
