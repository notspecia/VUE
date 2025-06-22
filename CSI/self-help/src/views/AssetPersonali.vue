<script setup>
import AssetsTable from '@/components/assetsTable/AssetsTable.vue'
import SectionLabel from '@/components/typography/sectionLabel/SectionLabel.vue'
</script>

<template>
  <div class="ricerche-effettuate d-flex flex-column gap-5 w-100">
    <SectionLabel>
      {{ 'Dotazioni personali' }}
    </SectionLabel>
    <AssetsTable />
  </div>
</template>
