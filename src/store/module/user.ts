import type { Module } from "vuex/types/index.js"
import type { User } from "../../interfaces/User"
import { getUser } from "../../service/userService"


export interface UserState {
  users: User[]
}

export const userModule: Module<UserState, unknown> = {
  namespaced: true,

  state: () => ({
    users: []
  }),

  mutations: {
    setUsers(state, users: User[]) {
      state.users = users
    }
  },

  actions: {
    async fetchUsers({ commit }) {
      try {
        const users = await getUser();
        commit('setUsers', users)
      } catch (error) {
        console.error('Kullanıcılar alınamadı:', error)
      }
    }
  },

  getters: {
    getAllUsers(state): User[] {
      return state.users
    },

    getUserById: (state) => (id: number) => {
      return state.users.find(user => user.id === id)
    }
  }
}
