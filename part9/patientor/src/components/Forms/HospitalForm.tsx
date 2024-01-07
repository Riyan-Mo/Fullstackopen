import { useState } from "react";
import { TextField } from "@mui/material";
import entryService from "../../services/entries";
import { InputLabel, Input, Select, MenuItem, Button, Grid} from "@mui/material";
import { useParams } from "react-router-dom";
import { HospitalEntryWithoutId, Patient } from "../../types";
import MultipleSelectCheckmarks from "./Checkmarks";
import { type } from "./EntryForm";

interface Props{
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
    setParameterisedPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setType: React.Dispatch<React.SetStateAction<type>>;
}

const HospitalForm = ({setShowForm, setParameterisedPatient, setType}: Props) => {
    const [formDetails, setFormDetails] = useState<HospitalEntryWithoutId>({
        description: "",
        date: new Date().toLocaleDateString(),
        type: "Hospital",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: new Date().toLocaleDateString(),
          criteria: "",
        },
    });
    const patientId = useParams().id;
    if(!patientId){
      return <h3>Couldn't find patient id</h3>;
    }
    const formStyle:React.CSSProperties = {
        "border": "2px black dotted",
        "display": "flex",
        "flexDirection": "column",
        "gap": "1rem",
        "padding": "1rem",
    };

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        entryService.createNewEntry(formDetails, patientId).then(res=>setParameterisedPatient(res));
        setFormDetails({
          description: "",
          date: new Date().toLocaleDateString(),
          type: "Hospital",
          specialist: "",
          diagnosisCodes: [],
          discharge: {
            date: new Date().toLocaleDateString(),
            criteria: "",
          },
      });
    };

    const handleChange = (e:React.SyntheticEvent) => {
        const value = e.target?.value;
        if(e.target.name === 'dischargeDate'){
          setFormDetails({...formDetails, ['discharge']:{...formDetails.discharge, ['date']: value} });
        }
        else if(e.target.name === 'criteria'){
          setFormDetails({...formDetails, ['discharge']:{...formDetails.discharge, ['criteria']: value} });  
        }
        else{
          setFormDetails({...formDetails, [e.target?.name]:value});
        }
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>

        <h2>New Hospital entry</h2>
        <div>

        <InputLabel>Entry Type</InputLabel>
        <Select
          label="EntryType"
          fullWidth
          value="Hospital"
          name="entryType"
          onChange={(e)=>setType(e.target?.value)}
          >
          <MenuItem value="HealthCheck">
            Health Check
          </MenuItem>
        
          <MenuItem value="OccupationalHealthcare">
            Occupational Health Care
          </MenuItem>

          <MenuItem value="Hospital">
            Hospital 
          </MenuItem>

        </Select>

        </div>

        <div>
            <TextField label="description" fullWidth placeholder="Description" name="description" onChange={handleChange} value={formDetails.description} required/>
        </div>

        <div>
            <InputLabel>Date</InputLabel>
            <Input type="date" name="date" value={formDetails.date} onChange={handleChange} required/>
        </div>
        
        <div>
            <TextField label="specialist" fullWidth name="specialist" onChange={handleChange} value={formDetails.specialist} required/>
        </div>

        <div>
            <MultipleSelectCheckmarks setFormDetails={setFormDetails}/>
        </div>

        <div>
            <InputLabel>Discharge Date</InputLabel>
            <Input type="date" name="dischargeDate" value={formDetails.discharge.date} onChange={handleChange} required/>
        </div>

        <div>
            <TextField label="Discharge Criteria" fullWidth name="criteria" onChange={handleChange} value={formDetails.discharge.criteria} required/>
        </div>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={()=>setShowForm(pre=>!pre)}
            >
              Close
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add New Entry
            </Button>
          </Grid>
        </Grid>

        </form>
    );
};

export default HospitalForm;