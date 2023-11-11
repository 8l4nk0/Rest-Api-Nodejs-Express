//stiamo simulando una rest API per una clinica dove ogni paziente
//viene alla reception e chiede una copia della cartella clinica.
//Per richiederla deve prima fornire i suoi dati come nome, cognome, numero di telefono
//e tipologia di azione, ossia:
// - richiedere cartella clinica (GET)
// - registrarsi come nuovo paziente (POST)
// - aggiornare la cartella clinica (UPDATE/PUT)
// - cancellare la cartella clinica (DELETE)
//La rest API poi confronta i dati forniti(nome, congnome, id) con la cartella clinica ed agisce in base
//all'azione richiesta dal paziente nel caso di confronto positivo

const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json());

//solitamente dovremmo avere un database con tutti i pazienti
//creiamo soltanto due pazienti per testare la nostra API...
let patients = new Object();
patients["1234"] = ["John", "Smith", "234-345-5555"]
patients["5678"] = ["Shadow", "Garden", "134-345-5555"]


// ... e la loro rispettiva cartella clinica
let records = new Object();

records["1234"] = "Status: In Salute";
records["5678"] = "Status: Raffreddore";



//ogni volta che facciamo richiesta(GET) di localhost:3000/records riceviamo il msg
app.get("/records", (req,res) => { 

    //verifica che il paziente esiste confrontando l'id fornito con gli id presenti nel nostro pseudo-database


    //con postman.com possiamo impostare sia gli headers sia il body
    //immaginiamo di impostare negli headers:
    //
    // key = nome, value = John
    // key = cognome, value = Smith
    // key = id, value = 1234
    // key = tel, value = 234-345-5555
    //
    // e impostiamo nel body in formato JSON:
    //
    //{"azionePaziente": "cartellaClinica"}


    if (records[req.headers.id] === undefined) {
        res.status(404).send({"msg": "Patient not found"})
        return;

    }


    //verifica che ID fornito corrisponda al nome e cognome fornito
    //guardando all'array patients il nome è in posizione 0 mentre il cognome è in posizione 1

    if (request.headers.nome == patients[req.headers.id][0] && request.headers.cognome == patients[req.headers.id][1]){
        // se corrispondono allora verifico che tipo di azione è stata effettuata
        if (req.body.azionePaziente === "cartellaClinica"){
            //return Status da records[id]
            res.status(200).send(records[req.headers.id]); 
            return;
        }
        else{
            //return ERROR
            res.status(501).send({"msg": "Unable to complete the request " + req.body.azionePaziente})
            return;
        }
    }
    else{
        res.status(401).send({"msg":"Nome o Cognome non corrispondono al ID fornito"})
        return;
    }


    //Ritorna la cartella corrispondente
    res.status(200).send({"msg" : "HTTP GET - SUCCESS!"}) //dentro send possiamo inviare anche HTML


});


//POST, crea nuovo paziente
// in postman creo nuove chiavi per il nuovo paziente a rapprensentare i dati inseriti da un nuovo paziente che si registra
    //immaginiamo di impostare negli headers:
    //
    // key = nome, value = Alpha
    // key = cognome, value = Garden
    // key = id, value = 9012
    // key = tel, value = 234-888-0033
app.post("/records", (req,res) => {

    //ci dovrebbero essere tutti i controlli sulla lunghezza, caratteri usati...
    patients[req.headers.id] = [req.headers.nome,req.headers.cognome,req.headers.tel]
    res.status(200).send({"msg": "Registrato con successo!"});
});


//UPDATE, aggiorno numero di telefono
app.put("/records", (req,res) => { 

    //Confronto ID per verificare il paziente esiste
    if (records[req.headers.id] === undefined) {
        res.status(404).send({"msg": "Patient not found"})
        return;
    }

    //Confronto nome e cognome
    if (request.headers.nome == patients[req.headers.id][0] && request.headers.cognome == patients[req.headers.id][1]){
        
        //aggiorno il numero di telefono
        // in postman nel body scriverei il nuovo numero di telefono:
        //    {"tel" : "678-999-0066"}

        //ci dovrebbero essere tutti i controlli sulla lunghezza, caratteri usati...
        //aggiorno il paziente corrispondente al id inserito confermando tutti i suoi dati e aggiornando il telefono scritto in body
        patients[req.headers.id] = [req.headers.nome,req.headers.cognome,req.body.tel]
        
        //restituisco i dati del paziente aggiornati col nuovo telefono
        res.status(202).send(patients[req.headers.id]);
        return;
    }
    else{
        res.status(401).send({"msg":"Nome o Cognome non corrispondono al ID fornito (per aggiornare il numero di telefono)"})
        return;
    }

});


//DELETE
app.delete("/records", (req,res) => { 
    
    //Verifico il paziente esiste
    if (records[req.headers.id] === undefined) {
        res.status(404).send({"msg": "Patient not found"})
        return;

    }


    //verifica che ID fornito corrisponda al nome e cognome fornito

    if (request.headers.nome == patients[req.headers.id][0] && request.headers.cognome == patients[req.headers.id][1]){
        // Cancella paziente e la sua cartella clinica dal database
        delete patients[req.headers.id]
        delete records[req.headers.id]
        res.status(200).send({"msg":"Account paziente cancellato con successo!"})
        return;
    }
    else{
        res.status(401).send({"msg":"Nome o Cognome non corrispondono al ID fornito (cercando di cancellare account)"})
        return;
    }
    

});

app.listen(3000); //metto server nodemon in ascolto

