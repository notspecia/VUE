  // funzione async, che effettua la fetch PUT per la modifica del job/:id passato come parametro dall view "EditJobView.vue"
  const UpdateJob = async (jobID, updatedJob) => {

    const response = await fetch(`http://localhost:3000/jobs/${jobID}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        // prendiamo l'updatedJob e lo convertiamo in JSON per mandarlo come body della PUT modifica di quest'ultimo 
        body: JSON.stringify(updatedJob)
    });

    if (!response.ok) {
        throw new Error("Errore nella modifica del job! riprova!");
    }

}


export default UpdateJob;