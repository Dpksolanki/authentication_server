# CRUD Project

This is a Node.js application that provides a basic CRUD (Create, Read, Update, Delete) functionality with user authentication, email verification, and password reset features. The application uses JWT for authentication and MongoDB as the database.

## Features

- User Signup
- User Login
- Email Verification
- Password Reset
- User Authentication Check
- Logout Functionality

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (JSON Web Tokens)
- Zod (for request validation)
- Resend (for sending emails)
- dotenv (for environment variable management)
- bcryptjs (for password hashing)
- cors (for handling CORS)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- A Resend account for email functionality

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dpksolanki/authentication_server.git
   cd authentication_server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   ```

### Running the Application

1. Start the server:

   ```bash
   npm run dev
   ```

2. The server will run on `http://localhost:7000`.

### API Endpoints

- **POST /api/auth/signup**: Register a new user.
  - Request body: `{ "name": "User Name", "email": "user@example.com", "password": "yourpassword" }`
  
- **POST /api/auth/login**: Log in an existing user.
  - Request body: `{ "email": "user@example.com", "password": "yourpassword" }`
  
- **GET /api/auth/check-auth**: Check if the user is authenticated.
  
- **POST /api/auth/logout**: Log out the user.

- **POST /api/auth/verify-email**: Verify the user's email using a verification code.
  - Request body: `{ "code": "123456" }`
  
- **POST /api/auth/forgot-password**: Request a password reset email.
  - Request body: `{ "email": "user@example.com" }`
  
- **POST /api/auth/reset-password/:token**: Reset the user's password using a reset token.
  - Request body: `{ "password": "newpassword" }`

## Email Functionality

The application uses Resend to send verification and password reset emails. Ensure you have a valid Resend API key in your `.env` file.

## Middleware

- **validateRequest**: Validates incoming requests against defined schemas using Zod.
- **verifyToken**: Middleware to verify JWT tokens from cookies.

## Database

The application uses MongoDB to store user data. Ensure your MongoDB instance is running and accessible.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Zod](https://zod.dev/)
- [Resend](https://resend.com/)
