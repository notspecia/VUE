<script setup>
/* PROPS */
const props = defineProps({
  message: String
});

/* EMIT */
const emit = defineEmits(['hideToast']);

/* FUNZIONI */
const hideToast = () => {
  emit('hideToast');
};
</script>

<template>
  <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center"
    style="min-height: 200px;" @click="hideToast">
    <div class="crm-toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto ms-2">{{ props.message.title }}</strong>
        <small>{{ props.message.subtitle }}</small>
      </div>
      <div class="toast-body">
        <div class="alert" :class="'alert-' + props.message.type" role="alert">
          {{ props.message.text }}
        </div>
      </div>
    </div>
  </div>
</template>
