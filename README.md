
🩸 Blood Bridge - Backend API

**Blood Bridge** is a robust backend system designed to connect blood donors with those in need. Built with **NestJS** and **PostgreSQL**, this API handles user authentication, donor searching, and blood request management with real-time data validation.

**Features Implemented**

### 1. User Management & Authentication
* **Secure Registration:** Users can sign up as either a 'donor' or a 'user'. Passwords are encrypted using **bcrypt** before being stored.
* **JWT Authentication:** Fully implemented Login system using **Passport.js** and **JWT Strategy**. Protected routes require a Bearer Token.
* **Profile Updates:** Users can update their personal information (Blood Group, Area, Contact Number) via a secure `PATCH` endpoint.

### 2. Blood Request System
* **Dynamic Requests:** Support for creating both single and **Bulk (Multiple)** blood requests in one API call.
* **Relational Mapping:** Every request is linked to a `User` (Requester). In the API response, the system automatically maps the `RequesterID` to the User's **Full Name** for better readability.
* **Request Management:** Users can view all requests, filter their own requests, or delete their specific posts.

### 3. Data Validation & Security
* **Bangladeshi Phone Number Validation:** A custom Regex ensures all `contactNumber` inputs are exactly **11 digits** and follow the local format (starting with `01`).
* **Input Sanitization:** Uses `class-validator` to ensure no empty or malformed data enters the database.
* **Database Synchronization:** Automated schema synchronization using **TypeORM** for seamless development.

---

## 🛠 Tech Stack

* **Framework:** NestJS (Node.js)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Security:** Bcrypt (Hashing), JWT (Tokens)
* **Documentation:** Swagger UI (OpenAPI)

---

## 📂 Database Schema (Key Relations)

The system utilizes two primary entities with a **One-to-Many** relationship:

1.  **User Entity:** Stores `id`, `fullName`, `email`, `password`, `bloodGroup`, `area`, `contactNumber`, and `role`.
2.  **BloodRequest Entity:** Stores `id`, `bloodGroup`, `hospitalName`, `location`, `contactNumber`, `status` (default: pending), and a Foreign Key `requester` linked to the User table.

---

## 🚦 Getting Started

### Prerequisites
* Node.js (v18+)
* PostgreSQL 16/18
* pgAdmin4 (for database management)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/blood-bridge-api.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Database:** Update your `app.module.ts` or `.env` with your PostgreSQL credentials:
    ```typescript
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'your_password',
    database: 'blood_bridge_db',
    ```
4.  **Run the application:**
    ```bash
    npm run start:dev
    ```

---

## 📖 API Documentation (Swagger)

Once the server is running, you can access the interactive API docs at:
 `http://localhost:3000/api`

### Main Endpoints:
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/auth/login` | Returns JWT Access Token |
| **POST** | `/users/register` | Create a new user account |
| **GET** | `/users/donors` | Search for donors by Blood Group/Area |
| **POST** | `/blood-requests` | Create single/multiple blood requests (Protected) |
| **GET** | `/blood-requests` | List all available blood requests |

---

