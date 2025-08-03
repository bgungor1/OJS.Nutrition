# 🥤 Nutrition Store - React + TypeScript Project

Bu proje, supplement (besin takviyesi) odaklı bir e-ticaret sitesidir. Kullanıcılar ürünleri inceleyebilir, filtreleyebilir, yorum yapabilir, sepetlerine ekleyebilir ve hesap bilgilerini yönetebilir. Proje [supplementler.com](https://www.supplementler.com/) benzeri bir yapıya sahiptir.

---

## 🚀 Proje Teknolojileri

| Amaç                          | Önerilen Araç / Kütüphane                     |
|-------------------------------|-----------------------------------------------|
| Stil                          | **TailwindCSS**, **Shadcn UI**                |
| Router                        | **React Router DOM**                          |
| Form & Doğrulama              | **react-hook-form** + **zod**                 |
| Global State (Sepet vs.)     | **Zustand**                                   |
| API İstekleri                 | **Axios**                                     |
| Auth                          | **JWT** + **Context API** (isteğe bağlı Clerk/Supabase) |
| Animasyon                     | **Framer Motion**                             |
| İkon                          | **Lucide Icons**, **Heroicons**               |

---

## 📁 Proje Klasör Yapısı

```bash
src/
├── components/       # UI bileşenleri (ProductCard, Button, Modal, vs.)
├── pages/            # Sayfa bileşenleri (Home, ProductDetail, Login, vs.)
├── routes/           # Tüm route yapısı
├── services/         # API fonksiyonları
├── hooks/            # Özel React hook'ları
├── store/            # Zustand global state
├── types/            # TypeScript tip tanımları
├── utils/            # Yardımcı fonksiyonlar
└── assets/           # Görseller, ikonlar
```

---

## 🛍️ Sayfa ve Özellik Listesi

### Ana Sayfa
- Çok satan ürünler
- Kategorilere göre filtre
- Arama özelliği

### 📦 Ürün Listeleme
- Kart görünüm
- Filtreleme (kategori, fiyat, marka)
- Sıralama (fiyat, puan, yenilik)

### 🔍 Ürün Detay Sayfası
- Görsel galerisi
- Açıklama ve içerik
- Kullanıcı yorumları
- Sepete ekleme

### 🛒 Sepet
- Ürün adedi artır/azalt
- Toplam fiyat
- Sepetten çıkarma

### 👤 Kullanıcı İşlemleri
- Giriş / Kayıt ol
- Hesap bilgilerim
- Sipariş geçmişi

### 💬 Kullanıcı Yorumları
- Ürünlere yıldızlı puanlama
- Yorum bırakma
- Önceki yorumları görme

### ❓ Sıkça Sorulan Sorular (SSS)
- Accordion yapısı ile sorular ve cevaplar

### 📬 İletişim Sayfası
- Ad, e-posta, mesaj alanı
- Form doğrulama ve gönderim

---

## 🧪 Kullanılan Dummy Data

Proje geliştirme sürecinde, sahte ürün verileri (`/data/products.ts`) kullanılmaktadır. Her ürün aşağıdaki bilgileri içerir:

- `id`: Ürün ID'si
- `name`: Ürün adı
- `brand`: Marka
- `category`: Kategori (Protein, Kreatin, BCAA, vb.)
- `description`: Açıklama
- `ingredients`: İçindekiler
- `price`: Fiyat
- `imageUrl`: Görsel bağlantısı
- `rating`: Puan (1–5)
- `reviewsCount`: Yorum sayısı
- `isBestseller`: Çok satanlar etiketi

---

## ⚙️ Kurulum

```bash
git clone https://github.com/kullaniciadi/nutrition-store.git
cd nutrition-store
npm install
npm run dev
```

### Shadcn bileşenleri için ilk kurulum:

```bash
npx shadcn-ui@latest init
```

---

## 🚀 Geliştirme

Projeyi geliştirme modunda çalıştırmak için:

```bash
npm run dev
```

Tarayıcınızda [http://localhost:5173](http://localhost:5173) adresini açın.

---

## 📦 Build

Projeyi production için build etmek için:

```bash
npm run build
```

---

## 🧪 Test

Testleri çalıştırmak için:

```bash
npm run test
```

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
