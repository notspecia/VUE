<script setup>
import { defineProps } from 'vue';

defineProps({
    job: {
        type: Object,
        required: true
    }
})
</script>




<template>
    <div class="card">
        <h3 class="job-title">{{ job.title }}</h3>
        <p class="job-location">Location: {{ job.location }}</p>
        <p class="job-type">Type: {{ job.type }}</p>
        <p class="job-salary">Salary: {{ job.salary }} </p>
        <p class="job-description">{{ job.description }}</p>
        <button class="read-more">Read more</button>
        <div class="company-info">
            <p class="company-name">Company: {{ job.company.name }} </p>
            <p class="company-description">{{ job.company.description }}</p>
            <p class="contact-email">Contact Email: {{ job.company.contactEmail }} </p>
            <p class="contact-phone">Contact Phone: {{ job.company.contactPhone }} </p>
        </div>
    </div>
</template>




<style scoped>
.card {
    background-color: rgb(233, 255, 246);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.job-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.job-location,
.job-type,
.job-salary {
    font-size: 1rem;
    color: #555;
}

.job-description {
    font-size: 1rem;
    color: #333;
}

.company-info {
    font-size: 0.9rem;
    color: #555;
}

.company-name {
    font-weight: bold;
}

button.read-more {
    background-color: green;
    color: white;
    border: 2px solid white;
    padding: 10px 30px;
}
</style>