import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "../services/patients";
import { Patient } from "../types";
import { useEffect, useState } from "react";

export const ParameterisedPatient = () => {
    const ErrorPage = () => <h1 style={{textAlign:'center'}}>Couldn't find patient</h1>;
    const id = useParams().id;
    const [parameterisedPatient, setParameterisedPatient] = useState<Patient>();

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
    return (
        <div>
            <div>
                <h2>{parameterisedPatient.name} <GenderIcon /></h2>
            </div>
            <div>
                {parameterisedPatient.ssn?<p>{parameterisedPatient.ssn}</p>:null}
                <p>occupation: {parameterisedPatient.occupation}</p>
            </div>
        </div>
    );
};