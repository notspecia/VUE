<script setup>
// andiamo ad importare la funzione useRoute(), che permette di accedere ai parametri dell'URL (ci serve per prendere l'id del job selezionato)
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

// importiamo le API script per le chiamate GET (del job) PUT (modifica di quest'ultimo)
import GetJob from '@/api/GetJob.api';
import UpdateJob from '@/api/UpdateJob.api';


// assegnamo la route ad una variabile, che contiene i parametri  +  assegnamo ad una variabile lo useRouter() per renderizzare in pagine + toast per notifiche
const route = useRoute();
const router = useRouter();
const toast = useToast();

// assegnamo ad una variabile l'id della rotta (ci servirà per la GET del job selezionato)
const jobID = route.params.id;


//-------------------------------------


/* 
questo stato reattivo, contiene un oggetto{}, COLLEGATO AL FORM CON v-model, dove vengono modificate le proprietà tramite inputs
- inizialmente avrà come dati iniziali (che verranno mostrati anche sull'input) quelli del JOB preso tramite GET di quello che dobbiamo modificare
- questo stato reattivo, una volta submitato il form per la modifica,verrà fatta la PUT modificando quel job/:id, sostituendoli con quelli al suo interno
- una volta riempito o meno (FINITA CHIAMATA finally{}) andiamo a cambiare il booleano togliendo lo spinner di caricamento
*/
const stateForm = reactive({
    updatedJob: {
        title: "",
        type: "",
        location: "",
        description: "",
        salary: "",
        company: {
            name: "",
            description: "",
            contactEmail: "",
            contactPhone: "",
        },
        image: ""
    },
    isLoading: true
});


//------------------------------------------


// andiamo a caricare al montaggio del componente, tramite GET il job selezionato dall'utente da modificare
onMounted(async () => {
    try {
        const jobRes = await GetJob(jobID);

        // riempiano le proprietà dello stato reactive DEL FORM che è collegato al form tramite v-model, mostrando i dati gia esistenti del JOB
        Object.assign(stateForm.updatedJob, {
            title: jobRes.title || "",
            type: jobRes.type || "",
            location: jobRes.location || "",
            description: jobRes.description || "",
            salary: jobRes.salary || "",
            company: {
                name: jobRes.company.name || "",
                description: jobRes.company.description || "",
                contactEmail: jobRes.company.contactEmail || "",
                contactPhone: jobRes.company.contactPhone || "",
            },
            image: jobRes.image || ""
        });

    } catch (error) {
        console.log(error.message);
        router.push("/not-found"); // renderizziamo alla pagina 404 se la fetch GET del job fallisce tramite il router()

    } finally {
        stateForm.isLoading = false; // quando ha finito di caricare (sia TRY che CATCH), andiamo a rimuovere il loader
    }
});



// event listener eseguito al submit del form (+ prevenzione del comportamento di default ossia reload della pagina)
const handleSubmit = async () => {

    // effetuiamo una PUT verso il json-server locale per AGGIORNARE il job appena modificato tramite i dati del "stateForm.job"
    try {

        // creiamo una modale window per confermare la PUT modifica del job
        const confirmDelete = window.confirm(`Sei sicuro di voler modificare il JOB: ${stateForm.updatedJob.title}?`);

        // se è true andiamo a fare la FETCH PUT, successo mostra un toast positivo + renderizzamento alla View route del "job/:id"
        if (confirmDelete) {
            await UpdateJob(jobID, stateForm.updatedJob);
            toast.success("Job aggiornato con successo!");
            setTimeout(() => {
                router.push(`/jobs/${jobID}`);
            }, 2000);
        }

    } catch (error) {
        console.log(error.message)
        toast.error("Errore nell'aggiornamento del Job! riprova!"); // in caso di errore, aggiunto a schermo un toast che notifica l'errore
    }
}

</script>




<template>
    <!-- attendiamo che job e job.company (oggetto nestato) siano caricati correttamente! altrimenti mostriamo un loader! -->
    <div v-if="!stateForm.isLoading && stateForm.updatedJob && stateForm.updatedJob.company" class="container">

        <!-- container contenente i campi form input, per la creazione di un nuovo JOB -->
        <div class="form-container">

            <!-- colleghiamo una funzione event listener, che scatta quando il form viene @submittato -->
            <form @submit.prevent="handleSubmit()">
                <h3 class="form-title">
                    Edit Job
                    <i class="pi pi-pen-to-square" style="font-size: 1.3rem; margin: 0 10px;"></i>
                    <i class="pi pi-briefcase" style="font-size: 1.3rem;"></i>
                </h3>

                <div class="form-group">
                    <label for="title">Job Name</label>
                    <input type="text" id="title" name="title" placeholder="eg. front-end REACT developer"
                        v-model="stateForm.updatedJob.title" />
                </div>

                <div class="form-group">
                    <label for="type">Job Type</label>
                    <select id="type" name="type" v-model="stateForm.updatedJob.type">
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" placeholder="Company Location"
                        v-model="stateForm.updatedJob.location" />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="4"
                        placeholder="Add any job duties, expectations, requirements, etc"
                        v-model="stateForm.updatedJob.description"></textarea>
                </div>


                <div class="form-group">
                    <label for="salary">Salary</label>
                    <select id="salary" name="salary" v-model="stateForm.updatedJob.salary">
                        <option value="Under $50K">under $50K</option>
                        <option value="$50K - $60K">$50 - $60K</option>
                        <option value="$60K - $70K">$60 - $70K</option>
                        <option value="$70K - $80K">$70 - $80K</option>
                        <option value="$80K - $90K">$80 - $90K</option>
                        <option value="$90K - $100K">$90 - $100K</option>
                        <option value="$100K - $125K">$100 - $125K</option>
                        <option value="$125K - $150K">$125 - $150K</option>
                        <option value="$150K - $175K">$150 - $175K</option>
                        <option value="$175K - $200K">$175 - $200K</option>
                        <option value="Over $200K">Over $200K</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="image">Job Image</label>
                    <input id="image" name="image" placeholder="URL path of the image"
                        v-model="stateForm.updatedJob.image" />
                </div>
                <hr>
                <!-- dati e informazioni della compagnia che offre il lavoro -->
                <h3 class="form-title-company">Edit Company Info</h3>

                <div class="form-group">
                    <label for="company">Company Name</label>
                    <input type="text" id="company" name="company" placeholder="Company Name"
                        v-model="stateForm.updatedJob.company.name" />
                </div>

                <div class="form-group">
                    <label for="companyDescription">Company Description</label>
                    <textarea id="companyDescription" name="companyDescription" rows="4"
                        placeholder="What does your company do?"
                        v-model="stateForm.updatedJob.company.description"></textarea>
                </div>

                <div class="form-group">
                    <label for="contactEmail">Contact Email</label>
                    <input type="email" id="contactEmail" name="contactEmail" placeholder="Email address for applicants"
                        v-model="stateForm.updatedJob.company.contactEmail" />
                </div>

                <div class="form-group">
                    <label for="contactPhone">Contact Phone</label>
                    <input type="tel" id="contactPhone" name="contactPhone" placeholder="Optional phone for applicants"
                        v-model="stateForm.updatedJob.company.contactPhone" />
                </div>

                <div class="form-submit">
                    <button type="submit">Confirm Job Edits</button>
                </div>
            </form>
        </div>
    </div>


    <!-- inserito un loader nel caso in cui l'oggetto job{} non sia stato ancora scaricato correttamente -->
    <div v-else class="spinner">
        <i class="pi pi-spin pi-spinner"></i>
    </div>
</template>




<style scoped>
.container {
    max-width: 40%;
    margin: 130px auto;
    padding: 30px;
}

.form-container {
    background-color: whitesmoke;
    box-shadow: 3px 5px 10px 3px rgba(255, 255, 255, 0.2);
    padding: 30px;
    border-radius: 8px;

}

.form-container h3.form-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    font-weight: 600;
    font-family: var(--font-title);
    margin: 30px 0 50px;
}

.form-container h3.form-title-company {
    text-align: center;
    font-size: 26px;
    font-weight: 600;
    font-family: var(--font-title);
    margin: 40px 0;
}

hr {
    width: 100%;
    height: 2px;
    border: none;
    background: linear-gradient(90deg, rgb(0, 160, 0), black);
    margin: 20px auto;
}

.form-group {
    margin-bottom: 30px;
}

.form-group label {
    display: block;
    font-size: 16px;
    font-family: var(--font-title);
    margin-bottom: 6px;
}

input,
textarea,
select {
    width: 90%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: var(--font-text);
    background: #f9f9f9;
    transition: all 0.3s ease-in-out;
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border: 1px solid green;
}

/* tasto submit del form per l'aggiunta di uno jobs tramite il @submit del form */
.form-submit {
    display: flex;
    justify-content: center;
    margin-top: 80px;
}

.form-submit button {
    width: 60%;
    background-color: green;
    color: white;
    font-size: 18px;
    font-family: var(--font-subtitle);
    padding: 12px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in;
}

.form-submit button:hover {
    background-color: darkgreen;
}

/* style per l'icona di spinner, occuperà tutto lo schermo quando carica il job definito all'interno della route */
div.spinner {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>