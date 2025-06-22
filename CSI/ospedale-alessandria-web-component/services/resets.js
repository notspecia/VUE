// ### NUOVA: permette di resettare dei campiForm specificando la loro chiave passando un array (eg: ["firstName", "birthdate"])
export const resetFields = (form, fields) => {
    fields.forEach((field) => {
        form[field] = "";
    });
}

// permette di resettare: errori / campiForm, o anche solo errore singolo
export const resetErrors = (object, field) => {
    if (field) {
        object[field] = null;
    } else {
        Object.keys(object).forEach(key => {
            object[key] = null;
        });
    }
};