# Attendance Application

## Table of Contents

- [Requirements](#requirements)
- [Applications](#applications)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Automation Test](#automation-test)

## Requirements

To run this application, ensure you have the following installed:

| Requirement  | Version        |
|--------------|----------------|
| **Node.js**  | ^18 |
| **MySQL**    | ^8 |
| **PM2**      | ^5 |
| **pnpm**     | ^9 |

## Applications

This repository contains two main applications:

- **Frontend**: Directory for the frontend application.
- **Backend**: Directory for the backend application.

## API Documentation

You can refer to the API documentation available in the Postman collection:  
- [Attendance API Documentation](https://github.com/FgDevLab/attendance/blob/main/attendance.postman_collection.json)

## Setup Instructions

To set up and run the Attendance Application, please follow these steps:

1. **Create the Database**:  
   Set up a MySQL database using the command line interface (CLI) or a tool like phpMyAdmin.  
   **Update the `.env` file in the backend directory** with the appropriate database credentials.

2. **Configure Environment Variables**:  

   **Backend Variables**:
   - `PORT`: Backend server port
   - `DATABASE_USER`: MySQL username
   - `DATABASE_PASSWORD`: MySQL password
   - `DATABASE_NAME`: Name of the database
   - `DATABASE_HOST`: Host of the database
   - `DATABASE_PORT`: Port for the database connection
   - `JWT_SECRET_KEY`: Secret key for JWT authentication
   - `AWS_ACCESS_KEY_ID`: AWS access key for S3 integration
   - `AWS_SECRET_ACCESS_KEY`: AWS secret for S3 integration
   - `AWS_REGION`: Region of the S3 bucket
   - `AWS_S3_BUCKET_NAME`: Name of the S3 bucket for file storage

   **Frontend Variables**:
   - `VITE_BACKEND_API_URL`: URL of the backend API (ensure to include the protocol, e.g., `http://`)
   - `VITE_PORT`: Port for the frontend application (default: `7100`)

3. **Run Database Migration**:  
   Execute the migration command:
   ```bash
   make migrate-db
   ```

4. **Run Database Seeder**:  
   To create dummy user data for the application, execute:
   ```bash
   make create-db-seeder
   ```
   This will create two users:
   - **Employee** (for performing attendance actions)
     - Email: `employee@example.com`
     - Password: `@employee2024`
   - **Admin** (for monitoring attendance)
     - Email: `admin@example.com`
     - Password: `@admin2024`

5. **Start the Application**:  
   Launch both the backend and frontend applications with:
   ```bash
   make start
   ```

6. **Stop or Delete the Application**:  
   To stop or remove the applications, you can use:
   ```bash
   make stop
   ```
   or
   ```bash
   make delete
   ```

## Automation Test

To run the automation tests, utilize the following commands in the `frontend` folder with pnpm:

- **Run all tests**:
  ```bash
  pnpm test
  ```

- **Run specific tests**:
  - For account tests:
    ```bash
    pnpm test:account
    ```
  - For login tests:
    ```bash
    pnpm test:login
    ```
  - For clock-in tests:
    ```bash
    pnpm test:clockin
    ```
  - For clock-out tests:
    ```bash
    pnpm test:clockout
    ```
