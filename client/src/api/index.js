import axios from "axios";

const api = axios.create({
    baseURL: "https://blogging-app-karan.herokuapp.com/",
    withCredentials: true,
}); 

export default api;