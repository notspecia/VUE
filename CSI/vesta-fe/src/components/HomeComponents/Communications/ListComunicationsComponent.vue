<script setup>
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';
</script>


<template>
    <div class="col-12 col-md-4 mb-4">
        <h2 class="d-flex align-items-center mb-4">
            <BiIcon name="it-mail" class="me-2" size="lg" />
            Comunicazioni
            <span class="new badge rounded-pill bg-danger ms-2">2</span>
        </h2>
        <div class="accordion" id="accordionComunications">
            <div class="card mb-5">
                <div class="card-body">
                    <p class="card-title mb-3">
                        <button
                            class="text-secondary accordion-button collapsed px-0 py-0 shadow-none bg-transparent border-0"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseCommunication"
                            aria-expanded="false" aria-controls="collapseCommunication" style="font-size: inherit;">
                            13/02/2025
                        </button>
                    </p>
                    <div class="card-text">
                        <!-- contenuto della card sempre visibile -->
                        <p class="text-primary d-flex mb-3">
                            <BiIcon name="it-mail" class="me-2" />
                            <span>Richiesta Inviata</span>
                        </p>
                        <p>
                            è disponibile un nuovo referto
                        </p>

                        <!-- Contenuto visibile quando l'accordion è aperto -->
                        <div id="collapseCommunication" class="accordion-collapse collapse"
                            data-bs-parent="#accordionComunications">
                            <button class="btn btn-outline-primary px-5 py-3">Elimina</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>



<style scoped></style>