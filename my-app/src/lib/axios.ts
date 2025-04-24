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

import { Category } from "@/types/category";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/api",
  headers: {
    "Content-Type": "application/json",
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

type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await instance.get("/categories");
    return { success: true, data: response.data.member };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getLastMinute = async () => {
  try {
    const response = await instance.get("/rooms/lastminute");
    console.log(response.data.member);
    return { success: true, data: response.data.member };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};
export const getRecommandation = async (user_id: string) => {
  try {
    const response = await instance.get(`/rooms/${user_id}/recommendation`);
    console.log(response.data.member);
    return { success: true, data: response.data.member };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getTotalNights = async (user_id: number) => {
  try {
    const response = await instance.get(`/reservation/${user_id}/totalNights`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export default instance;
