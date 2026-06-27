import axios from 'axios';

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_DUMMY_JSON_API,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

export default client;