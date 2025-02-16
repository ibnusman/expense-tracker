# Expense Tracker Backend

This is the backend for the Expense Tracker application, built using **Node.js**, **Express**, and **MongoDB**.

## Features
- User authentication (Login, Register, Logout)
- JWT-based authorization
- Expense CRUD operations (Create, Read, Update, Delete)
- File uploads for receipts

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JSON Web Token (JWT)** for authentication
- **Multer** for file uploads
- **dotenv** for environment variables
- **Cors** for handling cross-origin requests

## Setup Instructions

### Prerequisites
- Ensure you have **Node.js** and **MongoDB** installed.
- Create a `.env` file in the root directory with the following variables:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/expense-tracker-backend.git
   ```
2. Navigate to the backend folder:
   ```sh
   cd expense-tracker-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Server
#### Development Mode
```sh
npm run dev
```
This will start the server using **nodemon** for automatic restarts on file changes.

#### Production Mode
```sh
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint         | Description            |
|--------|----------------|------------------------|
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login` | Login and get a token  |

### Expenses
| Method | Endpoint       | Description                 |
|--------|--------------|-----------------------------|
| GET    | `/api/expenses` | Get all user expenses      |
| POST   | `/api/expenses` | Add a new expense          |
| DELETE | `/api/expenses/:id` | Delete an expense    |

## Deployment
### Deploying to Railway
1. Create an account on [Railway](https://railway.app/)
2. Link your GitHub repository
3. Add the environment variables
4. Deploy and get your API URL
