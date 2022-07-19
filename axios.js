import axios from "axios";
import store from './src/store';

const baseURL = process.env.HTTP_URL || 'https://ppa-survey-app-api.herokuapp.com/api';

const axiosClient = axios.create({
    baseURL
})

axiosClient.interceptors.request.use( config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
})

export default axiosClient;
