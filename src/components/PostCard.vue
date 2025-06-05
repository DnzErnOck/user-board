<template>
  <Card v-if="post" class="mb-4 post-card">
    <template #header>
      <div class="flex align-items-center justify-content-between p-3 surface-100">
        <div class="flex align-items-center gap-2">
          <div class="w-2rem h-2rem border-circle bg-primary flex align-items-center justify-content-center">
            <i class="pi pi-user text-white"></i>
          </div>
          <div class="flex flex-column">
            <span class="font-semibold text-900">{{ userName }}</span>
            <span class="text-sm text-500">Yazar</span>
          </div>
        </div>
        <Tag :value="'Post #' + post.id" severity="info" />
      </div>
    </template>

    <!-- Post Content -->
    <template #title>
      <div class="px-3 py-2">
        <div class="text-xl font-bold text-900 line-height-3 mb-2">{{ post.title }}</div>
      </div>
    </template>
    
    <template #content>
      <div class="px-3">
        <p class="text-700 line-height-3 mt-0 mb-4">{{ post.body }}</p>
        
        <!-- Comments Section -->
        <Divider class="my-4" />
        <div class="comments-section">
          <div 
            class="flex align-items-center gap-2 cursor-pointer p-2 hover:surface-100 border-round transition-colors transition-duration-150"
            @click="toggleComments"
          >
            <i :class="['pi', isCommentsVisible ? 'pi-chevron-down' : 'pi-chevron-right', 'text-primary']"></i>
            <span class="font-semibold text-600">
              Yorumlar 
              <Badge :value="comments.length" severity="info" class="ml-2"></Badge>
            </span>
          </div>

          <!-- Comments List -->
          <div v-if="isCommentsVisible" class="mt-3">
            <PostComments :comments="comments" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '../store'
import type { Post } from '../interfaces/Post'
import type { Comment } from '../interfaces/Comment'
import PostComments from './PostComments.vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Divider from 'primevue/divider'

const props = defineProps<{
  post: Post
}>()

const store = useStore()
const isCommentsVisible = ref(false)
const comments = ref<Comment[]>([])
const userName = ref('')

onMounted(async () => {
  if (props.post) {
    // Kullanıcı bilgisini al
    const user = store.getters['user/getUserById'](props.post.userId)
    if (user) {
      userName.value = user.name
    }

    // Post'un yorumlarını al
    await store.dispatch('comment/fetchCommentByPostId', props.post.id)
    comments.value = store.getters['comment/getPostComments']
  }
})

const toggleComments = () => {
  isCommentsVisible.value = !isCommentsVisible.value
}
</script>

<style scoped>
.post-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

:deep(.p-card-content) {
  padding-top: 0 !important;
}
</style>
