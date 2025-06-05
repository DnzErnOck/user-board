<template>
  <div class="layout surface-ground">
    <!-- Menübar -->
    <div class="layout-menubar">
      <div class="flex align-items-center justify-content-between container">
        <div class="flex align-items-center gap-2">
          <i class="pi pi-box text-xl text-700"></i>
          <span class="text-xl font-semibold text-800">User Board</span>
        </div>
        
        <div class="menu-items flex align-items-center gap-3">
          <Button 
            v-for="item in menuItems" 
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
            :class="['p-button-text', { 'menu-item-active': isActive(item.path) }]"
            @click="item.command"
          />
        </div>
      </div>
    </div>

    <!-- Ana içerik -->
    <div class="layout-content px-4 py-3">
      <div class="surface-card shadow-2 border-round p-4">
        <slot></slot>
      </div>
    </div>

    <!-- Footer -->
    <div class="layout-footer surface-card p-3 text-center text-600">
      <Divider class="mb-3" />
      <small>© 2024 User Board. Tüm hakları saklıdır.</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();
const route = useRoute();

const menuItems = ref([
  {
    label: 'Ana Sayfa',
    icon: 'pi pi-home',
    path: '/',
    command: () => router.push('/')
  },
  {
    label: 'Postlar',
    icon: 'pi pi-file-edit',
    path: '/posts',
    command: () => router.push('/posts')
  },
  {
    label: 'Kullanıcılar',
    icon: 'pi pi-users',
    path: '/users',
    command: () => router.push('/users')
  }
]);

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<style>
/* Global styles */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fafafa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
}

.layout-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.layout-footer {
  margin-top: 2rem;
  border-top: 1px solid var(--surface-200);
  background: white !important;
}

/* Menubar styles */
.layout-menubar {
  background: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #f1f5f9;
}

.menu-items {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.menu-items .p-button.p-button-text {
  padding: 0.5rem 1rem;
  font-weight: 400;
  color: #64748b;
  transition: color 0.3s ease;
  background: transparent;
  border-radius: 0;
  position: relative;
}

.menu-items .p-button.p-button-text::before,
.menu-items .p-button.p-button-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #0ea5e9;
}

.menu-items .p-button.p-button-text::before {
  left: 50%;
  width: 0;
  transition: width 0.3s ease-out;
}

.menu-items .p-button.p-button-text::after {
  right: 50%;
  width: 0;
  transition: width 0.3s ease-out;
}

.menu-items .p-button.p-button-text:not(.menu-item-active):hover {
  background: transparent;
  color: #0f172a;
}

.menu-items .p-button.p-button-text:hover::before,
.menu-items .p-button.p-button-text:hover::after {
  width: 25%;
}

.menu-items .p-button.menu-item-active {
  background: transparent;
  color: #0f172a;
  font-weight: 500;
}

.menu-items .p-button.menu-item-active::before,
.menu-items .p-button.menu-item-active::after {
  width: 50%;
}

.menu-items .p-button.p-button-text .p-button-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.menu-items .p-button.p-button-text:hover .p-button-icon {
  color: #0f172a;
}

.menu-items .p-button.menu-item-active .p-button-icon {
  color: #0f172a;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .menu-items {
    position: static;
    transform: none;
    margin-left: 1rem;
    gap: 0.5rem;
  }
  
  .menu-items .p-button.p-button-text {
    padding: 0.5rem;
  }
  
  .menu-items .p-button.p-button-text .p-button-label {
    font-size: 0.875rem;
  }
  
  .menu-items .p-button.p-button-text .p-button-icon {
    font-size: 0.875rem;
  }
}
</style>
  