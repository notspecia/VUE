import { defineStore } from 'pinia'
import { scrollOnFireFox } from '@/util/utils'

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    modalTitle: '',
    modalMessage: '',
    modalErrors: [],
    onConfirm: null,
    onCancel: null
  }),
  actions: {
    openModal({ title, message, errors = [], onConfirm = null, onCancel = null }) {
      this.modalTitle = title
      this.modalMessage = message
      this.modalErrors = errors
      this.onConfirm = onConfirm
      this.onCancel = onCancel
      this.showModal = true

      // check per fix problema modale firefox versioni <= 128
      scrollOnFireFox();
      return new Promise((resolve) => {
        this.resolvePromise = resolve
      })
    },
    closeModal() {
      this.showModal = false
      this.modalTitle = ''
      this.modalMessage = ''
      this.modalErrors = []
      this.resolvePromise = null
      this.onConfirm = null
      this.onCancel = null
    },
    confirmAction() {
      if (this.onConfirm) {
        this.onConfirm()
      }

      this.resolvePromise(true)

      this.closeModal()
    },
    cancelAction() {
      if (this.onCancel) {
        this.onCancel()
      }

      this.resolvePromise(false)

      this.closeModal()
    }
  }
});