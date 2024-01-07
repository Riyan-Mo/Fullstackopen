import { useState } from "react";
import { TextField } from "@mui/material";
import entryService from "../../services/entries";
import { InputLabel, Input, Select, MenuItem, Button, Grid} from "@mui/material";
import { useParams } from "react-router-dom";
import { OccupationalEntryWithoutId, Patient } from "../../types";
import MultipleSelectCheckmarks from "./Checkmarks";
import { type } from "./EntryForm";

interface Props{
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
    setParameterisedPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setType: React.Dispatch<React.SetStateAction<type>>;
}

const OccupationalHealthCareForm = ({setShowForm, setParameterisedPatient, setType}: Props) => {
    const [formDetails, setFormDetails] = useState<OccupationalEntryWithoutId>({
        description: "",
        date: new Date().toLocaleDateString(),
        type: "OccupationalHealthcare",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
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
        if(formDetails.sickLeave?.startDate === "" || formDetails.sickLeave?.endDate === ""){
          const newEntry:OccupationalEntryWithoutId = {}; 
          for(const key in formDetails){
            if(key!=="sickLeave"){
              newEntry[key] = formDetails[key];
            }
          }
          setFormDetails(newEntry);
        }
        e.preventDefault();
        entryService.createNewEntry(formDetails, patientId).then(res=>setParameterisedPatient(res));
        setFormDetails({
          description: "",
          date: new Date().toLocaleDateString(),
          type: "OccupationalHealthcare",
          specialist: "",
          diagnosisCodes: [],
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: "",
          },
      });
    };

    const handleChange = (e:React.SyntheticEvent) => {
        const value = e.target?.value;
        if(e.target.name === 'startDate'){
          setFormDetails({...formDetails, ['sickLeave']:{...formDetails.sickLeave, ['startDate']: value} });
        }
        else if(e.target.name === 'endDate'){
          setFormDetails({...formDetails, ['sickLeave']:{...formDetails.sickLeave, ['endDate']: value} });  
        }
        else{
          setFormDetails({...formDetails, [e.target?.name]:value});
        }
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>

        <h2>New Occupational Health Care entry</h2>
        <div>

        <InputLabel>Entry Type</InputLabel>
        <Select
          label="EntryType"
          fullWidth
          value="OccupationalHealthcare"
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
            <InputLabel>Sick Leave Start:</InputLabel>
            <Input type="date" name="startDate" value={formDetails.sickLeave?.startDate} onChange={handleChange}/>
        </div>

        <div>
            <InputLabel>Sick Leave End:</InputLabel>
            <Input type="date" name="endDate" value={formDetails.sickLeave?.endDate} onChange={handleChange}/>
        </div>

        <div>
            <TextField label="Employer Name" fullWidth name="employerName" onChange={handleChange} value={formDetails.employerName} required/>
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

export default OccupationalHealthCareForm;