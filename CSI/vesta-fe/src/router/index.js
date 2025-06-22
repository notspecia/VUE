import { createRouter, createWebHistory } from 'vue-router'
import { globalRoutes } from './routes/global'; // importazione delle route globali

const routes = [...globalRoutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;