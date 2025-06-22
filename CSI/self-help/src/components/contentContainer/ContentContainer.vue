<template>
  <div class="styled-container">
    <slot />
  </div>
</template>

<style scoped>
.styled-container {
  background: white;
  border-radius: var(--round);
  width: 100%;
  padding: 1.5rem 2.5rem;
  box-shadow: 1px 2px 8px #c4c4c4;
  overflow: hidden;
}

@media (max-width: 768px) {
  .styled-container {
    padding: 1rem;
    width: 100%;
  }
}
</style>
