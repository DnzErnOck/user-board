import { getComment, getCommentById, getCommentByPostId } from "@/service/commentService";
import type { Comment } from "@/interfaces/Comment";
import type { Module } from "vuex/types/index.js";
export interface CommentState {
    comments: Comment[],
    selectedComment: Comment | null,
    postComments: Comment[]
  }
export const commentModule : Module<CommentState,unknown> = {
    namespaced: true,

    state: () => ({
        comments: [],
        selectedComment: null,
        postComments: []
    }),
    mutations: {
        setComments(state,comments:Comment[]){
            state.comments = comments;
        },
        setSelectedComment(state,comment:Comment){
            state.selectedComment = comment;
        },
        setPostComments(state,comments:Comment[]){
            state.postComments = comments;
        }
    },
    actions: {
    
        async fetchComments({commit}){
            try {
                const comments = await getComment();
                commit('setComments',comments);
            } catch (error) {
                console.error('Yorumlar alınamadı:',error);
            }
        },
        async fetchCommentById({commit},id:number){
            try {
                const comment = await getCommentById(id);
                commit('setSelectedComment',comment);
            } catch (error) {
                console.error('Yorum alınamadı:',error);
            }
        },
        async fetchCommentByPostId({commit},postId:number){
            try{
                const comments = await getCommentByPostId(postId);
                commit('setPostComments',comments);
            }
            catch(error){
                console.error('Post yorumları alınamadı:',error);
            }
        }
    },
    getters: {
        getAllComments(state): Comment[] {
            return state.comments;
        },
        getSelectedComment(state): Comment | null {
            return state.selectedComment;
        },
        getPostComments(state): Comment[] {
            return state.postComments;
        }
    }
}