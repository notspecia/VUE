//VALIDAZIONE MAIL 
export const validateEmail = (form, errors) => {
    const emailRegex = /^[\w+\-]+(\.[\w+\-]+)*@\w+([\.-]?\w+)*\.\w{2,4}$/;
    if (!emailRegex.test(form.email)) {
        errors.email = 'Per favore, inserisci un indirizzo email valido.';
    } else {
        errors.email = null;
    }
}

// VALIDAZIONE NUMERO DI TELEFONO (qui spostata la logica della regex da "oninput")
export const validatePhone = (form, errors) => {
    const phoneRegex = /^((\+|00)\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,5}$/;
    if (!phoneRegex.test(form.phone)) {
        errors.phone = 'Per favore, inserisci un numero di telefono valido.';
    } else {
        errors.phone = null;
    }
}

// VALIDAZIONE CODICE FISCALE (preso da un progetto vecchio da PB)
export const validateCF = (form, errors) => {
    form.codice_fiscale = form.codice_fiscale.toUpperCase();

    // lunghezza del codice fiscale
    if (form.codice_fiscale.length !== 16 && form.codice_fiscale.length !== 11) {
        errors.codice_fiscale =
            "La lunghezza del Codice Fiscale non è corretta: il Codice Fiscale dovrebbe essere lungo " +
            "16 caratteri (per le persone fisiche) oppure 11 caratteri (per le persone giuridiche).\n";
        return;
    }

    // validazione per codice fiscale di 16 caratteri
    if (form.codice_fiscale.length === 16) {
        const validi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 16; i++) {
            if (validi.indexOf(form.codice_fiscale.charAt(i)) === -1) {
                errors.codice_fiscale =
                    `Il codice fiscale contiene un carattere non valido '${form.codice_fiscale.charAt(i)}'.\n` +
                    "I caratteri validi sono solo lettere e numeri.\n";
                return;
            }
        }

        // Set per il calcolo del codice di controllo
        const set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";
        let s = 0;
        for (let i = 1; i <= 13; i += 2) {
            s += setpari.indexOf(set2.charAt(set1.indexOf(form.codice_fiscale.charAt(i))));
        }
        for (let i = 0; i <= 14; i += 2) {
            s += setdisp.indexOf(set2.charAt(set1.indexOf(form.codice_fiscale.charAt(i))));
        }
        if (s % 26 !== form.codice_fiscale.charCodeAt(15) - "A".charCodeAt(0)) {
            errors.codice_fiscale = "Il codice fiscale non è corretto: il codice di controllo non corrisponde.\n";
        }
    }

    // validazione per codice fiscale di 11 caratteri (solo numeri)
    if (form.codice_fiscale.length === 11) {
        if (!/^[0-9]{11}$/.test(form.codice_fiscale)) {
            errors.codice_fiscale = "Il codice fiscale può contenere solo numeri.\n";
            return;
        }

        let s = 0;
        for (let i = 0; i < 11; i++) {
            let n = form.codice_fiscale.charCodeAt(i) - "0".charCodeAt(0);
            if ((i & 1) === 1) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            s += n;
        }
        if (s % 10 !== 0) {
            errors.codice_fiscale = "Il codice fiscale non è corretto: il codice di controllo non corrisponde.\n";
        }
    }
};