
---

### **Backend README (`server/README.md`)**

### NoteNest 📝 - Backend

This is the **backend API** for **NoteNest**, responsible for storing, retrieving, and managing notes. The backend is built using **Node.js** and **Express.js**, with **MongoDB** as the database.

## 🚀 Features

- **User authentication using Auth0**
- **CRUD operations on notes**
- **RESTful API with JSON responses**
- **MongoDB for persistent storage**
- **CORS support for frontend integration**
- **Secure environment variables**

## 🛠️ Tech Stack

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables management

## 📂 Folder Structure

```sh
/backend 
│── /routes # API routes 
│── /controllers # Route logic 
│── /models # Mongoose schemas 
│── /middleware # Authentication and security 
|──  /DB     # Database connection 
│── app.js # Entry point 
│── .env # Environment variables 
│── README.md # Documentation 
│── package.json # Dependencies
```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/codERSunny812/Modstack.ai.git
cd Modstack.ai-server
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

```ini
PORT=3001
MONGO_URI=your-mongodb-uri
```

### 4️⃣ Start the Backend Server

```sh
npm start
```

### 🔗 API Endpoints

## 🔗 API Endpoints

| Method | Endpoint                  | Description                 |
|--------|---------------------------|-----------------------------|
| GET    | `/create/get-notes`       | Fetch all notes            |
| POST   | `/create/create-notes`    | Add a new note             |
| PUT    | `/create/update-notes/:id`| Update a note              |
| DELETE | `/create/delete-notes/:id`| Delete a note              |
