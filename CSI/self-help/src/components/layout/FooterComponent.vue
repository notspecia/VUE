<script setup>
import CsiLogo from '../icons/CsiLogo.vue'
</script>

<template>
  <footer>
    <div class="footer title">
      <div class="footer-section-wrapper">
        <div class="footer-title">
          <CsiLogo class="footer-logo" />
        </div>
      </div>
    </div>

    <div class="footer body">
      <div class="footer-section-wrapper">
        <div class="footer-body">Nuovo self-help</div>
        <div class="version">Versione: v1.1.5</div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.title {
    font-weight: bold;
    padding: 0.6rem $default-horizontal-padding;
    font-size: 1.1rem;
    background-color: $footer-primary-background-color;
    color: $footer-primary-contrast-color;
  }

  .footer-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .footer-logo {
    height: 2rem;
    margin-right: 0.7rem;
  }

  &.body {
    font-weight: bold;
    padding: 1rem $default-horizontal-padding;
    font-size: 1.3rem;
    background-color: $footer-secondary-background-color;
    color: $footer-secondary-contrast-color;
  }

  .version {
    font-size: 0.8rem;
    font-weight: 500;
  }
}

.footer-section-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: $page-horizontal-size;
  max-width: 100%;
}
</style>
