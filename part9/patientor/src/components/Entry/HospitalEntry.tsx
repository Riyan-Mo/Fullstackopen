import { Entry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HospitalEntry = ({entry}:{entry:Entry}) =>{
    if(!('discharge' in entry) || typeof entry.discharge !== 'object'){
        return <></>;
    }
    return(
        <div>
            <div>{entry.date} <MedicalServicesIcon/></div>
            <em>{entry.description}</em>
            <p>Discharge Date:{entry.discharge.date}</p>
            <p>Criteria:{entry.discharge.criteria}</p>
        </div>
    );
};

export default HospitalEntry;