import axios from 'axios';
import {
  getResponseErrorInterceptor,
  getResponseSuccessInterceptor,
  getBaseURL,
} from '@/helpers/axios';

function init() {
  axios.defaults.baseURL = getBaseURL('https://api.vv726.top');
  // axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    getResponseSuccessInterceptor({}),
    getResponseErrorInterceptor({}),
  );
}

export default init;
