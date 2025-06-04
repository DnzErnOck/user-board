import apiClient from "../api/apiClient";
import type { User } from "../interfaces/User";

export const getUser =async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
} 

export const getUserById = async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
} 