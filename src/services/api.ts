import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.31.157:3333/api/v1',
});

export const apiExtern = axios.get(
  'https://jsonplaceholder.typicode.com/users',
);
