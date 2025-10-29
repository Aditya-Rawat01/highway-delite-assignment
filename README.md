# 🛣️ Highway Delite Assignment

## 🚀 Overview

This project is an **MVP/prototype** built using a modern JavaScript stack. While functional, it contains several areas that require improvement for a production environment.

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Next.js + TypeScript | React Framework for the user interface. |
| **Backend** | Express.js + TypeScript | REST API server. |
| **Database** | Prisma + PostgreSQL | ORM and persistent data store. |

---

## ⚙️ Setup and Installation

### Prerequisites
You must have **Node.js** and an accessible **PostgreSQL** database instance.

### Installation Steps

1. Clone the repository to your local machine.
2. Run `npm install` in the **root** directory.
3. Navigate to the `express-backend` directory and run `npm install` there as well.
4. **Database Configuration:**
    * Rename `/express-backend/envFile` to `.env`.
    * Add your PostgreSQL connection URL to the new `.env` file (e.g., `DATABASE_URL="..."`).
5. Run Prisma migrations and generation from the `express-backend` folder:
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

### Running the Servers

* **Backend:** Start the Express server by running `npm run dev` inside the `express-backend` folder.
* **Frontend:** Start the Next.js development server by running `npm run dev` in the **root** folder.

---

## 📌 Important Considerations

1.  **Time Constraint:** Focus was given to delivering the assignment as **quickly as possible**.
2.  **Required Improvements:** This project contains many improvements which are a **must** to deal with before production.
3.  **Prototype Status:** The running instance is just an **MVP/prototype** of the actual product.