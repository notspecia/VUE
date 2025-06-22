<script setup>
import ContentContainer from '@/components/contentContainer/ContentContainer.vue'
import GoBack from '@/components/goBack/GoBack.vue'
import SectionLabel from '@/components/typography/sectionLabel/SectionLabel.vue'
import TicketDetails from '@/components/ticketDetails/TicketDetails.vue'

const props = defineProps({
  id: String
})
</script>

<template>
  <div class="d-flex flex-column gap-1 w-100">
    <div class="d-flex flex-column">
      <GoBack />
      <SectionLabel> Dettaglio ticket </SectionLabel>
    </div>
    <TicketDetails :id="id" />
  </div>
</template>
