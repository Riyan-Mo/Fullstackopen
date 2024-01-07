import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id:string) => {
  const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const newEntry = {...object, ['entries']: []};
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newEntry
  );

  return data;
};

export default {
  getAll, create, getPatient
};

