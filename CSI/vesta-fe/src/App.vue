<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Shared/HeaderComponent.vue';
</script>

<template>
  <main class="container my-5">
    <Header />
    <RouterView />
  </main>
</template>
