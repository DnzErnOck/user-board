import type { Module } from "vuex/types/index.js"
import type { User } from "../../interfaces/User"
import { getUser, updateUser, deleteUser } from "../../service/userService"


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
    },
    updateUser(state, updatedUser: User) {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        // Dizideki eski kullanıcıyı yenisiyle değiştir
        state.users[index] = { ...updatedUser }
      }
    },
    deleteUser(state, userId: number) {
      state.users = state.users.filter(user => user.id !== userId)
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
    },
    async updateUser({ commit }, user: User) {
      try {
        const updatedUser = await updateUser(user)
        commit('updateUser', updatedUser)
        return updatedUser
      } catch (error) {
        console.error('Kullanıcı güncellenemedi:', error)
        throw error
      }
    },
    async deleteUser({ commit }, userId: number) {
      try {
        await deleteUser(userId)
        commit('deleteUser', userId)
      } catch (error) {
        console.error('Kullanıcı silinemedi:', error)
        throw error
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
