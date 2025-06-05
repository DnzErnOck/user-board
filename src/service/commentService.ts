import apiClient from "@/api/apiClient"
export const getComment = async (): Promise<Comment[]> =>{
    const response = await apiClient.get<Comment[]>('/comments');
    return response.data;
}
export const getCommentById = async (id:number): Promise<Comment> =>{
    const response =await apiClient.get<Comment>(`/comments?${id}`);
    return response.data;
} 
export const getCommentByPostId = async (postId:number): Promise<Comment[]> =>{
    const response = await apiClient.get<Comment[]>(`/comments?postId=${postId}`);
    return response.data;
}    
