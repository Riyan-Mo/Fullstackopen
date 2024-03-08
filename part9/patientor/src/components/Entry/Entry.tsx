import { Entry } from "../../types";
import HealthCheck from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationHealthCare from "./OccupationHealthCare";

const EntryDetails = ({entry}:{entry:Entry}) => {
    switch(entry.type){
        case "Hospital":
            return <div>
                        <HospitalEntry entry={entry} />
                    </div>;
        case "HealthCheck":
            return  <div>
                        <HealthCheck entry={entry}/>
                    </div>;
        default:
            return <div>
                    <OccupationHealthCare entry={entry}/>
                    </div>;
    }
};

const EntryComponent = ({entries}:{entries:Entry[]})=>{
    return(
        <div>
            {entries.map(e=>{
                return(
                    <div key={e.id} style={{border:'black 2px solid', margin:'20px 0px', padding:'20px'}}>
                        <EntryDetails entry={e}/>
                        <div>diagnose by {e.specialist}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default EntryComponent;