import axios from "axios";

const token = import.meta.env.VITE_API_TOKEN;

const api = axios.create({
    baseURL: "https://api.real-estate-manager.redberryinternship.ge/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }) // Add token to Authorization header if available
    }
});