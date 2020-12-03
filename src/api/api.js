import axios from 'axios';
const token = 'cEzY6UqsaAueReUGGEh7k5FBz2xDiMFHvHxZKn3q3EQjCd61nI9ytp8NT0wo';

const hotelAPI = axios.create({
    baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6/',
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json',
        Authorization:`Bearer ${token}`
    },
    timeout:10000
});

export default hotelAPI;