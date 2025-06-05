import type { Post } from '@/interfaces/Post'
import axios from 'axios'
import type { Commit } from 'vuex'

interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
  pagination: {
    first: number
    rows: number
  }
}

export default {
  namespaced: true,
  
  state: (): PostState => ({
    posts: [],
    loading: false,
    error: null,
    pagination: {
      first: 0,
      rows: 10
    }
  }),

  mutations: {
    setPosts(state: PostState, posts: Post[]) {
      state.posts = posts
    },
    setLoading(state: PostState, loading: boolean) {
      state.loading = loading
    },
    setError(state: PostState, error: string | null) {
      state.error = error
    },
    setPagination(state: PostState, { first, rows }: { first: number, rows: number }) {
      state.pagination.first = first
      state.pagination.rows = rows
    }
  },

  actions: {
    async fetchPosts({ commit }: { commit: Commit }) {
      commit('setLoading', true)
      commit('setError', null)
      
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        commit('setPosts', response.data)
      } catch (error) {
        commit('setError', 'Postlar yüklenirken bir hata oluştu')
        console.error('Error fetching posts:', error)
      } finally {
        commit('setLoading', false)
      }
    },

    updatePagination({ commit }: { commit: Commit }, { first, rows }: { first: number, rows: number }) {
      commit('setPagination', { first, rows })
    }
  },

  getters: {
    getAllPosts: (state: PostState) => state.posts,
    getLoading: (state: PostState) => state.loading,
    getError: (state: PostState) => state.error,
    getPagination: (state: PostState) => state.pagination
  }
} 