<template>
    <div class="card">
      <h2 class="text-2xl mb-4">Kullanıcı Düzenle</h2>
  
      <TabView>
        <TabPanel header="Genel Bilgiler">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="name">Ad Soyad</label>
              <InputText id="name" v-model="form.name" />
            </div>
  
            <div class="field col-12 md:col-6">
              <label for="username">Kullanıcı Adı</label>
              <InputText id="username" v-model="form.username" />
            </div>
  
            <div class="field col-12">
              <label for="email">E-posta</label>
              <InputText id="email" v-model="form.email" />
            </div>
          </div>
        </TabPanel>
  
        <TabPanel header="Adres Bilgileri">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="city">Şehir</label>
              <InputText id="city" v-model="form.address.city" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="street">Sokak</label>
              <InputText id="street" v-model="form.address.street" />
            </div>
          </div>
        </TabPanel>
      </TabView>
  
      <div class="mt-4">
        <Button label="Kaydet" icon="pi pi-save" @click="submitForm" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '../store'
  import { useRouter } from 'vue-router'
  import InputText from 'primevue/inputtext'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import Button from 'primevue/button'
  
  // Route ve Store
  const route = useRoute()
  const store = useStore()
  const router = useRouter()
  
  // Kullanıcı ID'si route parametresinden alınıyor
  const userId = Number(route.params.id)
  const form = ref({
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      city: '',
      street: ''
    }
  })
  
  // Kullanıcıyı çekiyoruz
  onMounted(async () => {
    let user = store.getters['user/getUserById'](userId)
    if (!user) {
    // Yoksa API’den çek ve store’a yükle
      await store.dispatch('user/fetchUserById', userId)
      user = store.getters['user/getUserById'](userId)
      form.value = JSON.parse(JSON.stringify(user))
    }
    if (user) {
      form.value = JSON.parse(JSON.stringify(user)) // Deep copy
    }
  })
  
  // Form submit
  const submitForm = () => {
    console.log('Güncellenmiş kullanıcı:', form.value)
    // Güncelleme işlemini burada servise gönderirsin veya store mutation yazarsın
    router.push('/') // Ana sayfaya yönlendirme
  }
  </script>
  