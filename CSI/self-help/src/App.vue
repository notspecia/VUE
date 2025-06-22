<script setup>
import { RouterView } from 'vue-router'

import TopBar from '@/components/layout/TopBar.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import Modal from '@/components/modal/Modal.vue'
</script>

<template>
  <header>
    <TopBar />
  </header>

  <main>
    <div class="container">
      <RouterView />
      <Modal />
    </div>
  </main>

  <FooterComponent />
</template>

<style scoped>
main {
  padding: 3rem 0;
}
</style>
