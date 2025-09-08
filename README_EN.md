# 🥤 Nutrition Store - React + TypeScript Project

English | [Türkçe](./README.md)

This project is a supplement-focused e-commerce website. Users can browse products, filter them, leave reviews, add items to their cart, and manage their account information.

---

## 🚀 Project Technologies

| Purpose                        | Recommended Tool / Library                    |
|-------------------------------|-----------------------------------------------|
| Styling                       | **TailwindCSS**, **Shadcn UI**                |
| Router                        | **React Router DOM**                          |
| Forms & Validation            | **react-hook-form** + **zod**                 |
| Global State (Cart etc.)     | **Zustand**                                   |
| API Requests                  | **Axios**                                     |
| Authentication                | **JWT** + **Context API**                    |
| Animation                     | **Framer Motion**                             |
| Icons                         | **Lucide Icons**, **Heroicons**               |

---

## 📁 Project Folder Structure

```bash
src/
├── components/       # UI components (ProductCard, Button, Modal, etc.)
├── pages/            # Page components (Home, ProductDetail, Login, etc.)
├── routes/           # All route structure
├── services/         # API functions
├── hooks/            # Custom React hooks
├── store/            # Zustand global state
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── assets/           # Images, icons
```

---

## 🛍️ Pages and Features List

### Home Page
- Best-selling products
- Category filters
- Search functionality

### 📦 Product Listing
- Card view
- Filtering (category, price, brand)
- Sorting (price, rating, newest)

### 🔍 Product Detail Page
- Image gallery
- Description and content
- User reviews
- Add to cart

### 🛒 Shopping Cart
- Increase/decrease product quantity
- Total price
- Remove from cart

### 👤 User Operations
- Login / Register
- My account information
- Order history

### 💬 User Reviews
- Star rating for products
- Leave comments
- View previous reviews

### ❓ Frequently Asked Questions (FAQ)
- Accordion structure with questions and answers

### 📬 Contact Page
- Name, email, message fields
- Form validation and submission

---

## 🧪 Dummy Data Used

During the project development process, fake product data (`/data/products.ts`) is used. Each product contains the following information:

- `id`: Product ID
- `name`: Product name
- `brand`: Brand
- `category`: Category (Protein, Creatine, BCAA, etc.)
- `description`: Description
- `ingredients`: Ingredients
- `price`: Price
- `imageUrl`: Image URL
- `rating`: Rating (1–5)
- `reviewsCount`: Number of reviews
- `isBestseller`: Bestseller tag

---

## ⚙️ Installation

```bash
git clone https://github.com/username/nutrition-store.git
cd nutrition-store
npm install
npm run dev
```

### Initial setup for Shadcn components:

```bash
npx shadcn-ui@latest init
```

---

## 🚀 Development

To run the project in development mode:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build

To build the project for production:

```bash
npm run build
```

---

## 🧪 Test

To run tests:

```bash
npm run test
```

---

## 📝 License

This project is licensed under the MIT License.
