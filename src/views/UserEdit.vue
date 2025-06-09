<template>
    <div class="card">
      <Toast position="top-right" />
      <h2 class="text-2xl mb-4">Kullanıcı Düzenle</h2>
  
      <div>
        <TabView>
          <TabPanel header="Genel Bilgiler">
            <div class="p-fluid formgrid grid">
              <div class="field col-12 md:col-6">
                <label for="name" :class="{ 'p-error': nameError }">Ad Soyad</label>
                <InputText 
                  id="name" 
                  v-model="name"
                  :class="{ 'p-invalid': nameError }"
                />
                <small class="p-error" v-if="nameError">{{ nameError }}</small>
              </div>
  
              <div class="field col-12 md:col-6">
                <label for="username" :class="{ 'p-error': usernameError }">Kullanıcı Adı</label>
                <InputText 
                  id="username" 
                  v-model="username"
                  :class="{ 'p-invalid': usernameError }"
                />
                <small class="p-error" v-if="usernameError">{{ usernameError }}</small>
              </div>
  
              <div class="field col-12 md:col-6">
                <label for="email" :class="{ 'p-error': emailError }">E-posta</label>
                <InputText 
                  id="email" 
                  v-model="email"
                  type="email"
                  :class="{ 'p-invalid': emailError }"
                />
                <small class="p-error" v-if="emailError">{{ emailError }}</small>
              </div>
  
              <div class="field col-12 md:col-6">
                <label for="phone" :class="{ 'p-error': phoneError }">Telefon</label>
                <InputText 
                  id="phone" 
                  v-model="phone"
                  :class="{ 'p-invalid': phoneError }"
                />
                <small class="p-error" v-if="phoneError">{{ phoneError }}</small>
              </div>
  
              <div class="field col-12">
                <label for="website" :class="{ 'p-error': websiteError }">Website</label>
                <InputText 
                  id="website" 
                  v-model="website"
                  :class="{ 'p-invalid': websiteError }"
                />
                <small class="p-error" v-if="websiteError">{{ websiteError }}</small>
              </div>
            </div>
          </TabPanel>
  
          <TabPanel header="Adres Bilgileri">
            <div class="p-fluid formgrid grid">
              <div class="field col-12 md:col-6">
                <label for="street" :class="{ 'p-error': streetError }">Sokak</label>
                <InputText 
                  id="street" 
                  v-model="street"
                  :class="{ 'p-invalid': streetError }"
                />
                <small class="p-error" v-if="streetError">{{ streetError }}</small>
              </div>
              <div class="field col-12 md:col-6">
                <label for="suite" :class="{ 'p-error': suiteError }">Daire/Suite</label>
                <InputText 
                  id="suite" 
                  v-model="suite"
                  :class="{ 'p-invalid': suiteError }"
                />
                <small class="p-error" v-if="suiteError">{{ suiteError }}</small>
              </div>
              <div class="field col-12 md:col-6">
                <label for="city" :class="{ 'p-error': cityError }">Şehir</label>
                <InputText 
                  id="city" 
                  v-model="city"
                  :class="{ 'p-invalid': cityError }"
                />
                <small class="p-error" v-if="cityError">{{ cityError }}</small>
              </div>
              <div class="field col-12 md:col-6">
                <label for="zipcode" :class="{ 'p-error': zipcodeError }">Posta Kodu</label>
                <InputText 
                  id="zipcode" 
                  v-model="zipcode"
                  :class="{ 'p-invalid': zipcodeError }"
                />
                <small class="p-error" v-if="zipcodeError">{{ zipcodeError }}</small>
              </div>
            </div>
          </TabPanel>
  
          <TabPanel header="Şirket Bilgileri">
            <div class="p-fluid formgrid grid">
              <div class="field col-12">
                <label for="companyName" :class="{ 'p-error': companyNameError }">Şirket Adı</label>
                <InputText 
                  id="companyName" 
                  v-model="companyName"
                  :class="{ 'p-invalid': companyNameError }"
                />
                <small class="p-error" v-if="companyNameError">{{ companyNameError }}</small>
              </div>
              <div class="field col-12">
                <label for="catchPhrase" :class="{ 'p-error': catchPhraseError }">Slogan</label>
                <InputText 
                  id="catchPhrase" 
                  v-model="catchPhrase"
                  :class="{ 'p-invalid': catchPhraseError }"
                />
                <small class="p-error" v-if="catchPhraseError">{{ catchPhraseError }}</small>
              </div>
              <div class="field col-12">
                <label for="bs" :class="{ 'p-error': bsError }">İş Alanı</label>
                <InputText 
                  id="bs" 
                  v-model="bs"
                  :class="{ 'p-invalid': bsError }"
                />
                <small class="p-error" v-if="bsError">{{ bsError }}</small>
              </div>
            </div>
          </TabPanel>
        </TabView>
  
        <div class="mt-4 flex gap-2">
          <Button 
            label="Kaydet" 
            icon="pi pi-save" 
            :loading="isSubmitting"
            :disabled="!isFormValid"
            @click="submitForm"
          />
          <Button 
            type="button" 
            label="İptal" 
            icon="pi pi-times" 
            severity="secondary" 
            class="p-button-outlined" 
            @click="router.push('/users')" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '../store'
  import { useRouter } from 'vue-router'
  import { useField, useForm } from 'vee-validate'
  import * as yup from 'yup'
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
  
  // Validation şeması ve form ayarları
  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Ad Soyad alanı zorunludur')
      .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
      .max(50, 'Ad Soyad en fazla 50 karakter olabilir'),
    username: yup.string()
      .required('Kullanıcı adı zorunludur')
      .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır')
      .max(20, 'Kullanıcı adı en fazla 20 karakter olabilir')
      .matches(/^[a-zA-Z0-9_]+$/, 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir'),
    email: yup.string()
      .required('E-posta alanı zorunludur')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        'Geçerli bir e-posta adresi giriniz (örnek: kullanici@domain.com)'
      ),
    phone: yup.string()
      .required('Telefon alanı zorunludur'),
    website: yup.string()
      .required('Website alanı zorunludur')
      .matches(
        /^@?(?:https?:\/\/)?[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?$/,
        'Geçerli bir website adresi giriniz (Örnek: www.example.com veya @example.com)'
      )
      .test('domain-extension', 'Website geçerli bir uzantı ile bitmelidir (.com, .org, .net vb.)', (value) => {
        if (!value) return true;
        const validExtensions = ['.com', '.org', '.net', '.edu', '.gov', '.io', '.co', '.biz', '.info'];
        return validExtensions.some(ext => value.toLowerCase().endsWith(ext));
      }),
    address: yup.object({
      street: yup.string().required('Sokak alanı zorunludur'),
      suite: yup.string().required('Daire/Suite alanı zorunludur'),
      city: yup.string().required('Şehir alanı zorunludur'),
      zipcode: yup.string().required('Posta kodu zorunludur')
    }),
    company: yup.object({
      name: yup.string().required('Şirket adı zorunludur'),
      catchPhrase: yup.string().required('Slogan zorunludur'),
      bs: yup.string().required('İş alanı zorunludur')
    })
  })
  
  const { isSubmitting, validate } = useForm({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      'address.street': '',
      'address.suite': '',
      'address.city': '',
      'address.zipcode': '',
      'company.name': '',
      'company.catchPhrase': '',
      'company.bs': ''
    }
  })
  
  // Her alan için useField kullanımı
  const { value: name, errorMessage: nameError } = useField<string>('name')
  const { value: username, errorMessage: usernameError } = useField<string>('username')
  const { value: email, errorMessage: emailError } = useField<string>('email')
  const { value: phone, errorMessage: phoneError } = useField<string>('phone')
  const { value: website, errorMessage: websiteError } = useField<string>('website')

  // Adres alanları için useField
  const { value: street, errorMessage: streetError } = useField<string>('address.street', undefined, {
    label: 'Sokak'
  })
  const { value: suite, errorMessage: suiteError } = useField<string>('address.suite', undefined, {
    label: 'Daire/Suite'
  })
  const { value: city, errorMessage: cityError } = useField<string>('address.city', undefined, {
    label: 'Şehir'
  })
  const { value: zipcode, errorMessage: zipcodeError } = useField<string>('address.zipcode', undefined, {
    label: 'Posta Kodu'
  })

  // Şirket alanları için useField
  const { value: companyName, errorMessage: companyNameError } = useField<string>('company.name', undefined, {
    label: 'Şirket Adı'
  })
  const { value: catchPhrase, errorMessage: catchPhraseError } = useField<string>('company.catchPhrase', undefined, {
    label: 'Slogan'
  })
  const { value: bs, errorMessage: bsError } = useField<string>('company.bs', undefined, {
    label: 'İş Alanı'
  })
  
  // Kullanıcıyı çekiyoruz
  onMounted(async () => {
    let user = store.getters['user/getUserById'](userId)
    if (!user) {
      await store.dispatch('user/fetchUserById', userId)
      user = store.getters['user/getUserById'](userId)
    }
    if (user) {
      name.value = user.name || ''
      username.value = user.username || ''
      email.value = user.email || ''
      phone.value = user.phone || ''
      website.value = user.website || ''
      street.value = user.address?.street || ''
      suite.value = user.address?.suite || ''
      city.value = user.address?.city || ''
      zipcode.value = user.address?.zipcode || ''
      companyName.value = user.company?.name || ''
      catchPhrase.value = user.company?.catchPhrase || ''
      bs.value = user.company?.bs || ''

      // Başlangıç değerlerini set ettikten sonra validate et
      await validate()
    }
  })
  
  
  // Form durumu için computed
  const hasErrors = computed(() => {
    return [
      nameError.value,
      usernameError.value,
      emailError.value,
      phoneError.value,
      websiteError.value,
      streetError.value,
      suiteError.value,
      cityError.value,
      zipcodeError.value,
      companyNameError.value,
      catchPhraseError.value,
      bsError.value
    ].some(error => error !== undefined && error !== null && error !== '')
  })
  
  const isFormValid = computed(() => {
    const allFieldsFilled = 
      (name.value || '').trim() !== '' && 
      (username.value || '').trim() !== '' && 
      (email.value || '').trim() !== '' && 
      (phone.value || '').trim() !== '' && 
      (website.value || '').trim() !== '' && 
      (street.value || '').trim() !== '' && 
      (suite.value || '').trim() !== '' && 
      (city.value || '').trim() !== '' && 
      (zipcode.value || '').trim() !== '' && 
      (companyName.value || '').trim() !== '' && 
      (catchPhrase.value || '').trim() !== '' && 
      (bs.value || '').trim() !== ''

    return allFieldsFilled && !hasErrors.value && !isSubmitting.value
  })
  
  // Form submit fonksiyonunu güncelle
  const submitForm = async () => {
    try {
      console.log('Submit başladı')
      
      // Tüm form alanlarını validate et
      const result = await validate()
      console.log('Validation result:', result)
      
      if (!result.valid) {
        toast.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Lütfen tüm alanları doldurun ve hataları düzeltin',
          life: 3000
        })
        return
      }

      // Form verilerini hazırla
      const formData = {
        id: userId,
        name: name.value,
        username: username.value,
        email: email.value,
        phone: phone.value,
        website: website.value,
        address: {
          street: street.value,
          suite: suite.value,
          city: city.value,
          zipcode: zipcode.value,
          geo: { lat: '', lng: '' }
        },
        company: {
          name: companyName.value,
          catchPhrase: catchPhrase.value,
          bs: bs.value
        }
      }

      console.log('Form verileri:', formData)

      // API çağrısı yap
      await store.dispatch('user/updateUser', formData)

      // Başarılı mesajı göster
      toast.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Kullanıcı bilgileri güncellendi',
        life: 3000
      })

      // Kullanıcı listesine yönlendir
      setTimeout(() => {
        router.push('/users')
      }, 1000)
    } catch (error) {
      console.error('Form submit hatası:', error)
      toast.add({
        severity: 'error',
        summary: 'Hata',
        detail: 'Kullanıcı güncellenirken bir hata oluştu',
        life: 3000
      })
    }
  }
  </script>
  
  <style scoped>
  .p-invalid {
    border-color: var(--red-500) !important;
  }
  
  label.p-error {
    color: var(--red-500);
  }
  
  .field {
    margin-bottom: 1.5rem;
  }
  
  .p-error {
    color: var(--red-500);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  /* Zorunlu alan yıldızı */
  label:not(.p-error)::after {
    content: " *";
    color: var(--red-500);
  }
  </style>
  