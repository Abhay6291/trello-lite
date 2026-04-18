# 🚀 Trello Lite (Kanban Task Manager)

A modern, minimal, and fully responsive **Kanban-style task management web application** designed for individuals and teams to organize work efficiently. Built with a focus on clean UI/UX, performance, and real-world production deployment.

---

## ✨ Features

- 🔐 **Authentication**
  - Secure JWT-based login & registration  
- 📋 **Board Management**
  - Create, view, and delete boards  
- 📝 **Task Management**
  - Add, edit, delete tasks  
  - Set task status (Todo / Doing / Done)  
- 🎯 **Drag & Drop**
  - Smooth task movement between columns  
- 🎨 **Modern UI/UX**
  - Dark & Light theme support  
  - Glassmorphism + premium animations  
  - Custom cursor & interactive effects  
- ⚡ **Real-time Experience**
  - Instant UI updates after actions  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React DnD
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📦 Installation (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/trello-lite.git
cd trello-lite
```
---
### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
---

### Create .env file:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
```
---
Run backend:
```
npm run dev
```
---
### 3️⃣ Setup Frontend
```
cd frontend
npm install
```
---
### Create .env:
```
VITE_API_URL=http://localhost:5000/api
```
---
### Run frontend:
```
npm run dev
```
---
## 👨‍💻 Author
**Abhay S Ingale**

**💻 Frontend Developer | React Enthusiast | Interested in Cybersecurity**

### ⭐ Show Your Support

If you like this project:
- ⭐ Star the repo
- 🍴 Fork it
- 📢 Share it
