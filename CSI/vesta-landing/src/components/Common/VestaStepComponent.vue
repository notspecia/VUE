<script setup>
import { defineProps } from 'vue'


defineProps({
    step: { type: Object, required: true }
})
</script>



<template>
    <!-- SVG CONTENENTE IL CERCHIO STATICO E I PATHS PER FORMARE IL LOGO -->
    <svg width="158" height="158" viewBox="0 0 158 158" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
            <!-- Cerchio giallo (fisso) per tutte le icone svg -->
            <path
                d="M85.3139 6.37183C92.2817 6.98055 99.621 7.81263 99.0125 14.7803C98.4039 21.748 91.0948 20.5637 84.1352 19.8677C54.3126 16.8846 22.9453 37.909 19.6442 75.7058C17.4346 101.006 36.4748 133.602 71.9337 137.971C101.155 141.572 135.002 120.948 138.072 84.1644C138.654 77.1944 139.258 71.5845 146.226 72.1932C153.193 72.8019 152.207 78.3785 151.599 85.3462C148.085 125.584 112.341 155.409 72.0621 151.579C32.585 147.825 3.14962 112.754 6.2969 73.2233C9.50741 32.8891 45.0784 2.85679 85.3139 6.37183Z"
                fill="#FFAE46" />
            <!-- Pahts dinamici per comporre le icone SVG -->
            <path v-for="(d, index) in step.pathsSVG" :key="index" :d="d" fill="#1844A8" fill-rule="evenodd"
                clip-rule="evenodd" />
        </g>
    </svg>

    <!-- titolo + descrizione sotto icona -->
    <h3>{{ step.title }}</h3>
    <p v-html="step.description"></p>
</template>



<style scoped lang="scss">
h3 {
    font-weight: bold;
}

p {
    font-size: 16px;
}
</style>