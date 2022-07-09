import { Axios } from './axios';
import { interceptors } from './intercepter';

export const axios = new Axios({
  interceptors,
  timeout: 10000,
  withCredentials: true,
});
