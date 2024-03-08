import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaries = async() => {
    const response = await axios.get<DiaryEntry[]>(`${baseUrl}`);
    return response.data;
}

const addDiaryEntry = async(entry:NewDiaryEntry)=>{
    const response = await axios.post<DiaryEntry>(baseUrl, entry)
    return response.data
}

export {
    getAllDiaries,
    addDiaryEntry
}