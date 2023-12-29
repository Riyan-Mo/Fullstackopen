import express from "express";
import { getNonSensetivePatients, addNewPatient } from "../services/patients";
import toNewPatientEntry from "../utils";

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

export default patientsRouter;