<script setup>
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import TicketsTable from '@/components/ticketsTable/TicketsTable.vue'
import SectionLabel from '@/components/typography/sectionLabel/SectionLabel.vue'

const route = useRoute()

onBeforeRouteUpdate((to, from, next) => {
  next()
})
</script>

<template>
  <div class="ricerche-effettuate d-flex flex-column gap-5 w-100">
    <SectionLabel> Richieste effettuate </SectionLabel>
    <TicketsTable :key="route.fullPath" />
  </div>
</template>
