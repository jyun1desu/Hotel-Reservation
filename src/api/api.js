import axios from 'axios';
const token = 'DnIzKEiHHdIYCLTBo6i66cNBIPQPg8MUBwTjCsWaSX9yHJWz94z6frRgQecq';

const API = axios.create({
    baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6/';
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json',
        Authorization:`Bearer ${token}`
    },
    timeout:10000
});

export default API;