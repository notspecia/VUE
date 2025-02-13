

// funzione API esportata verso i componenti VIEW per recuperare il job da json-server tramite GET
const GetJob = async (jobID) => {

    const response = await fetch(`http://localhost:3000/jobs/${jobID}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Errore nel recupero del. Riprova più tardi.");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    return response.json();
}


export default GetJob;