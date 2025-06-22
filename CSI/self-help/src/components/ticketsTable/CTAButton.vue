<script setup>
import { defineProps, ref } from 'vue'
import SpinnerDefault from '@/components/spinner/SpinnerDefault.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    validator: (value) => ['small', 'large'].includes(value),
    default: 'small'
  }
})

const isLoading = ref(false)

// azione API per i buttons CTA
const doAction = async () => {
  isLoading.value = true

  try {
    await props.data.action();

  } finally {
    isLoading.value = false
  }
}
</script>


<template>
  <button class="btn cta-btn p-0" :class="`${data.icon} ${size}`" role="button" @click="doAction"
    :disabled="data.disabled">
    <!-- spinner attivato quando carica la modale dopo aver premuto uno dei buttons CTA azioni -->
    <SpinnerDefault v-if="isLoading" :size="24" />
    <svg v-else class="icon icon-sm">
      <use :xlink:href="$svgs.getSpriteSvgUrl(data.icon)"></use>
    </svg>
    <span>{{ data.label }}</span>
  </button>
</template>


<style scoped>
.cta-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.cta-btn svg {
  stroke-width: 1px;
  stroke: var(--bs-primary);
}

.cta-btn.it-warning-circle svg {
  stroke: var(--bs-danger);
}

.cta-btn span {
  color: black;
}

.cta-btn:hover span {
  color: var(--bs-primary) !important;
  text-decoration: underline;
}

.cta-btn.large {
  span {
    font-size: 18px;
  }

  svg {
    width: 32px;
    height: 32px;
  }
}

.cta-btn[disabled] {
  opacity: 0.3;
  cursor: not-allowed;
}


/* breakpoint per il ridimensionamento label dell'azione */
@media screen and (max-width: 1200px) {
  .cta-btn {
    font-size: 13px;
  }
}

@media screen and (max-width: 575px) {

  .cta-btn {
    font-size: 12px;
  }
}
</style>
