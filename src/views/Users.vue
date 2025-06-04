<template>
  <DataTable :value="users" class="p-datatable-sm">
    <Column field="name" header="Ad Soyad" />
    <Column field="username" header="Kullanıcı Adı" />
    <Column field="email" header="Email" />
    <Column header="İşlemler">
      <template #body="{ data }">
        <Button
          label="Düzenle"
          icon="pi pi-pencil"
          class="p-button-sm p-button-warning"
          @click="goToEdit(data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from '../store'

const store = useStore()
const router = useRouter()

onMounted(() => {
  store.dispatch('user/fetchUsers')
})

const users = computed(() => store.getters['user/getAllUsers'])

const goToEdit = (id: number) => {
  router.push(`/user/${id}`)
}
</script>
