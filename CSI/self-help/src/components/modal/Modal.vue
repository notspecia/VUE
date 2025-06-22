<script setup>
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
</script>


<template>
  <div v-if="modalStore.showModal" class="modal fade show d-block alert-modal" tabindex="-1" aria-modal="true"
    role="dialog" @click.self="modalStore.cancelAction">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <svg class="icon">
            <use :xlink:href="$svgs.getSpriteSvgUrl('it-info-circle')"></use>
          </svg>
          <h5 class="modal-title">{{ modalStore.modalTitle }}</h5>
          <button type="button" class="btn-close" @click="modalStore.cancelAction"></button>
        </div>
        <div class="modal-body">
          <p>{{ modalStore.modalMessage }}</p>
        </div>
        <div class="modal-footer">
          <button v-if="modalStore.onCancel" type="button" class="btn btn-outline-primary"
            @click="modalStore.cancelAction">
            Annulla
          </button>
          <button type="button" class="btn btn-primary" @click="modalStore.confirmAction">
            Conferma
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}


.modal {
  overflow: auto;
  scrollbar-width: none;
}

.modal::-webkit-scrollbar {
  display: none;
}
</style>
