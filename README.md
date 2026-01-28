# 📋 TaskMaster – Secure Projects & Tasks API

**Node.js · Express · MongoDB · JWT Authentication**

A secure, modular **RESTful backend API** for managing **user-owned projects and tasks**.
This API enforces **strict ownership-based authorization**, ensuring users can only access and modify their own data.

Built as a capstone backend project to demonstrate real-world API design, authentication, authorization, and relational data modeling.

---

## 🎯 Project Objectives

This project demonstrates proficiency in:

* JWT-based authentication
* Secure user registration and login
* Ownership-based authorization
* Relational data modeling with MongoDB & Mongoose
* Nested RESTful routes
* Clean controller-based architecture
* DRY middleware and authorization patterns
* Full CRUD operations on protected resources

Security and correctness were the primary focus.

---

## 🧩 Users Can:

* **Register and log in**
* **Receive a JWT upon authentication**
* **Create projects they own**
* **View all their own projects**
* **Update and delete their own projects**
* **Create tasks within their projects**
* **View all tasks for a specific project**
* **Update tasks belonging to their projects**
* **Delete tasks belonging to their projects**
* 🚫 *Access to other users’ projects or tasks is strictly blocked*

---

## 🔐 Authentication & Authorization

### ✔ Authentication (JWT)

* Passwords hashed using **bcrypt**
* JWT issued on login
* Token verified via middleware
* Authenticated user attached to `req.user`

### ✔ Authorization (Ownership-Based)

* Projects reference their owning user
* Tasks reference their parent project
* Task authorization is enforced via **parent project ownership**
* All sensitive queries are filtered by ownership

---

## 📌 API Endpoints

### 🔑 Authentication Routes

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/users/register` | Register a new user   |
| POST   | `/api/users/login`    | Login and receive JWT |

---

### 📁 Project Routes (Protected)

> All project routes require a valid JWT.

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | `/api/projects`     | Create a new project           |
| GET    | `/api/projects`     | Get all projects owned by user |
| GET    | `/api/projects/:id` | Get one project (owner only)   |
| PUT    | `/api/projects/:id` | Update project (owner only)    |
| DELETE | `/api/projects/:id` | Delete project (owner only)    |

---

### ✅ Task Routes (Protected & Nested)

> Tasks are **children of projects**. Authorization is enforced through the parent project.

| Method | Endpoint                         | Description                                |
| ------ | -------------------------------- | ------------------------------------------ |
| POST   | `/api/projects/:projectId/tasks` | Create task in owned project               |
| GET    | `/api/projects/:projectId/tasks` | Get all tasks for owned project            |
| PUT    | `/api/tasks/:taskId`             | Update task (via parent project ownership) |
| DELETE | `/api/tasks/:taskId`             | Delete task (via parent project ownership) |

---

## 🚀 Live Demo

🌐 **Live API:**
👉 [https://taskmaster-dths.onrender.com](https://taskmaster-dths.onrender.com)

> ⚠️ **Important Note**
>
> This project is a **backend-only REST API**.
> There is **no frontend UI** provided.
>
> To interact with and test the API, please use an API client such as:
>
> * **Insomnia** (recommended)
> * **Postman**
> * **cURL**

---

## 🧪 How to Test the Live API

### 1️⃣ Register a New User

**POST** `/api/users/register`

```json
{
  "username": "testuser",
  "email": "testuser@email.com",
  "password": "password123"
}
```

---

### 2️⃣ Login to Receive JWT

**POST** `/api/users/login`

```json
{
  "email": "testuser@email.com",
  "password": "password123"
}
```

✔️ Copy the returned **JWT token**

---

### 3️⃣ Authenticate Requests

For all protected routes, add this header:

```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

### 4️⃣ Create a Project

**POST** `/api/projects`

```json
{
  "name": "My First Project",
  "description": "Testing live API"
}
```

---

### 5️⃣ Create a Task for a Project

**POST** `/api/projects/:projectId/tasks`

```json
{
  "title": "Finish backend",
  "description": "Complete Tasks API",
  "status": "To Do"
}
```

---

### 6️⃣ Update or Delete a Task

**PUT** `/api/tasks/:taskId`
**DELETE** `/api/tasks/:taskId`

> ⚠️ Authorization is enforced:
> * You **must own the parent project**
> * Cross-user access is blocked with **403 Forbidden**

---

## 🔐 Security Reminder

* All project and task routes are **JWT-protected**
* Ownership checks are enforced at **every level**
* Tokens are required for all non-auth routes

---

## 🛠️ Built With

* **Node.js**
* **Express**
* **MongoDB Atlas**
* **Mongoose**
* **bcrypt**
* **jsonwebtoken**
* **dotenv**

---

## 📂 Folder Structure

```
TaskMaster/
.
├── README.md
├── config
│   └── connection.js
├── controllers
│   ├── project
│   │   ├── createProjects.js
│   │   ├── deleteProject.js
│   │   ├── getProjects.js
│   │   ├── getProjectsById.js
│   │   └── updateProject.js
│   ├── task
│   │   ├── createTask.js
│   │   ├── deleteTask.js
│   │   ├── getTask.js
│   │   └── updateTask.js
│   └── user
│       ├── userLogin.js
│       └── userRegister.js
├── models
│   ├── Project.js
│   ├── Task.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   └── routes.js
├── server.js
└── utils
    └── auth.js

9 directories, 21 files
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <https://github.com/structbase/TaskMaster-Backend>
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
SALTING_ROUNDS=10
```

---

### 4️⃣ Run the server

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

## 🧠 How It Works

### ➤ JWT Middleware (`utils/auth.js`)

* Verifies token from `Authorization` header
* Attaches authenticated user to `req.user`
* Protects all project and task routes

### ➤ Task Authorization Logic

For **update and delete** operations:

1. Find the task by `taskId`
2. Find the parent project from `task.project`
3. Verify project ownership matches `req.user._id`

This ensures **no task can be accessed outside its project context**.

---

## 🧪 Testing

All endpoints were tested using **Insomnia**:

* Authentication flow
* JWT-protected routes
* Project CRUD operations
* Task CRUD operations
* Cross-user authorization rejection (403)
* Invalid access attempts (401 / 404)

---

## 📝 Reflection

This project reinforced how critical **authorization design** is in real-world APIs.

The most challenging aspect was implementing **task-level security through parent project ownership** without duplicating logic or leaking access. Carefully structuring queries and enforcing checks at the controller level ensured both correctness and security.

This backend provides a strong foundation for scalable, secure, production-ready APIs.

---

## ✍️ Author

Developed by **Abenezer**

> Junior Software Developer
