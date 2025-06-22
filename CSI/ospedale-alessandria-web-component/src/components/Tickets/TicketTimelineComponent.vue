<script setup>
import { defineProps } from 'vue';
import { formatDate, getApiMangerPath } from '../../../services/utils';
/* PROPS */
const props = defineProps({
  ticket: Object,
  ticketArticles: Array,
  id: Number,
});

/* METODI */
async function downloadAttachment(ticketId, articleId, attachmentId, filename) {
  const url = `${getApiMangerPath()}/tickets/${ticketId}/articles/${articleId}/attachments/${attachmentId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Errore durante il download');
    }
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Errore:', error);
  }
}
</script>

<template>
  <div v-if="props.ticket" aria-labelledby="ticket-title">
    <div class="row w-100">
      <div class="col-md-10 col-12">
        <h3 id="ticket-title">Richiesta assistenza n° {{ id }}</h3>
        <p>Descrizione: <b>{{ props.ticket.title }}</b></p>
        <p>Stato: <b>{{ props.ticket.state }}</b></p>
      </div>
    </div>
  </div>
  <div class="it-timeline-wrapper container-scrollable" v-if="props.ticketArticles.length > 0">
    <div class="row">
      <div class="col-12" v-for="article in props.ticketArticles" :key="article.id">
        <div class="timeline-element" role="group" :aria-labelledby="`article-title-${article.id}`">
          <div class="it-pin-wrapper it-evidence">
            <div class="pin-icon" aria-hidden="true">
              <svg class="iconSvg" aria-hidden="true">
                <image href="https://cdn.portali.csi.it/bootstrap-italia/2.13.3/default/icons/it-code-circle.svg">
                </image>
              </svg>
            </div>
            <div class="pin-text">
              <span>
                {{ formatDate(article.created_at, 'dd/MM/yyyy') }}
                {{ formatDate(article.created_at, 'HH:mm') }}
              </span>
            </div>
          </div>
          <div class="card-wrapper">
            <div class="card">
              <div class="card-body p-0">
                <h5 :id="`article-title-${article.id}`" class="card-title mb-1"
                  :aria-label="`Articolo da ${article.from}`">
                  {{ article.from.toUpperCase() }}
                </h5>
                <p class="card-text" v-html="article.body"></p>
                <div class="it-list-wrapper" v-if="props.ticket" aria-labelledby="attachments-title-{{ article.id }}">
                  <h6 id="attachments-title-{{ article.id }}" class="sr-only">
                    Allegati per l'articolo
                  </h6>
                  <ul class="it-list" v-for="attachment in article.attachments" :key="attachment.id">
                    <li>
                      <a href="javascript:void(0)"
                        @click="downloadAttachment(props.ticket.id, article.id, attachment.id, attachment.filename)"
                        :aria-label="`Scarica allegato ${attachment.filename}`" class="btn btn-primary-outlined">
                        <span class="text">Scarica {{ attachment.filename }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
