import apiClient from "@/api/apiClient";
import type { Post } from "@/interfaces/Post";

export const getPost  = async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
}
export const getPostById = async (id: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
}
export const getPostByUserId = async (userId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
}
