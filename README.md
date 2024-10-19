```markdown
# Attendance Application

## Table of Contents

- [Requirements](#requirements)
- [Applications](#applications)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Test Guide](#test-guide)

## Requirements

- **Node.js**: v18 or higher
- **MySQL**: v8 or higher
- **PM2**: v5 or higher
- **pnpm**: v9 or higher

## Applications

- **Frontend**: Directory for the frontend application
- **Backend**: Directory for the backend application

## API Documentation

Refer to the API documentation available in the Postman collection:  
- [Attendance API Documentation](https://github.com/FgDevLab/attendance/blob/main/attendance.postman_collection.json)

## Setup Instructions

To run the Attendance Application, follow these steps:

1. **Create the Database**:  
   Set up a MySQL database using the CLI or a tool like phpMyAdmin.  
   **Update the `.env` file in the backend directory** with the correct database credentials.

2. **Configure Environment Variables**:  

   **Backend Variables**:
   - `PORT`: Backend server port
   - `DATABASE_USER`: MySQL username
   - `DATABASE_PASSWORD`: MySQL password
   - `DATABASE_NAME`: Database name
   - `DATABASE_HOST`: Database host
   - `DATABASE_PORT`: Database port (default: `3306`)
   - `JWT_SECRET_KEY`: Secret key for JWT authentication
   - `AWS_ACCESS_KEY_ID`: AWS access key for S3 integration
   - `AWS_SECRET_ACCESS_KEY`: AWS secret for S3 integration
   - `AWS_REGION`: S3 bucket region
   - `AWS_S3_BUCKET_NAME`: S3 bucket name for file storage

   **Frontend Variables**:
   - `VITE_BACKEND_API_URL`: URL of the backend API (include protocol, e.g., `http://`)
   - `VITE_PORT`: Frontend application port (default: `7100`)

3. **Run Database Migration**:  
   Execute the migration command:
   ```bash
   make migrate-db
   ```

4. **Run Database Seeder**:  
   Create dummy user data by executing:
   ```bash
   make create-db-seeder
   ```
   This will create two users:
   - **Employee**
     - Email: `employee@example.com`
     - Password: `@employee2024`
   - **Admin**
     - Email: `admin@example.com`
     - Password: `@admin2024`

5. **Start the Application**:  
   Launch both backend and frontend applications with:
   ```bash
   make start
   ```

6. **Stop or Delete the Application**:  
   To stop or remove the applications, use:
   ```bash
   make stop
   ```
   or
   ```bash
   make delete
   ```

## Test Guide

To run the frontend tests, use the following commands with pnpm:

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