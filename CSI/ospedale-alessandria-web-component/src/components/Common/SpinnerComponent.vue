<template>
  <div class="spinner">
    <span class="visually-hidden">Caricamento...</span>
  </div>
</template>

<style scoped>
.spinner {
  width: 15em;
  height: 15em;
  border-radius: 100%;
  margin: 10px auto;
  border: 1.1em solid rgba(211, 211, 211, 0.8);
  /* Light gray color */
  border-left-color: var(--spinner-general-border-color, #0d6efd);
  -webkit-animation: load 1.1s infinite linear;
  /* Chrome, Safari, Opera */
  animation: load 1.1s infinite linear;
}

.spinner span {
  width: 0px;
  height: 0px;
  color: transparent;
}

@-webkit-keyframes load {
  0% {
    -ms-transform: rotate(7deg);
    /* IE 9 */
    -webkit-transform: rotate(7deg);
    /* Chrome, Safari, Opera */
    transform: rotate(7deg);
  }

  100% {
    -ms-transform: rotate(360deg);
    /* IE 9 */
    -webkit-transform: rotate(360deg);
    /* Chrome, Safari, Opera */
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    -ms-transform: rotate(7deg);
    /* IE 9 */
    -webkit-transform: rotate(7deg);
    /* Chrome, Safari, Opera */
    transform: rotate(7deg);
  }

  100% {
    -ms-transform: rotate(360deg);
    /* IE 9 */
    -webkit-transform: rotate(360deg);
    /* Chrome, Safari, Opera */
    transform: rotate(360deg);
  }
}
</style>