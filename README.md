# Payment Dummy App Backend

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
   ```
   git clone https://github.com/sanchit-560/payment-dummy-app-backend.git
   ```
2. Navigate to the project directory:
   ```
   cd payment-dummy-app-backend
   ```
3. Install the necessary packages:
   ```
   npm install
   ```

### Running the Application

1. Start the server:
   ```
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

- Import the provided Postman collection to test the API endpoints.
- Ensure the server is running and send requests to test functionalities like user signup, signin, balance fetching, and fund transfers.

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project. For major changes, please open an issue first to discuss what you would like to change.



---

This project allows for a comprehensive demonstration of backend development skills, including API development, database management, authentication, and handling of financial transactions, providing a strong foundation for further development and learning in the field of web development.
