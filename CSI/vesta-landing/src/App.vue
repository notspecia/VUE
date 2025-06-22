<script setup>
import AssistanceButton from './components/Common/AssistanceButton.vue';
import Hero from './components/Sections/HeroSection.vue';
import ClickDay from './components/Sections/ClickDaySection.vue';
import BonusVestaDescription from './components/Sections/BonusVestaDescriptionSection.vue';
import BeforeClickDay from './components/Sections/BeforeClickDaySection.vue';
import HowBonusWork from './components/Sections/HowBonusWorkSection.vue';
import Timeline from './components/Sections/TimelineSection.vue';
import PiemonteTu from './components/Sections/PiemonteTuSection.vue';
</script>



<template>
    <!-- bottone ? assistenza fixed sulla viewport -->
    <AssistanceButton />
    <!-- sezioni della landing page -->
    <Hero />
    <ClickDay />
    <BonusVestaDescription />
    <BeforeClickDay />
    <HowBonusWork />
    <Timeline />
    <PiemonteTu />
</template>



<style scoped lang="scss"></style>