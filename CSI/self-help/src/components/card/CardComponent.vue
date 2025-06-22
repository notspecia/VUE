<script setup>
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  linkLabel: {
    type: String,
    default: 'Esplora'
  },
  baseHref: {
    type: String,
    default: 'category'
  }
})
</script>

<template>
  <RouterLink class="card card-body d-flex flex-column justify-content-between text-decoration-none"
    :to="`/${props.baseHref}/${props.id}`">
    <div class="d-flex flex-column flex-grow-1">
      <div class="title-section">
        <h2 class="card-title text-primary custom-h2">{{ props.title }}</h2>
      </div>
      <div class="card-secondary styled-description" v-html="props.description"></div>
    </div>
    <div class="d-flex justify-content-end align-items-center mt-auto">
      <svg class="search-icon icon icon-sm">
        <use :xlink:href="$svgs.getSpriteSvgUrl('it-arrow-right')"></use>
      </svg>
    </div>
    <div class="active-indicator"></div>
  </RouterLink>
</template>

<style scoped>
.card {
  width: 100%;
  /* alzata un pochino la height per evitare uscita di testo dalla card! */
  height: 380px;
  border-radius: var(--round);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.card-body {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-section {
  flex-grow: 0;
}

.description-section {
  flex-grow: 1;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: var(--accent);
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  transform: scaleY(0);
}

.card:hover .active-indicator {
  opacity: 1;
  transform: scaleY(1);
}

.card:hover {
  opacity: 1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.card:hover .card-title {
  text-decoration: underline;
}

.card:hover .search-icon {
  background-color: var(--accent);
}

.card:hover .card-indicator {
  background-color: var(--accent);
}

.custom-h2 {
  font-size: var(--bs-font-size-lg);
  line-height: var(--bs-line-height-sm);
  margin-bottom: 20px
}

.card:after {
  margin-top: 0;
}
</style>
