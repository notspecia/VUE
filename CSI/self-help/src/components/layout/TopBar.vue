<script setup>
import { useRouter } from 'vue-router'
import { apiInstanceJson as apiInstance } from '@/util/api.js'

import UserInfo from '@/components/userInfo/UserInfo.vue'
import CsiLogo from '../icons/CsiLogo.vue'
import FormsSearch from '@/components/formSearch/FormsSearch.vue'
import Navigation from '@/components/navigation/Navigation.vue'
import MyDisplayApiData from '../MyDisplayApiData/MyDisplayApiData.vue'

const router = useRouter()

const apis = {
  form: {
    apiInstance,
    apiUrl: `/api/forms/search`
  }
}

const isMobile = () => {
  return window.innerWidth < 768
}

const goHome = () => {
  router.push({ path: '/' })
}
</script>


<template>
  <div class="top-bar title">
    <div class="container">
      <!-- Layout Mobile -->
      <template v-if="isMobile()">
        <div class="top-bar-title mobile-layout">
          <CsiLogo class="top-bar-logo" />
          <div class="user-info-wrapper">
            <slot></slot>
            <UserInfo />
          </div>
        </div>
      </template>

      <!-- Layout Desktop -->
      <template v-else>
        <div class="top-bar-title">
          <div class="home-btn" role="button" tabindex="0" @click="goHome()" @keydown.enter="goHome()"
            @keydown.space="goHome()" aria-label="Torna alla Home">
            <CsiLogo class="top-bar-logo" />
          </div>
          <slot></slot>
          <slot name="subtitle"></slot>
          <UserInfo />
        </div>
      </template>

      <!-- Header della navbar (presente sia su dispositivi Desktop che Mobile), search bar + navigazione delle rotte links -->
      <header class="header">
        <MyDisplayApiData :apis="apis">
          <template v-slot="{ data: { form } }">
            <FormsSearch :searchItem="form" />
          </template>
          <!-- passiamo come loader lo scheletro di caricamento di bootstrap che sovvrascrive il loader di default (spinner)  -->
          <template #loading>
            <div class="search-skeleton" aria-hidden="true">
              <div class="w-100 placeholder-glow">
                <span class="placeholder w-100"></span>
              </div>
            </div>
          </template>
        </MyDisplayApiData>
        <Navigation />
      </header>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.top-bar {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.title {
    font-weight: bold;
    padding: 0.6rem $default-horizontal-padding 0;
    font-size: 1.1rem;
    background: linear-gradient(to right, #1844a8, #007bd4);
    color: $topbar-contrast-color;
  }

  .top-bar-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .top-bar-logo {
    height: 2rem;
    margin-right: 0.7rem;
  }

  .user-info-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &.subtitle {
    font-weight: bold;
    padding: 1rem $default-horizontal-padding;
    font-size: 1.3rem;
    background-color: $topbar-subtitle-background-color;
    color: $topbar-subtitle-contrast-color;
  }
}

.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0 0 0;
  gap: 36px;
  color: white;
}

.header>div {
  width: 100%;
  display: flex;
  justify-content: center;
}

// proprietà per rendere responsive TopBar per i dispositivi mobili
@media (max-width: 768px) {
  .top-bar-title {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .top-bar-logo {
    height: 1.2rem;
  }

  .top-bar {
    &.title {
      font-size: 1rem;
      padding: 0.4rem 1rem 0;
      text-align: center;
    }
  }

  .user-info-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 0.5rem;
  }

  .header {
    width: 100%;
    padding: 1rem 0 0 0;
  }

  .mobile-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.search-skeleton {
  border-radius: var(--round);
  position: relative;
  width: auto;
  min-width: 35%;
  height: 51px;
  overflow: hidden;
}

.search-skeleton>div>span {
  height: 51px;
}
</style>
