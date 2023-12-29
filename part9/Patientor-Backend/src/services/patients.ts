import patientsData from "../../data/patients";
import { NewPatientEntry, NonSsnPatients, Patient } from "../../types/patient";
import {v1 as uuid} from 'uuid';

const addNewPatient = (entry:NewPatientEntry):Patient =>{
    const id = uuid();
    return {...entry, id};
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

export {
    getNonSensetivePatients,
    addNewPatient,
};