import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-1c1a8.firebaseio.com/'
});

export default instance;