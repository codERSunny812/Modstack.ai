# NoteNest 📝 - Frontend

Welcome to **NoteNest**, a **multi-tenant note-taking application** built with **React.js** and **Auth0 authentication**. This repository contains the frontend code, which interacts with the backend to manage user notes.

## 🚀 Features

- **Auth0 Authentication** (Login/Logout)
- **Create, Read, Update, and Delete (CRUD) notes**
- **Persistent storage using a backend API**
- **Filter notes by status (All, Completed, Pending)**
- **Fully responsive design**
- **Dark-themed UI**

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **Auth0** - User authentication
- **Tailwind CSS** - Styling
- **REST API** - Backend communication
- **LocalStorage** - Temporary storage

## 📂 Folder Structure

```bash
/client
│── /src  
├── /components # Reusable components 
│ ├── /pages # Page components 
│ ├── /auth # Auth0 authentication logic 
│ ├── App.js # Main app entry point 
│ ├── index.js # ReactDOM render logic 
│ ├── app.css # Global styles 
│── /public 
│── README.md # Project documentation 
│── package.json # Dependencies
```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/codERSunny812/Modstack.ai.git
cd Modstack.ai-client
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Auth0

- Create an account at Auth0
- Get Domain, Client ID, and Callback URLs
- Create a .env file and add

```sh
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_BACKENd_URI=your-backend-uri
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```
