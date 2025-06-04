<template>
  <div class="layout surface-ground">
    <!-- Menübar -->
    <Menubar :model="menuItems" class="shadow-2 surface-card mb-3 px-3">
      <template #start>
        <!-- <img src="/logo.png" height="40" class="mr-2" /> -->
        <span class="text-xl font-bold text-primary">User Board</span>
      </template>
      <template #end>
        <Button icon="pi pi-user" class="p-button-rounded p-button-text" />
      </template>
    </Menubar>

    <!-- Ana içerik -->
    <div class="layout-content px-4 py-3">
      <div class="surface-card shadow-2 border-round p-4">
        <slot></slot>
      </div>
    </div>

    <!-- Footer -->
    <div class="layout-footer surface-card shadow-2 p-3 text-center text-600">
      <Divider class="mb-3" />
      <small>© 2024 User Board. Tüm hakları saklıdır.</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuItems = ref([
  {
    label: 'Ana Sayfa',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Kullanıcılar',
    icon: 'pi pi-users',
    items: [
      {
        label: 'Kullanıcı Listesi',
        icon: 'pi pi-list',
        command: () => router.push('/users')
      },
    
    ]
  },
 
]);
</script>

<style>
/* Global styles */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.layout-footer {
  margin-top: 2rem;
}

/* Override PrimeVue menubar styles */
.p-menubar {
  border: none !important;
  border-radius: 0 !important;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-text {
  font-weight: 500;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .layout-content {
    padding: 1rem;
  }
}
</style>
  