import { defineCustomElement } from 'vue'

import Tickets from './custom-elements/TicketsView.ce.vue'
import Faq from './custom-elements/KnowledgeBaseView.ce.vue'

const MyTickets = defineCustomElement(Tickets)
const MyFaq = defineCustomElement(Faq)

const register = () => {
  customElements.define('my-tickets', MyTickets)
  customElements.define('my-knowledge-base', MyFaq)
}
register()
