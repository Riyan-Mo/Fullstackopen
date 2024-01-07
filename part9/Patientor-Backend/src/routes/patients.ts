import express from "express";
import { getNonSensetivePatients, addNewPatient, addNewEntry } from "../services/patients";
import toNewPatientEntry, {toNewEntry} from "../utils";
import { Entry } from "../../types/patient";

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res)=>{
    res.json(getNonSensetivePatients());
});

patientsRouter.get('/:id', (req, res)=>{
    const id = req.params.id;
    const [selectedPatient] = getNonSensetivePatients().filter(patient=>patient.id===id);
    res.json(selectedPatient);
});

patientsRouter.post('/', (req, res)=>{
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = addNewPatient(newPatientEntry);
        res.json(newPatient);
    }
    catch(error:unknown){
        let errorMessage = "Something went wrong.";
        if(error instanceof Error){
            errorMessage+= error.message;
        }
        res.status(400).send({error:errorMessage});
    }
});

patientsRouter.post('/:id/entries', (req, res)=>{
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {entry} = req.body;
    if(!entry || typeof entry !== 'object'){
        return res.status(400).send("Invalid entry");
    }
    const newHEntry:Entry = toNewEntry(entry);
    const newEntry = addNewEntry(newHEntry, id);
    return res.json(newEntry);
});

export default patientsRouter;