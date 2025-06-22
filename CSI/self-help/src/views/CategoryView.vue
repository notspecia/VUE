<script setup>
import { defineProps } from 'vue'
import { apiInstanceJson as apiInstance } from '@/util/api.js'

import CardsRenderer from '@/components/card/CardsRenderer.vue'
import GoBack from '@/components/goBack/GoBack.vue'
import SectionLabel from '@/components/typography/sectionLabel/SectionLabel.vue'
import MyDisplayApiData from '@/components/MyDisplayApiData/MyDisplayApiData.vue'

const props = defineProps({
  id: String
})

const apis = {
  category: {
    apiInstance,
    apiUrl: `/api/category/${props.id}`
  },
  form: {
    apiInstance,
    apiUrl: `/api/public/forms`
  }
}
</script>

<template>
  <div class="h-100 w-100">
    <MyDisplayApiData :apis="apis">
      <template v-slot="{ data: { category } }">
        <GoBack />
        <SectionLabel>
          {{ category.name }}
        </SectionLabel>
        <div v-html="category.description" class="styled-description my-4"></div>
        <div class="w-100">
          <CardsRenderer
            :data="
              category.servizi
                .filter((item) => item.forms.length)
                .map((item) => ({
                  title: item.title,
                  description: item.description,
                  id: item.forms.length > 1 ? item.id : item.forms[0] || null,
                  forms: item.forms
                }))
            "
            :itemKey="'services'"
            :baseHref="'form'"
          />
        </div>
      </template>
    </MyDisplayApiData>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #326cb4, #213366);
  padding: 36px 0 36px 0;
  color: white;
}

.search-container {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-complete {
  width: 100%;
}
</style>
