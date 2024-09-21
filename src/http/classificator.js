import axios from "axios";

const api = axios.create({
    baseURL: "https://api.real-estate-manager.redberryinternship.ge/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

export const getRegions = async() =>{ return await api.get("/regions")}
export const getCity =async() =>{return await api.get("/cities")}

