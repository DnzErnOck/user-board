<template>
  <div class="home-page p-4">
    <div class="text-center mb-5">
      <h1 class="text-4xl font-bold mb-3">Hoş Geldiniz!</h1>
      <p class="text-xl text-600">User Board uygulamasına hoş geldiniz.</p>
    </div>

    <div class="grid">
      <div class="col-12 md:col-6 lg:col-4">
        <Card class="h-full">
          <template #header>
            <div class="flex align-items-center justify-content-center bg-primary p-3">
              <i class="pi pi-file-edit text-4xl text-white"></i>
            </div>
          </template>
          <template #title>
            <h2 class="text-xl font-semibold mb-2">Postlar</h2>
          </template>
          <template #content>
            <p class="text-600 mb-3">
              Tüm kullanıcıların paylaşımlarını görüntüleyin ve yönetin.
            </p>
            <Button 
              label="Postlara Git" 
              icon="pi pi-arrow-right" 
              class="p-button-outlined w-full"
              @click="router.push('/posts')"
            />
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-6 lg:col-4">
        <Card class="h-full">
          <template #header>
            <div class="flex align-items-center justify-content-center bg-primary p-3">
              <i class="pi pi-users text-4xl text-white"></i>
            </div>
          </template>
          <template #title>
            <h2 class="text-xl font-semibold mb-2">Kullanıcılar</h2>
          </template>
          <template #content>
            <p class="text-600 mb-3">
              Kullanıcı listesini görüntüleyin ve kullanıcı bilgilerini düzenleyin.
            </p>
            <Button 
              label="Kullanıcılara Git" 
              icon="pi pi-arrow-right" 
              class="p-button-outlined w-full"
              @click="router.push('/users')"
            />
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-6 lg:col-4">
        <Card class="h-full">
          <template #header>
            <div class="flex align-items-center justify-content-center bg-primary p-3">
              <i class="pi pi-chart-line text-4xl text-white"></i>
            </div>
          </template>
          <template #title>
            <h2 class="text-xl font-semibold mb-2">İstatistikler</h2>
          </template>
          <template #content>
            <div class="flex flex-column gap-3">
              <div class="flex align-items-center justify-content-between">
                <span class="text-600">Toplam Post</span>
                <Badge :value="totalPosts" severity="info" />
              </div>
              <div class="flex align-items-center justify-content-between">
                <span class="text-600">Toplam Kullanıcı</span>
                <Badge :value="totalUsers" severity="success" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

const router = useRouter()
const store = useStore()

const totalPosts = computed(() => store.getters['post/getAllPosts'].length)
const totalUsers = computed(() => store.getters['user/getAllUsers'].length)
</script>

<style scoped>
.home-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.p-card) {
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.p-card:hover) {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
  

