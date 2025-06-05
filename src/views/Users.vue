<template>
  <div class="users-page p-4">
    <Toast />
    <ConfirmDialog>
      <template #message="slotProps">
        <div class="flex flex-column align-items-center gap-3 py-4">
          <i class="pi pi-exclamation-circle text-6xl text-red-500"></i>
          <span class="text-center text-900 text-xl">
            {{ slotProps.message.message }}
            <br>
            <small class="text-600 block mt-2">Bu işlem geri alınamaz.</small>
          </span>
        </div>
      </template>
    </ConfirmDialog>

    <div class="mb-4">
      <h1 class="text-4xl font-bold flex align-items-center gap-2">
        Kullanıcılar
      </h1>
      <p class="text-600">Sistemdeki tüm kullanıcılar</p>
    </div>

    <div v-if="loading" class="flex justify-content-center p-4">
      <ProgressSpinner />
    </div>

    <div v-else>
      <DataTable 
        :value="users" 
        :paginator="true" 
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        class="p-datatable-sm"
      >
        <Column field="id"  style="width: 5%">
          <template #body="{ data }">
            <span class="text-600">{{ data.id }}</span>
          </template>
        </Column>
        
        <Column field="name" header="Ad Soyad">
          <template #body="{ data }">
            <div class="flex align-items-center gap-2 cursor-pointer" @click="navigateToUserPosts(data.id)">
              <span>{{ data.name }}</span>
            </div>
          </template>
        </Column>
        
        <Column field="username" header="Kullanıcı Adı" />
        
        <Column field="email" header="Email" />
        
        <Column field="website" header="Website" style="width: 20%">
          <template #body="{ data }">
            <span>{{ data.website }}</span>
          </template>
        </Column>

        <Column header="İşlemler" style="width: 15%">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                class="p-button-text p-button-plain"
                v-tooltip.top="'Düzenle'"
                @click="goToEdit(data.id)"
              />
              <Button
                icon="pi pi-file-edit"
                class="p-button-text p-button-plain"
                v-tooltip.top="'Postları Görüntüle'"
                @click="navigateToUserPosts(data.id)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-text p-button-danger"
                v-tooltip.top="'Sil'"
                @click="confirmDelete(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from 'primevue/usetoast'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

const store = useStore()
const router = useRouter()
const loading = ref(true)
const confirm = useConfirm()
const toast = useToast()

onMounted(async () => {
  try {
    await store.dispatch('user/fetchUsers')
  } finally {
    loading.value = false
  }
})

const users = computed(() => store.getters['user/getAllUsers'])

const goToEdit = (id: number) => {
  router.push(`/user/${id}`)
}

const navigateToUserPosts = (userId: number) => {
  router.push({ 
    name: 'posts',
    query: { userId: userId.toString() }
  })
}

const confirmDelete = (user: any) => {
  confirm.require({
    message: `${user.name} isimli kullanıcıyı silmek istediğinize emin misiniz?`,
    header: 'Kullanıcı Silme',
    icon: 'pi pi-exclamation-circle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Evet, Sil',
    rejectLabel: 'Vazgeç',
    accept: () => handleDelete(user.id),
    reject: () => {
      toast.add({ severity: 'info', summary: 'İptal', detail: 'Silme işlemi iptal edildi', life: 3000 })
    }
  })
}

const handleDelete = async (userId: number) => {
  try {
    await store.dispatch('user/deleteUser', userId)
    toast.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarıyla silindi', life: 3000 })
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Hata', detail: 'Kullanıcı silinirken bir hata oluştu', life: 3000 })
  }
}
</script>

<style scoped>
:deep(.p-datatable) {
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: var(--surface-100);
  color: var(--surface-900);
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: var(--surface-50);
}

.p-datatable >>> .p-datatable-tbody > tr:hover {
  background: var(--surface-100);
  cursor: pointer;
}
</style>
