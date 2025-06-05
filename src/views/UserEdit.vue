<template>
    <div class="card">
      <Toast position="top-right" />
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
  
            <div class="field col-12 md:col-6">
              <label for="email">E-posta</label>
              <InputText id="email" v-model="form.email" type="email" />
            </div>
  
            <div class="field col-12 md:col-6">
              <label for="phone">Telefon</label>
              <InputText id="phone" v-model="form.phone" />
            </div>
  
            <div class="field col-12">
              <label for="website">Website</label>
              <InputText id="website" v-model="form.website" />
            </div>
          </div>
        </TabPanel>
  
        <TabPanel header="Adres Bilgileri">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="street">Sokak</label>
              <InputText id="street" v-model="form.address.street" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="suite">Daire/Suite</label>
              <InputText id="suite" v-model="form.address.suite" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="city">Şehir</label>
              <InputText id="city" v-model="form.address.city" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="zipcode">Posta Kodu</label>
              <InputText id="zipcode" v-model="form.address.zipcode" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="lat">Enlem</label>
              <InputText id="lat" v-model="form.address.geo.lat" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="lng">Boylam</label>
              <InputText id="lng" v-model="form.address.geo.lng" />
            </div>
          </div>
        </TabPanel>
  
        <TabPanel header="Şirket Bilgileri">
          <div class="p-fluid formgrid grid">
            <div class="field col-12">
              <label for="companyName">Şirket Adı</label>
              <InputText id="companyName" v-model="form.company.name" />
            </div>
            <div class="field col-12">
              <label for="catchPhrase">Slogan</label>
              <InputText id="catchPhrase" v-model="form.company.catchPhrase" />
            </div>
            <div class="field col-12">
              <label for="bs">İş Alanı</label>
              <InputText id="bs" v-model="form.company.bs" />
            </div>
          </div>
        </TabPanel>
      </TabView>
  
      <div class="mt-4 flex gap-2">
        <Button label="Kaydet" icon="pi pi-save" @click="submitForm" />
        <Button label="İptal" icon="pi pi-times" severity="secondary" class="p-button-outlined" @click="router.push('/users')" />
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
  import { useToast } from 'primevue/usetoast'
  
  // Route ve Store
  const route = useRoute()
  const store = useStore()
  const router = useRouter()
  const toast = useToast()
  // Kullanıcı ID'si route parametresinden alınıyor
  const userId = Number(route.params.id)
  const form = ref({
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  })
  
  // Kullanıcıyı çekiyoruz
  onMounted(async () => {
    let user = store.getters['user/getUserById'](userId)
    if (!user) {
    // Yoksa API'den çek ve store'a yükle
      await store.dispatch('user/fetchUserById', userId)
      user = store.getters['user/getUserById'](userId)
      form.value = JSON.parse(JSON.stringify(user))
    }
    if (user) {
      form.value = JSON.parse(JSON.stringify(user)) // Deep copy
    }
  })
  
  // Form submit
  const submitForm = async () => {
    try {
        await store.dispatch('user/updateUser', form.value)
        toast.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Kullanıcı bilgileri güncellendi',
            life: 3000
        })
        setTimeout(() => {
            router.push('/users')
        }, 1000)
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Kullanıcı güncellenirken bir hata oluştu',
            life: 3000
        })
        console.error('Güncelleme hatası:', error)
    }
}
  </script>
  