import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue ve gerekli bileşenler
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import Divider from 'primevue/divider';

// CSS dosyalarını dahil et
import 'primevue/resources/themes/saga-blue/theme.css';  // Temayı seç
import 'primevue/resources/primevue.min.css';            // PrimeVue temel stilleri
import 'primeicons/primeicons.css';                       // İkonlar
import 'primeflex/primeflex.css';                         // Flex yardımcıları
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { store, key } from './store'
const app = createApp(App);

// PrimeVue eklentisini kullan
app.use(PrimeVue);

// Router ve Vuex store'u kullan
app.use(router);
app.use(store, key);

// PrimeVue bileşenlerini global olarak kaydet
app.component('Button', Button);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.component('Divider', Divider);
app.component('DataTable', DataTable)
app.component('Column', Column)

// Uygulamayı mount et
app.mount('#app');
