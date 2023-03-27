import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const { VITE_API_URL} = getEnvVariables();

const API = axios.create({
    baseURL: VITE_API_URL
});


// TODO: Configurar interceptores

API.interceptors.request.use( config => {

    config.headers = {
        ...config.headers, //esparcir todos los headers de la configuracion
        'x-token':localStorage.getItem('token'),
    }

    return config;
})

export default API;