<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  beforeNavigate: {
    type: Function,
    default: null
  }
})

const router = useRouter()

const handleClick = async () => {
  if (props.beforeNavigate) {
    const shouldNavigate = await props.beforeNavigate()
    if (!shouldNavigate) return
  }
  router.back()
}
</script>

<template>
  <div class="position-relative">
    <button @click="handleClick" class="back-button">
      <svg class="back-icon icon">
        <use :xlink:href="$svgs.getSpriteSvgUrl('it-chevron-left')"></use>
      </svg>
      <span>Indietro</span>
    </button>
  </div>
</template>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #0056b3;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  position: absolute;
  top: -54px;
  left: -9px;
}

.back-button span {
  font-size: 18px;
  font-weight: 600;
}

.back-icon {
  fill: #0056b3;
}

.back-button:focus {
  outline: none;
}
</style>
