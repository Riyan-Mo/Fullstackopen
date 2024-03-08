import { NewPatientEntry, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types/patient";

const isString = (text:unknown): text is string =>{
    return text instanceof String || typeof text === 'string';
};

const parseName = (text:unknown): string =>{
    if(!text|| !isString(text)){
        throw new Error("Incorrect or missing name");
    }
    return text;
};

const isDate = (date:string):boolean =>{
    return Boolean(Date.parse(date));
};

const parseDate = (date:unknown):string =>{
    if(!date || !isString(date) || !isDate){
        throw new Error("Incorrect or missing date: "+date);
    }
    return date;
};

const parseSsn = (ssn: unknown):string =>{
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const isGender = (gender:string):gender is Gender=>{
    return Object.values(Gender).map(g=>g.toString()).includes(gender);
};

const parseGender = (gender:unknown):Gender =>{
    if(!gender || !isString(gender)||!isGender(gender)){
        throw new Error('Unknown of missing gender');
    }
    return gender;
}; 

const parseOccupation = (occupation: unknown):string =>{
    if(!occupation || !isString(occupation)){
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};

// const parseEntry = (entry:unknown) => {
//     if(!entry){
//         throw new Error("Incorrect or missing entry");
//     }
//     return entry;
// };


const toNewPatientEntry = (object:unknown):NewPatientEntry =>{
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if('name' in object && 'dateOfBirth' in object && 'ssn' in object &&  'gender' in object && 'occupation' in object && 'entries' in object){
        const newEntry:NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries as Entry[],
        };
        return newEntry;    
    }
    throw new Error("Incorrect data: some fields are missing");
};

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
//     if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//       return [] as Array<Diagnosis['code']>;
//     }  
//     return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

const isHealthCheckEntry = (object: Entry):object is HealthCheckEntry => {
    return 'healthCheckRating' in object; 
};

const parseHealthCheckEntry = (object:Entry) => {
    if(!isHealthCheckEntry(object)){
        throw new Error("Incomplete entry");
    }
    object.healthCheckRating = Number(object.healthCheckRating);
    return object; 
};

const isHospitalEntry = (object: Entry) => {
    return 'discharge' in object; 
};

const parseHospitalEntry = (object:Entry) => {
    if(!isHospitalEntry(object)){
        throw new Error("Incomplete entry");
    }
    return object as HospitalEntry; 
};

const isOccupationalEntry = (object: Entry) => {
    return 'employerName' in object; 
};

const parseOccupationalEntry = (object:Entry) => {
    if(!isOccupationalEntry(object)){
        throw new Error("Incomplete entry");
    }
    return object as OccupationalHealthcareEntry; 
};

const parseType = (object:Entry) => {
    switch(object.type){
        case "HealthCheck":
           return parseHealthCheckEntry(object);
        case "Hospital":
            return parseHospitalEntry(object);
        default: 
            return parseOccupationalEntry(object);
    }
};

export const toNewEntry = (object:unknown):Entry =>{
    if(!object || typeof object !== 'object' ){
        throw new Error("Entry is either not existing or not an object.");
    }

    if(!('date' in object) || !('type' in object) || !('specialist' in object) || !('description' in object)){
        throw new Error("Incomplete Entry");
    }
    const newObj:Entry = parseType(object as Entry);
    return newObj;
};

export default toNewPatientEntry;