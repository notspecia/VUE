  // funzione async, che effettua la fetch DELETE per la rimozione del job selezionato quando si apre il dettaglio di esso
  const DeleteJob = async (jobID) => {

    const response = await fetch(`http://localhost:3000/jobs/${jobID}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Errore tentativo delete del job! riprova!");
    }

}


export default DeleteJob;
  
  