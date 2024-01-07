import axios from "axios";

import { apiBaseUrl } from "../constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createNewEntry = async(entry: any, patientId: string) => {
    const entryUrl = `${apiBaseUrl}/patients/${patientId}/entries`;
    const { data } = await axios.post(entryUrl, {entry:entry});
    return data;
};

export default {
    createNewEntry,
};