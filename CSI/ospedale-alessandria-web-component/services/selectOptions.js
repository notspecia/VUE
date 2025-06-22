// utilizzati per riempire la select della tipologia segnalazione con opzioni statiche
export const TIPOLOGIA_SEGNLAZIONE = [
    { id: 'Elogi', name: 'Elogi' },
    { id: 'Percorso di tutela', name: 'Percorso di tutela' },
    { id: 'Reclami', name: 'Reclami' },
    { id: 'Richiesta di informazioni', name: 'Richiesta di informazioni' },
    { id: 'Segnalazioni', name: 'Segnalazioni' }
];

// utilizzati per riempire la select della l'ente a cui si sta facendo (se stesso, o altri) con opzioni statiche
export const AUTORE_CONTATTO = [
    { id: 'Altro', name: 'Altro' },
    { id: 'Famigliare', name: 'Famigliare' },
    { id: 'Interessato', name: 'Interessato' },
    { id: 'Legale', name: 'Legale' }
];

// ### VALORI STATO DELLE RICHIESTE
// const TICKET_STATE = {
//     1: "Nuovo",
//     2: "Preso in carico",
//     3: "In lavorazione",
//     4: "Chiuso",
//     5: "Unita",
//     6: "Rimossa",
//     7: "In chiusura",
//     8: "Risolto",
//     9: "In attesa di risposta utente",
//     10: "In attesa di attività esterna"
// }