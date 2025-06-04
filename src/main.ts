import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue ve gerekli bileşenler
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';

// CSS dosyalarını dahil et
import 'primevue/resources/themes/saga-blue/theme.css';  // Temayı seç
import 'primevue/resources/primevue.min.css';            // PrimeVue temel stilleri
import 'primeicons/primeicons.css';                       // İkonlar
import 'primeflex/primeflex.css';                         // Flex yardımcıları

const app = createApp(App);

// PrimeVue eklentisini kullan
app.use(PrimeVue);

// Router ve Vuex store'u kullan
app.use(router);

// PrimeVue bileşenlerini global olarak kaydet
app.component('Button', Button);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('InputText', InputText);

// Uygulamayı mount et
app.mount('#app');
