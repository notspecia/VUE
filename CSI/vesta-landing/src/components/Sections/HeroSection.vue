<script setup>
import BiIcon from '@csi/design-system-bootstrap-italia/components/general/BiIcon.vue';

import FondoSociale from '../Common/FondoSocialeComponent.vue';
</script>



<template>
    <!-- sezione contenente content dell'header + sfondo su tutto il componente del PIEMONTE TU  -->
    <section class="hero-section ">
        <div class="container text-white">
            <!-- logo PIEMONTE TU fissato in alto a sinistra del componente -->
            <img src="@/assets/images/piemonte-tu-hero.png" alt="piemonte tu logo" class="logo-piemonte-tu" />
            <!-- contesto per meta schermo con brk > lg -->
            <div class="row">
                <div class="col-lg-6">
                    <h1 class="d-flex align-items-end gap-3 mb-4">
                        Buono VESTA <img src="@/assets/images/vesta-symbol.png" alt="logo VESTA" class="logo-vesta" />
                    </h1>
                    <h2 class="lead">
                        <strong>Il buono</strong> della Regione Piemonte per sostenere l’accesso a servizi
                        fondamentali<br />
                        <strong>per i bambini da 0 a 6 anni.</strong>
                        <a href="#" class="mt-4 d-block text-white text-decoration-underline">
                            Scopri di più
                            <BiIcon color="white" name="it-external-link" size="md" />
                        </a>
                    </h2>
                </div>
            </div>
            <!-- pulsante per scorrere alla sezione successiva -->
            <div class="w-100 d-flex justify-content-center mt-5">
                <button class="scroll-indicator" aria-label="Scorri alla sezione successiva">
                    <BiIcon color="danger" name="it-expand" size="md" />
                </button>
            </div>
        </div>
        <FondoSociale />
    </section>

</template>



<style scoped lang="scss">
// style alla section hero section (sfondo, altezza)
.hero-section {
    height: 100vh;
    padding: 0px;
    background: url('@/assets/images/hero-desktop.jpg') no-repeat center center;
    background-size: cover;

    @media screen and (max-width: 992px) {
        height: 80vh;
        background: url('@/assets/images/hero-mobile.jpg') no-repeat center center;
        background-size: cover;
    }

    // logo PIEMONTE TU interno al container 
    .logo-piemonte-tu {
        width: 138px;
        padding-top: 18px;
        margin-bottom: 7rem;
    }


    // titolo principale + icona VESTA
    h1 {
        font-size: 65px;

        // logo VESTA
        .logo-vesta {
            width: 72px;
        }
    }


    // titolo secondario
    h2.lead {
        font-size: 28px;
        line-height: 1.5;

        // link di approfondimento
        a {
            font-size: 20px;
        }

    }


    // pulsante per scorrere alla sezione successiva
    .scroll-indicator {
        background-color: rgba(255, 255, 255, 0.5);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.8);
        }
    }
}
</style>
