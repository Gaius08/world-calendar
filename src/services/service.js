import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://date.nager.at/api/v3/'
}); 
export default axiosInstance;