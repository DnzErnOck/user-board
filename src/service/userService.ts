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
export const updateUser = async (user: User): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${user.id}`, user);
    return response.data;
}

export const deleteUser = async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
}