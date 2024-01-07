import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import diagnoseService from '../../services/diagnoses';
import { Diagnosis } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props{
  setFormDetails: React.Dispatch<React.SetStateAction<FormDetails>>;
}

export default function MultipleSelectCheckmarks({setFormDetails}: Props) {
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis['code']>>();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Array<Diagnosis['code']>>([]);

  const filterCode = (arr:Diagnosis[]) => arr.map(d=>d.code); 

  useEffect(() => {
    diagnoseService.getAllDiagnoses().then(d=>setDiagnoses(filterCode(d))); 
  }, []);

  if(!diagnoses){
    return null;
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedDiagnosis>) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnosis(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setFormDetails(prev=>({...prev, ['diagnosisCodes']:selectedDiagnosis}));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="diagnosis-multiple-checkbox-label">Diagnosis</InputLabel>
        <Select
          labelId="diagnosis-multiple-checkbox-label"
          id="diagnosis-multiple-checkbox"
          multiple
          value={selectedDiagnosis}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis} value={diagnosis}>
              <Checkbox checked={selectedDiagnosis.indexOf(diagnosis) > -1} />
              <ListItemText primary={diagnosis} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}