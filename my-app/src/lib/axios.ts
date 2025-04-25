import {
  CategoryData,
  LoginData,
  PostNegotiationData,
  PostResponseNegotiationData,
  QuizRequestData,
} from "@/types/data";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/api",
  headers: {
    "Content-Type": "application/ld+json",
  },
});

type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};
export const getCategories = async (): Promise<ApiResponse<CategoryData[]>> => {
  try {
    const response = await instance.get("/categories");
    return { success: true, data: response.data.member };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getRoomLastMinute = async () => {
  try {
    const response = await instance.get("/rooms/lastminute");
    console.log(response.data.member);
    return { success: true, data: response.data.member };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};
export const getRoomRecommandation = async (user_id?: string) => {
  try {
    const response = await instance.get(`/rooms/${user_id}/recommandation`);
    return { success: true, data: response.data };
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

export const getRoomLike = async (user_id: string) => {
  try {
    const response = await instance.get(`/like/${user_id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};
export const getRoom = async (room_id: string) => {
  try {
    const response = await instance.get(`/rooms/${room_id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const postQuiz = async (data: QuizRequestData) => {
  try {
    console.log(data);
    const response = await instance.post(`/rooms/search/quiz`, data);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getOpenNegotiations = async (user_id: string) => {
  try {
    const response = await instance.get(`/negotiation/open/${user_id}`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getCategoryRoom = async (category_id: string) => {
  try {
    const response = await instance.get(`/categories/${category_id}/room`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getAdminNegotiationsOpen = async (user_id: string) => {
  try {
    const response = await instance.get(`/admin/negotiation/open/${user_id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};
export const getUser = async (user_id: string) => {
  try {
    const response = await instance.get(`/users/${user_id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getNegotiationAccept = async (negotiation_id: string) => {
  try {
    const response = await instance.get(
      `/negociations/${negotiation_id}/client/accept`
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const postNegotiationClientUpdate = async (
  negotiation: PostResponseNegotiationData
) => {
  try {
    const response = await instance.post(
      `/negociations/${negotiation.negociationId}/client`,
      negotiation
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const postNegotiation = async ({
  price,
  room_id,
  user_id,
  startDate,
  endDate,
}: PostNegotiationData) => {
  try {
    const response = await instance.post(`/negociations`, {
      requestPrice: price,
      room_id,
      user_id,
      startDate,
      endDate,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const login = async ({ email, password }: LoginData) => {
  try {
    const response = await instance.get(`/login/${email}/${password}`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export const getCreateLike = async ({
  user_id,
  room_id,
}: {
  user_id: string;
  room_id: number;
}) => {
  try {
    const response = await instance.get(`/add/like/${user_id}/${room_id}`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return { success: false, data: [], error: "Erreur de connexion" };
  }
};

export default instance;
