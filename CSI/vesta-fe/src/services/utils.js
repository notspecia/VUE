/**
 * setFields
 * evocata ogni volta che un campo negli steps, va a fondere i values (valori scelti dall'utente) dentro il formData (oggetto padre)
 * @param {object} formData - oggetto originale con tutti i dati degli steps
 * @param {object} values - values che modificano l'oggetto originale cambiandoli con essi
 */
export const setFields = (formData, values) => {
    Object.keys(values).forEach((field) => {
        formData[field] = values[field];
    });
}


/**
 * goTopPage
 * scrolla la pagina fino in cima
 */
export const goTopPage = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}