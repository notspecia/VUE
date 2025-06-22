<script setup>
import CardsRenderer from '@/components/card/CardsRenderer.vue'
import { apiInstanceJson as apiInstance } from '@/util/api.js'
import MyDisplayApiData from '@/components/MyDisplayApiData/MyDisplayApiData.vue'
import SectionLabel from '@/components/typography/sectionLabel/SectionLabel.vue'

const apis = {
  category: {
    apiInstance,
    apiUrl: `/api/category/all`,
    filterFunction: (data) => {
      return data.map((item) => ({
        id: item.id,
        title: item.name,
        description: item.description
      }))
    }
  }
}
</script>

<template>
  <div class="w-100 d-flex flex-column gap-5 w-100">
    <SectionLabel> Percorsi Guidati </SectionLabel>
    <MyDisplayApiData :apis="apis">
      <template v-slot="{ data: { category } }">
        <div>
          <CardsRenderer :data="category" :itemKey="'categories'" />
        </div>
      </template>
    </MyDisplayApiData>
  </div>
</template>
