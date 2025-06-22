<script setup>
import { apiInstanceJson as apiInstance } from '@/util/api'
import { isLocalDev } from '@/util/utils'
import { ref, onMounted } from 'vue'

const user = ref(undefined)

const getLogoutUrl = () => {
  const baseUrl = '/api/public/user/logout'
  return isLocalDev() ? `http://localhost:8080${baseUrl}` : baseUrl
}

const fetchUserData = async () => {
  const response = await apiInstance.Get('/api/public/user').send()

  if (response.code) {
    return
  }

  user.value = await response
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="user-info-container">
    <!-- Stato non loggato -->
    <div v-if="!user">
      <button class="btn user-info">
        <!-- Testo visibile solo su dispositivi desktop/tablet -->
        <span class="d-none d-md-inline">Accedi all'area personale</span>
        <div class="avatar-icon">
          <svg class="icon icon-sm">
            <use :xlink:href="$svgs.getSpriteSvgUrl('it-user')"></use>
          </svg>
        </div>
      </button>
    </div>
    <!-- Stato loggato -->
    <div v-else>
      <div class="dropdown text-center">
        <button
          type="button"
          class="btn dropdown-toggle btn-dropdown btn-icon p-2"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="d-none d-md-inline pe-2 text-white">{{ user.name }} {{ user.surname }}</span>
          <span class="rounded-icon">
            <svg class="icon icon-success">
              <use :xlink:href="$svgs.getSpriteSvgUrl('it-user')"></use>
            </svg>
          </span>
        </button>
        <div class="dropdown-menu">
          <div class="link-list-wrapper">
            <ul class="link-list">
              <li class="d-block d-md-none">
                <span class="dropdown-item list-item fw-bold"
                  >{{ user.name }} {{ user.surname }}</span
                >
              </li>
              <li v-if="user.boEnabled">
                <a class="dropdown-item list-item" href="/admin"><span>Backoffice</span></a>
              </li>
              <li>
                <a class="dropdown-item list-item" :href="getLogoutUrl()"><span>Logout</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="dropdown">
        <button
          class="btn user-info dropdown-toggle btn-dropdown"
          type="button"
          id="dropdownMenuAvatar"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="d-none d-md-inline">{{ user.name }} {{ user.surname }}</span>
          <div class="avatar-icon">
            <svg class="icon icon-sm">
              <use :xlink:href="$svgs.getSpriteSvgUrl('it-user')"></use>
            </svg>
          </div>
        </button>
        <div class="dropdown-menu">
          <div class="link-list-wrapper">
            <ul
              class="link-list"
              aria-labelledby="dropdownMenuAvatar"
              data-popper-placement="bottom-center"
            >
              <li class="d-block d-md-none dropdown-item list-item fw-bold">
                {{ user.name }} {{ user.surname }}
              </li>
              <li v-if="user.boEnabled">
                <a class="dropdown-item list-item" href="/admin">Backoffice</a>
              </li>
              <li>
                <a class="dropdown-item list-item" :href="getLogoutUrl()">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  font-size: 0.9rem;
  margin-top: 8px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .dropdown-menu {
    inset: -19px auto auto 0px !important;
  }
}
</style>
