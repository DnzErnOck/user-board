import type { Post } from "@/interfaces/Post"
import { getPost, getPostById, getPostByUserId } from "@/service/postService";
import type { Module } from "vuex/types/index.js";


export interface PostState {
    posts: Post[],
    selectedPost: Post | null;
    userPosts: Post[];
  }
export const postModule : Module <PostState, unknown> = {
    namespaced: true,

    state: () => ({
        posts: [],
        selectedPost: null,
        userPosts: []
    }),
    mutations: {
        setPosts(state,posts:Post[]){
            state.posts = posts;
        },
        setSelectedPost(state,post:Post){
            state.selectedPost = post;
        },
        setUserPosts(state,posts:Post[]){
            state.userPosts = posts;
        }
    },
    actions: {
        async fetchPosts({commit}){
            try {
                const posts = await getPost();
                commit('setPosts',posts);
            } catch (error) {
                console.error('Postlar alınamadı:',error);
            }
        },
        async fetchPostById({commit},id:number){
            try {
                const post = await getPostById(id);
                commit('setSelectedPost',post);

            } catch (error) {
                console.error('Post alınamadı:',error);
            }
        },
        async fetchPostsByUserId({commit},userId:number){
            try {   
                const posts = await getPostByUserId(userId);
                commit('setUserPosts',posts);
            } catch (error) {
                console.error('Kullanıcının postları alınamadı:',error);
            }
        }
    },
    getters:{
        getAllPosts(state): Post[] {
            return state.posts;
        },
        getSelectedPost(state): Post | null {
            return state.selectedPost;
          },
        getUserPosts(state): Post[] {
            return state.userPosts;
        }
    }        
}

