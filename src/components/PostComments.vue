<template>
  <div class="post-comments">
    <div v-for="comment in comments" :key="comment.id" 
      class="p-3 border-1 border-300 mb-2 border-round hover:surface-100 transition-colors transition-duration-150">
      <div class="flex flex-column gap-2">
        <div class="flex align-items-center justify-content-between">
          <div class="flex align-items-center gap-2">
            <div class="w-2rem h-2rem border-circle bg-blue-50 flex align-items-center justify-content-center">
              <i class="pi pi-comment text-blue-500 text-sm"></i>
            </div>
            <span class="font-semibold text-900">{{ comment.name }}</span>
          </div>
          <Chip :label="comment.email" icon="pi pi-envelope" class="text-sm" />
        </div>
        <p class="text-700 line-height-3 m-0">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '../interfaces/Comment'
import Chip from 'primevue/chip'

defineProps<{
  comments: Comment[]
}>()
</script>

<style scoped>
.post-comments {
  max-height: 400px;
  overflow-y: auto;
}

.post-comments::-webkit-scrollbar {
  width: 6px;
}

.post-comments::-webkit-scrollbar-track {
  background: var(--surface-100);
  border-radius: 10px;
}

.post-comments::-webkit-scrollbar-thumb {
  background: var(--surface-300);
  border-radius: 10px;
}

.post-comments::-webkit-scrollbar-thumb:hover {
  background: var(--surface-400);
}
</style>
