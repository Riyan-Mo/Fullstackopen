import { Entry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck = ({entry}:{entry:Entry}) => {
    let heartColour = "success";
    if('healthCheckRating' in entry){
       switch(entry.healthCheckRating){
            case 1:
                 heartColour = "warning";
                 break;
            case 2:
                heartColour = "error";
                break;
            case 3:
                heartColour = "error";
                break;
            default:
                heartColour = "success";
                break;
        }
    }
    return(
        <div>
            <div>{entry.date} <MedicalServicesIcon/></div>
            <p><em>{entry.description}</em></p>
            <FavoriteIcon color={heartColour}/>
        </div>
    );
};
export default HealthCheck;