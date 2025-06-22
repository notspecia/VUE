<script setup>
import { defineProps, defineEmits } from 'vue';

/* PROPS */
const props = defineProps({
  modalObject: {
    type: Object,
    required: true
  }
});

/* EMIT */
const emit = defineEmits(['showModal']);

/* FUNZIONI */
const closeModal = () => {
  emit('showModal', 'privacy', false);
};
</script>

<template>
  <div class="modal-overlay" @click="closeModal" :id="props.modalObject.id" aria-hidden="false">
    <div class="modal-content" @click.stop tabindex="-1" role="dialog" aria-labelledby="modalTitle"
      aria-describedby="modalBody" aria-modal="true">
      <div class="modal-header">
        <h2 id="modalTitle" class="modal-title">{{ props.modalObject.title }}</h2>
        <button class="close-button" aria-label="Chiudi modale" @click="closeModal" ref="closeButton">
          <svg class="iconSvg" aria-hidden="true">
            <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-close.svg"></image>
          </svg>
        </button>
      </div>
      <div id="modalBody" class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-primary mt-3" @click="closeModal" aria-label="Chiudi modale">
          Chiudi
        </button>
      </div>
    </div>
  </div>
</template>
