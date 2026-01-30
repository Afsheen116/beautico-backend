# Beautico E-Commerce Backend 🛒

A production-ready e-commerce backend built using **Node.js, Express, and MongoDB**.  
This project implements core e-commerce features with **JWT authentication**, **role-based access control**, and **scalable API design**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration & login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (USER / ADMIN)

### 🛍️ Products
- Product CRUD APIs
- Admin-only product creation
- Public product listing
- Pagination support (`page`, `limit`)

### ❤️ Wishlist
- Add / remove products from wishlist
- User-specific wishlist management

### 🛒 Cart
- Add products to cart
- Update quantity
- Automatic total price calculation
- Remove items from cart

### 📦 Orders
- Place order directly from cart
- Clear cart after successful checkout
- View logged-in user’s orders
- **Admin-only order status updates**
  - PENDING → PROCESSING → SHIPPED → DELIVERED

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** (Authentication)
- **bcrypt** (Password hashing)
- **Joi** (Request validation – in progress)
- **Helmet & CORS** (Security)




