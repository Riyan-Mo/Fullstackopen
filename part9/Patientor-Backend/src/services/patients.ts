import patientsData from "../../data/patients";
import { Entry, NewPatientEntry, NonSsnPatients, Patient } from "../../types/patient";
import {v1 as uuid} from 'uuid';

const addNewPatient = (entry:NewPatientEntry):Patient =>{
    const id = uuid();
    const newPatient = {...entry, id};
    patientsData.push(newPatient);
    return newPatient;
};

const getNonSensetivePatients = ():NonSsnPatients[] =>{
    return patientsData.map(({id, name, dateOfBirth, gender, occupation, entries})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const addNewEntry = (entry:Entry, id:string):Patient => {
    const entryId = uuid();
    const [patient] = patientsData.filter(p=>p.id===id);
    if(!patient){
        throw new Error(`Couldn't find patient with the id ${id}`);
    }
    const newPatient = {...patient, ['entries']:[...patient.entries, {...entry, 'id':entryId}]};
    const patientIndex = patientsData.findIndex(p=>p.id===id);
    if(patientIndex === -1){
        throw new Error("Couldn't find patient");
    }
    patientsData[patientIndex] = newPatient;
    return newPatient; 
};

export {
    getNonSensetivePatients,
    addNewPatient,
    addNewEntry,
};