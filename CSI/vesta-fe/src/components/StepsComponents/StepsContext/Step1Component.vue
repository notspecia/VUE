<script setup>
import { defineEmits, inject, onMounted, watchEffect } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import BiCheckbox from '@csi/design-system-bootstrap-italia/components/forms/BiCheckbox.vue';


/* DATA */
const formData = inject('formData'); // prendiamo l'oggetto reactive formData dal padre


/* EMITS */
const emit = defineEmits(['update:isValid']); // emit per cambiare il booleano se è valido o no lo step tramite v-model+emit


/* VEEVALIDATE SCHEMAS */
// definisci lo schema di validazione da effettuare yup + messaggio di errors per quel campo
const schema = yup.object({
    privacy_accetata: yup.boolean().oneOf([true], 'Devi accettare la privacy'),
});

// crea il form con lo schema con veevalidate, specifichiamo l'oggetto da validare con yup in attesa che sia valido + specifichiamo valori iniziali da settare o da prendere dal formData
const { values, setFieldValue, errors, meta } = useForm({
    validationSchema: schema,
    initialValues: {
        privacy_accetata: formData.privacy_accetata || false,
    },
});


/* FUNZIONI */
// aggiorna tramite veevalidate passando il CAMPO + VALORE, all'@onChange del componente input
const handleChange = (field, value) => {
    setFieldValue(field, value);
};


/* WATCH */
// aggiorna formData reattivamente ogni volta che cambiano i value dei campi definiti nello schema
watchEffect(() => {
    formData.privacy_accetata = values.privacy_accetata;
    emit('update:isValid', meta.value.valid); // quando la validazione è corretta, emit verso il padre
});


/* ONMOUNT COMPONENTE */
onMounted(() => {
    emit('update:isValid', meta.value.valid); // settiamo al montaggio blocco AVANTI nello step
});

</script>



<template>
    <div class="px-5 py-5">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero, est porro quaerat hic aliquid ex
            sit
            ducimus ratione, dolores iste vero! Itaque, totam error veritatis ab quibusdam fuga voluptatem?
            Repellat eaque quasi illum? Dignissimos suscipit, consectetur repellat reprehenderit eligendi accusantium
            molestias incidunt omnis labore placeat eius neque soluta inventore veniam cupiditate quo aperiam ex? Quod
            similique enim consequuntur minima.
            Consequuntur exercitationem facere, qui cumque aspernatur labore sed quas debitis. Explicabo repellendus
            saepe
            aliquid ut reprehenderit fugiat doloremque dignissimos quisquam ex at sint, nobis amet magni, quam fugit
            nesciunt fuga.</p>
        <div>
            <BiCheckbox id="check-privacy" label="Ho preso visione dell’informativa sulla privacy"
                :check="values.privacy_accetata" @onChange="val => handleChange('privacy_accetata', val)" />
            <p v-if="errors.privacy_accetata" class="text-danger">{{ errors.privacy_accetata }}</p>
        </div>
    </div>
</template>



<style scoped></style>