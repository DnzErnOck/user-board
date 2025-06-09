# User Board - Vue 3 Kullanıcı Yönetim Paneli

Bu proje, Vue 3, TypeScript ve PrimeVue kullanılarak geliştirilmiş modern bir kullanıcı yönetim panelidir.

## Özellikler

- 🚀 Vue 3 + TypeScript + Vite
- 🎨 PrimeVue UI Bileşenleri
- ✨ Form Validasyonu (vee-validate + yup)
- 📱 Responsive Tasarım
- 🔄 State Management (Vuex)
- 🛣️ Vue Router ile Sayfa Yönetimi

## Başlangıç

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd user-board
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda açın:
```
http://localhost:5173
```

## Proje Yapısı

```
src/
├── assets/          # Statik dosyalar (resimler, stiller)
├── components/      # Yeniden kullanılabilir Vue bileşenleri
├── router/          # Vue Router yapılandırması
├── store/          # Vuex store modülleri
├── types/          # TypeScript tip tanımlamaları
└── views/          # Sayfa bileşenleri
```

## Özellikler Detayı

### Kullanıcı Yönetimi
- Kullanıcı Listesi Görüntüleme
- Kullanıcı Ekleme/Düzenleme/Silme
- Detaylı Form Validasyonu
- Kullanıcı Postlarını Görüntüleme

### Form Validasyonu
- Ad Soyad: Minimum 3, maksimum 50 karakter
- Kullanıcı Adı: Alfanumerik karakterler ve alt çizgi
- E-posta: Geçerli e-posta formatı kontrolü
- Website: Geçerli URL formatı ve uzantı kontrolü
- Adres ve Şirket Bilgileri için Zorunlu Alan Kontrolleri

### UI Bileşenleri
- Responsive Tablo
- Form Elemanları
- Toast Bildirimleri
- Onay Dialogları
- Tab Panelleri

## Kullanılan Teknolojiler

- [Vue 3](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [PrimeVue](https://primevue.org/)
- [Vee-Validate](https://vee-validate.logaretm.com/v4/)
- [Yup](https://github.com/jquense/yup)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)

## API Entegrasyonu

Proje, [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API'sini kullanmaktadır:
- `/users` - Kullanıcı listesi
- `/users/{id}` - Kullanıcı detayları
- `/users/{id}/posts` - Kullanıcı postları

## Geliştirme

### Derleme
```bash
npm run build
# veya
yarn build
```

### Lint
```bash
npm run lint
# veya
yarn lint
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
