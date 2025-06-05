// store/index.ts
import { createStore } from 'vuex'
import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { userModule } from './module/user'
import type { UserState } from './module/user'
import { postModule } from './module/post'
import { commentModule } from './module/comment'

// Uygulamanın root state tipi
export interface State {
  user: UserState
}

// InjectionKey: Vuex Store için type-safe context sağlıyor
export const key: InjectionKey<Store<State>> = Symbol()

// Vuex Store oluşturuluyor
export const store = createStore<State>({
  modules: {
    user: userModule,
    post: postModule,
    comment: commentModule,
  },
  plugins: [
    createPersistedState({
      paths: ['user'], 
      storage: window.localStorage
    })
  ]
})

// Vuex Store'a typesafe erişim sağlayan helper
export function useStore() {
  return store
}
