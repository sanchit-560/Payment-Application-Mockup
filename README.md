
# Payment Solution App Backend

This repository contains the backend implementation for a mockup payment application designed to simulate user signups, authentication, and transaction processes. It's built using Node.js, Express.js, and MongoDB with Mongoose for database interactions. The backend supports secure user authentication, account management, and fund transfer functionalities.

## Technologies Used

- **Node.js & Express.js**: For creating the server and RESTful API.
- **MongoDB & Mongoose**: For database management and schema definitions.
- **JWT (JSON Web Tokens)**: For securing routes and user authentication.
- **Postman**: Used for testing API endpoints.
- **Middleware**: To reduce code repetition and improve security.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- MongoDB database setup (locally or cloud-based with MongoDB Atlas).
- Postman for testing API requests.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanchit-560/Payment-Backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd payment-backend
   ```
3. Install the necessary packages:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. The server will be running on `http://localhost:3000`.

## Features

### User Authentication

- **Sign Up**: Users can create a new account.
- **Sign In**: Users can log in to their account.
- **Update Information**: Authenticated users can update their personal information.

### Account Management

- **View Balance**: Users can retrieve their current account balance.
- **Transfer Funds**: Users can transfer funds to another account, with validations for sufficient balance and recipient account existence.

### Security

- **JWT Authentication**: Secures routes to ensure that only authenticated users can access sensitive endpoints.
- **Middleware**: Custom middleware for checking authentication tokens and handling repeated tasks.

### Testing with Postman

## Endpoints

### User

- **Sign In**:
  - Endpoint: `http://localhost:3000/api/v1/user/signin`
  - Method: POST
  - Description: Used for user authentication and login.
  
- **Sign Up**:
  - Endpoint: `http://localhost:3000/api/v1/user/signup`
  - Method: POST
  - Description: Used for creating a new user account.

- **Bulk User Search**:
  - Endpoint: `http://localhost:3000/api/v1/user/bulk?filter=Khosla`
  - Method: PUT
  - Description: Used for filtering users by firstName/lastName or any characters.

### Account

- **Balance**:
  - Endpoint: `http://localhost:3000/api/v1/account/balance`
  - Method: GET
  - Description: Used for retrieving the balance of the user's account.

- **Transfer**:
  - Endpoint: `http://localhost:3000/api/v1/account/transfer`
  - Method: POST
  - Description: Used for transferring funds from the user's account to another account.

### Testing:
To test these endpoints, you can use tools like Postman or make requests directly from your frontend application. Ensure that the server is running on `http://localhost:3001` before making any requests.

## Frontend Integration

### React Router Setup

To integrate the frontend, you need to import `react-router-dom` into your project and add the following routes:

- `/signup` - The signup page
- `/signin` - The signin page
- `/dashboard` - Balances and see other users on the platform.
- `/send` - Send money to other users

### Frontend Features

- **User Balance**: Show the user their balance.
- **User List**: Display a list of users that exist in the database.
- **Send Money**: Clicking on "Send money" should open a modal that lets the user send money.

### Components and Wiring Up Backend Calls

The frontend is built using React components to structure the application. Each route corresponds to a specific component that handles the rendering and logic for that part of the app.

- **Signup Component**: Handles user registration.
- **Signin Component**: Manages user login.
- **Dashboard Component**: Displays user balance and list of other users.
- **SendMoney Component**: Manages the fund transfer process.

To wire up backend calls, you can use libraries like `axios` to make HTTP requests to the backend API endpoints. Ensure you handle authentication tokens correctly and secure sensitive actions.


