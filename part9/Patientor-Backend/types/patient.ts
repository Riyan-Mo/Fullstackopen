import { Diagnosis } from "./diagnosis";

export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface sickLeave {
    startDate: string;
    endDate: string;
}

interface discharge{
    date: string;
    criteria: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: sickLeave;
}

export interface HospitalEntry extends BaseEntry{
    type: "Hospital";
    discharge: discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient{
    id:string;
    name:string;
    dateOfBirth:string;
    ssn:string;
    gender:Gender;
    occupation:string;
    entries: Entry[];
}

export type NonSsnPatients = Omit<Patient, 'ssn'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'|'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;