import axios from "axios";

const api = axios.create({
    baseURL: "/"
    // baseURL: "http:localhost:8080/"
}); 

export default api;