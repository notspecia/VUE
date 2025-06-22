<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navLinks = [
  { name: 'Percorsi guidati', path: '/' },
  { name: 'Richieste effettuate', path: '/richieste-effettuate' },
  { name: 'Dotazioni personali', path: '/dotazioni-personali' }
]

const navigateTo = (path) => {
  router.push(path)
}

const isActive = (linkPath) => {
  if (linkPath === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(linkPath)
}
</script>

<template>
  <nav class="container navigation-container" role="tablist" aria-label="menu">
    <div class="nav-links">
      <button v-for="(link, index) in navLinks" :key="index" class="nav-link" :class="{ active: isActive(link.path) }"
        @click="navigateTo(link.path)" role="tab" :aria-selected="isActive(link.path)" @keydown.right @keydown.left>
        {{ link.name }}
        <div class="active-indicator" :class="{ 'show-indicator': isActive(link.path) }"></div>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navigation-container {
  width: 100%;
}

.nav-links {
  display: flex;
  justify-content: space-around;
}

.nav-link {
  width: 80%;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: unset;
  color: #d6d6d6;
  cursor: pointer;
  padding-top: 6px;
}

.nav-link.active {
  color: white;
}

.nav-link:hover {
  color: white;
  background-color: #2f7cca;
}

.active-indicator {
  width: 100%;
  height: 6px;
  background-color: var(--accent);
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-link:hover .active-indicator,
.show-indicator {
  opacity: 1;
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 1rem;
    white-space: normal;
  }
}

@media (min-width: 375px) and (max-width: 465px) {
  .nav-link {
    font-size: 1rem;
  }
}
</style>
