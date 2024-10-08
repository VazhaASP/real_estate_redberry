import axios from "axios";

const token = '9d09d4d2-cccf-4309-8141-7d399523d9bc';

const api = axios.create({
    baseURL: "https://api.real-estate-manager.redberryinternship.ge/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }) // Add token to Authorization header if available
    }
});

export default api;

