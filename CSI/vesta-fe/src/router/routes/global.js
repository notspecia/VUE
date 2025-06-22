/**
 * SPDX-License-Identifier: EUPL-1.2
 * Copyright CSI Piemonte - 2025
 */

const HOME = {
  path: '/',
  name: 'home',
  component: () => import('@/views/HomeView.vue'),
}

const STEPS = {
  path: '/steps',
  name: 'steps',
  component: () => import('@/views/StepsView.vue'),
}

const QUESTION_DETAILS = {
  path: '/question/:id',
  name: 'question-detail',
  component: () => import('@/views/QuestionDetailsView.vue'),
}


// raggruppamento delle route in array da ciclare in index.js
export const globalRoutes = [HOME, STEPS, QUESTION_DETAILS]