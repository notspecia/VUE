<script setup>

/* importazione di:
- reactive(): per stabilire la variabile reattiva che sarà il nuovo job, riempito con v-model dagli input
- useToast(): per poter utilizzare i toast notification importati precedentemente ed usati .use(), nell'App
 */
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
// script contenente la fetch per la creazione del nuovo Job
import CreateJob from '@/api/CreateJob.api';


const toast = useToast(); // assegnamo il useToast() ad una varibile da utilizzare per mostrare a schermo i toast
const router = useRouter(); // assegnamo il useRouter() ad una varibile da utilizzare per renderizzare l'utente 


// creiamo una variabile reattiva tramite reactive(), contenente l'oggetto che verrà riempito dai form tramite il "v-model" associato alle proprietà!
const stateNewJob = reactive({
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
});


// event listener eseguito al submit del form (+ prevenzione del comportamento di default ossia reload della pagina)
const handleSubmit = async () => {

    // effetuiamo una POST verso il json-server locale per aggiungere il job appena creato tramite FORM
    try {
        await CreateJob(stateNewJob);

        // in caso di successo, aggiunto a schermo un toast che notifica il successo, + renderizziamo utente alla pagina dei jobs/
        toast.success("Job aggiunto con successo!");
        setTimeout(() => {
            router.push("/jobs");
        }, 2000);

    } catch (error) {
        console.log(error.message)
        toast.error("Errore nella creazione del nuovo job! riprova!"); // in caso di errore, aggiunto a schermo un toast che notifica l'errore
    }

}
</script>




<template>

    <div class="container">

        <!-- container contenente i campi form input, per la creazione di un nuovo JOB -->
        <div class="form-container">

            <!-- colleghiamo una funzione event listener, che scatta quando il form viene @submittato -->
            <form @submit.prevent="handleSubmit()">
                <h3 class="form-title">
                    Add Job
                    <i class="pi pi-plus" style="font-size: 1.3rem; margin: 0 10px;"></i>
                    <i class="pi pi-briefcase" style="font-size: 1.3rem;"></i>
                </h3>

                <div class="form-group">
                    <label for="title">Job Name</label>
                    <input type="text" id="title" name="title" placeholder="eg. front-end REACT developer"
                        v-model="stateNewJob.title" required />
                </div>

                <div class="form-group">
                    <label for="type">Job Type</label>
                    <select id="type" name="type" v-model="stateNewJob.type" required>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" placeholder="Company Location"
                        v-model="stateNewJob.location" required />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="4"
                        placeholder="Add any job duties, expectations, requirements, etc"
                        v-model="stateNewJob.description"></textarea>
                </div>


                <div class="form-group">
                    <label for="salary">Salary</label>
                    <select id="salary" name="salary" v-model="stateNewJob.salary" required>
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
                    <input id="image" name="image" placeholder="URL path of the image" v-model="stateNewJob.image"
                        required />
                </div>
                <hr>
                <!-- dati e informazioni della compagnia che offre il lavoro -->
                <h3 class="form-title-company">Company Info</h3>

                <div class="form-group">
                    <label for="company">Company Name</label>
                    <input type="text" id="company" name="company" placeholder="Company Name"
                        v-model="stateNewJob.company.name" required />
                </div>

                <div class="form-group">
                    <label for="companyDescription">Company Description</label>
                    <textarea id="companyDescription" name="companyDescription" rows="4"
                        placeholder="What does your company do?" v-model="stateNewJob.company.description"></textarea>
                </div>

                <div class="form-group">
                    <label for="contactEmail">Contact Email</label>
                    <input type="email" id="contactEmail" name="contactEmail" placeholder="Email address for applicants"
                        v-model="stateNewJob.company.contactEmail" required />
                </div>

                <div class="form-group">
                    <label for="contactPhone">Contact Phone</label>
                    <input type="tel" id="contactPhone" name="contactPhone" placeholder="Optional phone for applicants"
                        v-model="stateNewJob.company.contactPhone" />
                </div>

                <div class="form-submit">
                    <button type="submit">Add Job</button>
                </div>
            </form>
        </div>
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
</style>