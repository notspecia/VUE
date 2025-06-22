<template>
  <div class="highlighted-label">
    <h1 class="label-text">
      <slot />
    </h1>
    <div class="highlight"></div>
  </div>
</template>

<style scoped>
.highlighted-label {
  display: inline-block;
  position: relative;
}

.label-text {
  font-weight: 700;
  font-size: 40px;
  position: relative;
  z-index: 2;
}

.highlight {
  position: absolute;
  left: 0;
  top: 48px;
  height: 6px;
  width: 52px;
  background-color: var(--accent);
}
</style>
