

// funzione API esportata verso i componenti VIEW per recuperare i jobs da json-server tramite GET
const GetJobs = async () => {

    const response = await fetch("http://localhost:3000/jobs",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Errore nel recupero degli jobs. Riprova più tardi.");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    return response.json();
}


export default GetJobs;