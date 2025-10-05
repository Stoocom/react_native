import axios from 'axios';

export const BASE_URL = 'https://mobile.handswork.pro/api/';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
