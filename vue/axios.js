import axios from "axios";
import store from './src/store';

const baseURL = 'http://localhost:8000/api';

const axiosClient = axios.create({
    baseURL
})

axiosClient.interceptors.request.use( config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
})

export default axiosClient;
