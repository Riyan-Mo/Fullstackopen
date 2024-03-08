import OccupationalHealthCareForm from "./OccupationalForm";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckEntryForm";
import { Patient } from "../../types";
import { useState } from "react";

interface Props{
  setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
  setParameterisedPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

export type type = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

export default function EntryForm({setShowForm, setParameterisedPatient}: Props){
  const [type, setType] = useState<type>("HealthCheck");
  switch(type){
    case "HealthCheck":
      return <HealthCheckForm
       setParameterisedPatient={setParameterisedPatient}
       setShowForm={setShowForm}
       setType={setType}
       />;
    case "OccupationalHealthcare":
        return <OccupationalHealthCareForm
         setParameterisedPatient={setParameterisedPatient}
         setShowForm={setShowForm}
         setType={setType}
         />;
    default: 
      return <HospitalForm
      setParameterisedPatient={setParameterisedPatient}
      setShowForm={setShowForm}
      setType={setType}
      />; 
  }
}
