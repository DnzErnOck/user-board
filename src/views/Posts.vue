<template>
  <div class="posts-page p-4">
    <div class="mb-4">
      <div class="flex align-items-center justify-content-between">
        <div>
          <h1 class="text-4xl font-bold flex align-items-center gap-2">
            <i class="pi pi-file-edit text-primary"></i>
            {{ pageTitle }}
          </h1>
          <p class="text-600">{{ pageSubtitle }}</p>
        </div>

        <Button 
          v-if="selectedUserId"
          icon="pi pi-users" 
          label="Tüm Kullanıcılar" 
          class="p-button-outlined"
          @click="clearUserFilter"
        />
      </div>
    </div>

    <div v-if="loading" class="flex justify-content-center">
      <ProgressSpinner />
    </div>

    <div v-else-if="filteredPosts.length === 0" class="flex flex-column align-items-center justify-content-center py-8">
      <i class="pi pi-inbox text-primary text-5xl mb-4"></i>
      <h2 class="text-xl font-semibold text-900 mb-2">Henüz Post Bulunmuyor</h2>
      <p class="text-600">Bu kullanıcı henüz bir post paylaşmamış.</p>
    </div>

    <div v-else>
      <!-- Posts List -->
      <div class="posts-list mb-4">
        <PostCard 
          v-for="post in paginatedPosts" 
          :key="post.id" 
          :post="post"
        />
      </div>

      <!-- Pagination -->
      <Paginator 
        v-model:first="first" 
        :rows="rows" 
        :total-records="totalRecords"
        :rows-per-page-options="[5, 10, 20, 50]"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        class="justify-content-center"
        @page="onPageChange"
      >
        <template #start>
          <div class="flex align-items-center justify-content-center px-2">
            <span class="text-600">Toplam {{ totalRecords }} post</span>
          </div>
        </template>
      </Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import PostCard from '../components/PostCard.vue'
import type { Post } from '../interfaces/Post'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'

const store = useStore()
const route = useRoute()
const router = useRouter()
const posts = ref<Post[]>([])
const loading = ref(true)

// User filtering
const selectedUserId = computed(() => {
  const userId = route.query.userId
  return userId ? parseInt(userId as string) : null
})

const selectedUser = computed(() => {
  if (!selectedUserId.value) return null
  return store.getters['user/getUserById'](selectedUserId.value)
})

// Page title and subtitle
const pageTitle = computed(() => {
  return selectedUser.value 
    ? `${selectedUser.value.name}'in Postları`
    : 'Postlar'
})

const pageSubtitle = computed(() => {
  return selectedUser.value
    ? `${selectedUser.value.name} kullanıcısının paylaşımları`
    : 'Tüm kullanıcıların paylaşımları'
})

// Filtered posts
const filteredPosts = computed(() => {
  if (!selectedUserId.value) return posts.value
  return posts.value.filter(post => post.userId === selectedUserId.value)
})

// Pagination state
const first = ref(0)
const rows = ref(10)
const totalRecords = computed(() => filteredPosts.value.length)

// Paginated posts
const paginatedPosts = computed(() => {
  const start = first.value
  const end = Math.min(start + rows.value, totalRecords.value)
  return filteredPosts.value.slice(start, end)
})

// Reset pagination when user filter changes
watch(selectedUserId, () => {
  first.value = 0
})

// Page change handler
const onPageChange = (event: any) => {
  first.value = event.first
  rows.value = event.rows
}

// Clear user filter
const clearUserFilter = () => {
  router.push({ name: 'posts' })
}

onMounted(async () => {
  try {
    // Kullanıcıları ve postları yükle
    await Promise.all([
      store.dispatch('user/fetchUsers'),
      store.dispatch('post/fetchPosts')
    ])
    
    posts.value = store.getters['post/getAllPosts']
  } catch (error) {
    console.error('Veriler yüklenirken hata oluştu:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
:deep(.p-paginator) {
  background: transparent;
  border: none;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: var(--primary-color);
  color: white;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  min-width: 2.5rem;
  height: 2.5rem;
}

:deep(.p-dropdown-label) {
  padding-right: 1rem;
}
</style>
