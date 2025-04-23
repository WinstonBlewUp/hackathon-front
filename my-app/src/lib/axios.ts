/* import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Exemple : http://localhost:3001/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;
 */


import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/* if (process.env.NODE_ENV === 'development') {
  const mock = new AxiosMockAdapter(instance);

  mock.onGet('/test').reply(200, {
    message: 'Mock OK 🚀',
  });

  mock.onGet('/rooms').reply(200, [
    { id: 1, roomName: 'Chambre Parisienne' },
    { id: 2, roomName: 'Studio Marseillais' },
  ]);
} */

export const getTestapiList = async () => {
  const res = await instance.get('/testapis');
  return res.data.member;
};

export default instance;
