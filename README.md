# **User Access Management System**


## Links
[Frontend Repository](https://github.com/MaheshKunchala18/user-access-management-frontend)  <img src="https://img.icons8.com/material-outlined/24/000000/github.png" /> |
[Backend Repository](https://github.com/MaheshKunchala18/user-access-management-backend) <img src="https://img.icons8.com/material-outlined/24/000000/github.png" />



## **Table of Contents 📋**

1. [🎯 Project Overview](#project-overview)
2. [✨ Features](#features)
3. [🛠 Tech Stack](#tech-stack)
4. [⚙️ Installation and Setup](#️installation)
5. [🔗 API Endpoints](#api-endpoints)



<h2 id="project-overview"> <strong>🎯 Project Overview</strong> </h2>

The **User Access Management System** is a role-based web application that streamlines the way organisations provision access to internal software.

• **Employees** submit requests for specific access levels (Read / Write / Admin) to individual applications.  
• **Managers** review the pending requests and approve or reject them.  
• **Administrators** maintain the catalogue of software and its permitted access levels.


<h2 id="features"> <strong>✨ Features</strong> </h2>

- **Informative Home Page** – Landing screen that explains the system and offers quick links to *Log In* or *Sign Up*.
- **Secure Authentication** – Sign-up & log-in flows that store bcrypt-hashed passwords and issue JWTs.
- **Role-Based Navigation** – Header automatically shows pages relevant to *Admin*, *Manager* or *Employee*.
- **Admin – Software Catalogue** – Create and maintain the list of internal software and allowed access levels.
- **Employee – Request Access** – Submit requests specifying the software, desired permission level and justification.
- **Manager – Approve / Reject** – Review a real-time table of pending requests and approve or reject with one click.
- **Automatic Redirection** – After login each user is routed to the correct dashboard for their role.
- **Responsive UI** – React-Bootstrap grid ensures usability on mobile, tablet and desktop.
- **Smooth Animations** – Framer-Motion driven transitions for a polished experience.
- **Token Persistence & Logout** – JWT is stored in *localStorage*; logout clears storage and session state.
- **RESTful API Integration** – Axios communicates with the Express/TypeORM backend through a Vite proxy.
- **Auditable History** – All access requests are stored in PostgreSQL, creating a traceable audit trail.



<h2 id="tech-stack"> <strong>🛠 Tech Stack</strong> </h2>

### Frontend

- **React 18** – Core library for building the SPA.
- **Vite** – Lightning-fast dev server & build tool.
- **React Router DOM v6** – Client-side routing.
- **React-Bootstrap / Bootstrap 5** – Responsive UI components.
- **Font Awesome** – Scalable icon set via `@fortawesome` packages.
- **Framer Motion** – Page and component animations.
- **Axios** – Promise-based HTTP client for REST API calls.

### Backend

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Minimalist HTTP server & routing.
- **PostgreSQL** – Relational database.
- **TypeORM** – ORM mapping entities to PostgreSQL tables.
- **pg** – Native Postgres driver used by TypeORM.
- **reflect-metadata** – Decorator metadata polyfill required by TypeORM.
- **bcrypt** – Password hashing for secure credential storage.
- **jsonwebtoken (JWT)** – Stateless authentication tokens.
- **cors** – Cross-origin resource sharing middleware.
- **dotenv** – Environment variable management.
- **nodemon** – Hot-reloading during development.



<h2 id="️installation"> <strong> ⚙️ Installation and Setup</strong> </h2>

### **Prerequisites**

- Node.js (v14.x or higher)
- PostgreSQL (local instance or PostgreSQL cloud service)
- NPM or Yarn

### **Installation**

1. **Backend Setup:**
   - Clone the repository:
     ```bash
     git clone https://github.com/MaheshKunchala18/user-access-management-backend
     ```
   - Navigate to the backend directory:
     ```bash
     cd user-access-management-backend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add your environment variables. Depending on your setup, you can use either a PostgreSQL cloud service or a local PostgreSQL instance:
        ```bash
        DB_HOST=your_postgres_connection
        DB_PORT=5432
        DB_USERNAME=your_db_username
        DB_PASSWORD=your_db_password
        DB_NAME=your_db_name
        ```
   - Start the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup:**
   - Clone the repository:
     ```bash
     git clone https://github.com/MaheshKunchala18/user-access-management-frontend
     ```
   - Navigate to the frontend directory:
     ```bash
     cd user-access-management-frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the frontend directory and add your environment variables. Depending on whether your backend is deployed or running locally, you can specify the backend URL accordingly:
      - **If the backend is deployed:**
        ```bash
        VITE_API_URL=your_backend_url
        ```
      - **If the backend is running locally:**
        ```bash
        VITE_API_URL=http://localhost:5000
        ```
   - Start the frontend server:
     ```bash
     npm start
     ```

3. **Access the Application:**
   - Open your browser and navigate to `http://localhost:5173`.



<h2 id="api-endpoints"> <strong>🔗 API Endpoints</strong> </h2>

### **Authentication**
- **POST /api/auth/signup**  
  Register a new user.  
  **Body:** `{ username, password, role? }`  
  **Response:** `{ message }`  
  *Role defaults to "Employee" if not provided.*

- **POST /api/auth/login**  
  Authenticate user and receive a JWT.  
  **Body:** `{ username, password }`  
  **Response:** `{ token, role }`  

---

### **Software Catalogue (Admin Only)**
- **POST /api/software**  
  Create a new software entry.  
  **Headers:** `Authorization: Bearer <token>` (Admin only)  
  **Body:** `{ name, description, accessLevels }`  
  **Response:** Software object

- **GET /api/software**  
  List all software entries.  
  **Headers:** `Authorization: Bearer <token>` (Any authenticated user)  
  **Response:** `[ { id, name, description, accessLevels } ]`  

---

### **Access Requests**
- **POST /api/requests**  
  Submit a new access request.  
  **Headers:** `Authorization: Bearer <token>` (Employee only)  
  **Body:** `{ softwareId, accessType, reason }`  
  **Response:** AccessRequest object

- **PATCH /api/requests/:id**  
  Approve or reject an access request.  
  **Headers:** `Authorization: Bearer <token>` (Manager only)  
  **Params:** `id` (request ID)  
  **Body:** `{ status }` (`Approved` or `Rejected`)  
  **Response:** Updated AccessRequest object

- **GET /api/requests/pending**  
  List all pending access requests.  
  **Headers:** `Authorization: Bearer <token>` (Manager only)  
  **Response:** `[ AccessRequest ]`  

---

#### **Data Models**

- **Software:**  
  `{ id, name, description, accessLevels }`  
  `accessLevels` is an array, e.g. `["Read", "Write", "Admin"]`

- **AccessRequest:**  
  `{ id, user, software, accessType, reason, status }`  
  - `user`: User object  
  - `software`: Software object  
  - `accessType`: string  
  - `reason`: string  
  - `status`: "Pending" | "Approved" | "Rejected"

---

**All endpoints (except signup/login) require a valid JWT in the `Authorization` header.**  
Roles:  
- **Admin:** Can manage software catalogue  
- **Manager:** Can approve/reject requests  
- **Employee:** Can submit access requests
