import { createRouter, createWebHistory } from 'vue-router'
import AssetPersonali from '../views/AssetPersonali.vue'
import FormView from '../views/FormView.vue'
import CategoryView from '../views/CategoryView.vue'
import RicercheEffettuate from '../views/RicercheEffettuate.vue'
import PercorsoGuidato from '@/views/PercorsoGuidato.vue'
import DettaglioTicket from '@/views/DettaglioTicket.vue'
import ServiceView from '@/views/ServiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PercorsoGuidato
    },
    {
      path: '/richieste-effettuate',
      name: 'RichiesteEffettuate',
      component: RicercheEffettuate
    },
    {
      path: '/richieste-effettuate/dettaglio/:id',
      name: 'DettaglioTicket',
      component: DettaglioTicket,
      props: true
    },
    {
      path: '/dotazioni-personali',
      name: 'DotazioniPersonali',
      component: AssetPersonali
    },
    {
      path: '/form/:id',
      name: 'form-detail',
      component: FormView,
      props: true
    },
    {
      path: '/category/:id',
      name: 'category-detail',
      component: CategoryView,
      props: true
    },
    {
      path: '/service/:id',
      name: 'service-detail',
      component: ServiceView,
      props: true
    }
  ]
})

export default router
