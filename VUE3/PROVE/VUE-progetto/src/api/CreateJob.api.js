  // funzione async, che effettua la fetch POST per la creazione e aggiunta del job passato come parametro dall view "AddJobsView.vue"
const CreateJob = async (newJob) => {

    const response = await fetch(`http://localhost:3000/jobs/`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // prendiamo gli argomenti il newJob e li convertiamo in JSON per mandarlo come body della POST 
        body: JSON.stringify(newJob)
    });

    if (!response.ok) {
        throw new Error("Errore nella creazione del nuovo job! riprova!");
    }

}


export default CreateJob;
  
  