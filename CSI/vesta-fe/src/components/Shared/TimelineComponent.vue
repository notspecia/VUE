<script setup>
import BiTimeline from '@csi/design-system-bootstrap-italia/components/general/BiTimeline.vue';
import BiTimelineItem from '@csi/design-system-bootstrap-italia/components/general/BiTimelineItem.vue';


/* PROPS */
defineProps({
  steps: {
    type: Array,
    required: true,
  }
});
</script>



<template>
  <!-- ===== timeline “Prossimi passi” ===== DINAMICO con stringhe e innerHTML, ciclando tutti gli steps della timeline oggetti -->
  <h2 class="my-5 pt-5">Prossimi passi</h2>
  <BiTimeline>
    <BiTimelineItem v-for="(step, index) in steps" :key="index" :title="step.date" heading-type="h3" is-past>
      <h5>{{ step.title }}</h5>
      <p class="card-text" v-html="step.description" />
    </BiTimelineItem>
  </BiTimeline>
</template>



<style scoped>
h2 {
  font-size: 35px
}
</style>
