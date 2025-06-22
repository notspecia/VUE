<script setup>
</script>

<template>
    <div class="position-fixed bottom-0 end-0 me-3 mb-5">
        <div class="d-flex flex-column align-items-center">
            <button class="assistance" aria-label="Richiesta assistenza">
                <a class="text-light text-decoration-none" href="#">?</a>
            </button>
            <span class="tooltip-label">Hai bisogno di assistenza?</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
// bottone di assistenza starà sopra all'ettichetta
.assistance {
    z-index: 2;
    width: 50px;
    height: 50px;
    background-color: #D7272A;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #861c1d;
    }

    a {
        font-size: 24px;
        font-weight: bold;
    }

}

// SHOW DELL'ETTICHETTA solo quando il bottone è in hover
.assistance:hover+.tooltip-label {
    opacity: 1;
    transform: translateX(0);
}

.tooltip-label {
    opacity: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    right: 30px;
    height: 45px;
    background-color: #fdfdfd;
    color: #000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    padding: 0 30px;
    border-top-left-radius: 10px;
    transform: translateX(10px);
    transition: opacity 0.02s ease, transform 0.5s ease;
}
</style>
