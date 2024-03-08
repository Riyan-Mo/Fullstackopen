import { Entry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationHealthCare = ({entry}:{entry:Entry}) => {
    if(!('employerName' in entry)){
        return <></>;
    }
    return (
        <div>
            <div>{entry.date} <WorkIcon/> {entry.employerName}</div>
            <em>{entry.description}</em>
            {entry.sickLeave?.startDate && <div>Sick Leave Start:{entry.sickLeave.startDate}</div>}
            {entry.sickLeave?.endDate && <div>Sick Leave End:{entry.sickLeave.endDate}</div>}
        </div>
    );
};

export default OccupationHealthCare;