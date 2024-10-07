import axios from 'axios';

const APIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export default APIClient;
