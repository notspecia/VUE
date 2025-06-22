<template>
  <div class="carousel-container">
    <div class="it-carousel-wrapper splide" data-bs-carousel-splide>
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide" v-for="(message, index) in messages" :key="index">
            <p v-html="message"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const messages = ref([
  "Il servizio <strong>Self Help</strong> è momentaneamente sospeso per un problema tecnico. Stiamo lavorando per risolvere il problema e ci dispiace per l'inconveniente.",
  'Attenzione! Lorem ipsum dolor sit amet, consectetur adipiscing elit'
])
</script>

<style scoped>
.custom-btn {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.text-element {
  width: 100%;
}

.it-carousel-wrapper :global(.splide__arrow--prev) {
  background: inherit;
  transform: rotate(180deg);
  margin-left: -55px;
  z-index: 100;
}

.it-carousel-wrapper :global(.splide__arrow--next) {
  margin-right: -55px;
  z-index: 100;
}

.it-carousel-wrapper :global(.splide__arrows) {
  position: absolute;
  width: 100%;
  top: calc((100% / 2) - 20px);
  display: flex;
  justify-content: space-between;
}

.it-carousel-wrapper :global(.splide__slide) {
  margin-left: 1px;
  margin-right: 1px;
}

.carousel-container {
  position: relative;
  padding-left: 55px;
  padding-right: 55px;
  background-color: #f0f0f0;
  overflow: hidden;
}

.it-carousel-wrapper :global(.splide__arrow) {
  width: 40px;
  height: 40px;
  background: #06c;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
}

.it-carousel-wrapper :global(.splide__arrow:disabled) {
  background-color: #cccccc;
  cursor: not-allowed;
}

.it-carousel-wrapper :global(.splide__arrow > svg) {
  fill: white;
}
</style>
