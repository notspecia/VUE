<script setup>
import { defineProps } from 'vue';

/* PROPS */
const props = defineProps({
  backLinkObj: Object,
  links: Array,
  basicLink: String
});

/* EMIT */
const emit = defineEmits(['updateUrl']);

/* DATA */
const fullPathname = window.location.pathname;
const pathNameWithoutLastPage = import.meta.env.VITE_ENV =='localhost'? fullPathname.substring(0, fullPathname.lastIndexOf('/')) : window.location.origin


/* FUNZIONI */
const updateUrl = (id) => {
  emit('updateUrl', id);
};

const goHome = () => {
  window.location.href = window.location.origin;
};
</script>

<template>
  <div id="breadcrumbs">
    <div class="row">
      <div class="col-12">
        <nav aria-label="Percorso di navigazione" class="breadcrumb-container">
          <ol class="breadcrumb" data-element="breadcrumb">

            <li class="breadcrumb-item">
              <span role="link" tabindex="0" class="breadcrumb-link" aria-label="Torna alla home" @click="goHome"
                @keydown.enter.space="goHome">
                <svg xmlns="http://www.w3.org/2000/svg" height="17px" width="18px" viewBox="0 0 306.773 306.773"
                  aria-hidden="true" style="margin-top: -5px;">
                  <path
                    d="M302.93,149.794c5.561-6.116,5.024-15.49-1.199-20.932L164.63,8.898 c-6.223-5.442-16.2-5.328-22.292,0.257L4.771,135.258c-6.092,5.585-6.391,14.947-0.662,20.902l3.449,3.592 c5.722,5.955,14.971,6.665,20.645,1.581l10.281-9.207v134.792c0,8.27,6.701,14.965,14.965,14.965h53.624 c8.264,0,14.965-6.695,14.965-14.965v-94.3h68.398v94.3c-0.119,8.264,5.794,14.959,14.058,14.959h56.828 c8.264,0,14.965-6.695,14.965-14.965V154.024c0,0,2.84,2.488,6.343,5.567c3.497,3.073,10.842,0.609,16.403-5.513L302.93,149.794z"
                    style="fill: rgb(1, 0, 2);"></path>
                </svg>
                <span aria-hidden="true" class="separator">/</span>
              </span>
            </li>

            <li class="breadcrumb-item" v-if="props.backLinkObj">
              <a :href="`${pathNameWithoutLastPage}/${props.backLinkObj.link}`"
                :aria-label="'Torna a '+ props.backLinkObj.name" class="breadcrumb-link">
                {{ props.backLinkObj.name }}
              </a>
              <span aria-hidden="true" class="separator">/</span>
            </li>

            <li class="breadcrumb-item">
              <span role="link" tabindex="0" class="breadcrumb-link" aria-label="Vai al collegamento principale"
                @click="updateUrl(null)" @keydown.enter.space="updateUrl(null)">
                {{ props.basicLink }}
              </span>
            </li>

            <li v-for="(link, index) in props.links" :key="link.id" class="breadcrumb-item">
              <span aria-hidden="true" class="separator">/</span>
              <span role="link" tabindex="0" class="breadcrumb-link" :aria-label="`Vai a ${link.name}`"
                @click="index !== props.links.length - 1 ? updateUrl(link.id) : null"
                @keydown.enter.space="index !== props.links.length - 1 ? updateUrl(link.id) : null"
                :aria-current="index === props.links.length - 1 ? 'page' : null">
                {{ link.name }}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>
