/**
 * SPDX-License-Identifier: EUPL-1.2
 * Copyright CSI Piemonte - 2025
 */

// ----------array di values da inserire nei campi del design system SELECT----------
export const iseeValuesProva = [
    20000,
    25000,
    30000,
    35000,
    40000
];

export const titoliStudioProva = [
    'Diploma',
    'Laurea',
    'Master'
];

export const occupazioniProva = [
    'Lavoratore dipendente',
    'Lavoratore autonomo',
    'Disoccupato',
    'Studente',
    'Pensionato'
];


// ----------oggetti da inserire all'interno del componente AlertCard----------
export const alertHome = {
    title: 'Attenzione',
    descriptions: [
        'Si ricorda che ogni domanda di Bonus è valida per un solo minore. <hr>',
        'Se si è genitore o affidatario di più minori, <strong>è necessario inviare una domanda per ogni minore </strong>',
    ],
    link: 'Visualizza il bando',
};

export const alertStepThree = {
    title: 'Attenzione',
    descriptions: [
        '<strong>Verifica con cura</strong> tutti i dati inseriti. <hr>',
        'Una volta inviata, la domanda non potrà più essere modificata: <strong>in caso di errori, bisognerà annullare la domanda e crearne una nuova.</strong>',
    ]
};

export const alertModalContacts = {
    title: 'Attenzione',
    descriptions: [
        'La tua domanda è stata inviata <hr>',
        'Inserisci i tuoi contatti per <strong>ricevere tutti gli aggiornamenti via email e SMS</strong>',
    ]
};

export const alertModalDelete = {
    title: 'Attenzione',
    descriptions: [
        'Sei sicuro di voler rinunciare alla domanda?'
    ]
}


// ----------array contenente i dati degli steps da visualizzare nel componente Stepper----------
export const stepsHome = [
    {
        date: '12 maggio 2025',
        title: 'Valutazione ammissibilità',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br>sed do eiusmod tempor<br>incididunt ut labore et dolore magna aliqua.',
    },
    {
        date: '15 giugno 2025',
        title: 'Apertura fase di rendicontazione delle spese',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br>sed do eiusmod tempor<br>incididunt ut labore et dolore magna aliqua.',
    }
];

export const stepsSummary = [
    {
        date: '12 giugno 2025',
        title: 'Apertura fase di rendicontazione delle spese',
        description: 'Donec sed odio dui.<br>sed do eiusmod tempor<br>Aenean lacinia bibendum<br>nulla sed consectetur',
    }
];