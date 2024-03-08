import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import EntryForm from "./Forms/EntryForm";
import { Patient } from "../types";
import EntryComponent from "./Entry/Entry";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Button } from "@mui/material";

export const ParameterisedPatient = () => {
    const ErrorPage = () => <h1 style={{textAlign:'center'}}>Couldn't find patient</h1>;
    const id = useParams().id;
    const [parameterisedPatient, setParameterisedPatient] = useState<Patient>();
    const [showForm, setShowForm] = useState<boolean>(false);
    console.log(parameterisedPatient);
    useEffect(():void=>{
        if(id){
            patientService.getPatient(id).then(data=>{
                setParameterisedPatient(data);
            });
        }
    }, [id]);    

    if(!parameterisedPatient){
       return <ErrorPage/>;
    }

    if(!parameterisedPatient.name || !parameterisedPatient.gender || !parameterisedPatient.occupation){
        return <ErrorPage/>;
    }

    let GenderIcon;
    switch(parameterisedPatient.gender){
        case "male":
            GenderIcon = MaleIcon;
            break;
        case "female":
            GenderIcon = FemaleIcon;
            break;
        default:
            GenderIcon = TransgenderIcon;
    }
    const {entries} = parameterisedPatient;
    return (
        <div>
            <div>
                <h2>{parameterisedPatient.name} <GenderIcon /></h2>
            </div>
            <div>
                {parameterisedPatient.ssn?<p>{parameterisedPatient.ssn}</p>:null}
                <p>occupation: {parameterisedPatient.occupation}</p>
                {showForm && <EntryForm setShowForm={setShowForm} setParameterisedPatient={setParameterisedPatient}/>}
                {!showForm && <Button variant="contained" color="primary" onClick={()=>setShowForm(!showForm)}>ADD NEW ENTRY</Button>}
                <h4>entries</h4>
                {entries?<EntryComponent entries={entries}/>:null}
            </div>
        </div>
    );
};