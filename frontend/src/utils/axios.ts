import axios from 'axios';

const baseUrl = 'http://localhost:5500/';

export default axios.create({
    baseURL: baseUrl,
});
