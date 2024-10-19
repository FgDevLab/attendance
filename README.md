# Attendance Application

## Table of Contents

- [Requirements](#requirements)
- [Applications](#applications)
- [Running the App](#running-the-app)

## Requirements
- NodeJS v18^
- MySQL v8^
- PM2 v5^
- pnpm v9

## Applications

- **frontend**: Front-end application directory
- **backend**: Back-end application directory


## Running the App

Follow these steps to successfully run the Attendance Application:

1. **Create Database**:

   Create a database in MySQL to support the application. You can do this using the MySQL CLI or any database management tool like phpMyAdmin.
   
   *Make sure to update your **backend** `.env` file with the correct database credentials.*

2. **Create Environment Variables**:
   
   Backend Environment Variables
    - `PORT`: The port the backend server will run on.
    - `DATABASE_USER`: Your MySQL database username.
    - `DATABASE_PASSWORD`: Your MySQL database password.
    - `DATABASE_NAME`: The name of the MySQL database.
    - `DATABASE_HOST`: The host where your database is located.
    - `DATABASE_PORT`: The port on which your database is running.
    - `JWT_SECRET_KEY`: Secret key used for JWT authentication.
    - `AWS_ACCESS_KEY_ID`: AWS access key for S3 integration.
    - `AWS_SECRET_ACCESS_KEY`: AWS secret access key for S3 integration.
    - `AWS_REGION`: The region where S3 bucket is located.
    - `AWS_S3_BUCKET_NAME`: The name of S3 bucket for file storage.

    Frontend Environment Variables
    - `VITE_BACKEND_API_URL`: The URL to your backend API (make sure to include the correct protocol, e.g., `http://`).
    - `VITE_PORT`: The port the frontend application will run on (default is `7100`).


3. **Run Database Migration**:
   
   Execute the following command to migrate your database:
   ```bash
   make migrate-db
   ```

4. **Run Database Seeder**:
   
   ```bash
   make create-db-seeder
   ```
   
   This command will creating dummy user :
  
   Employee
   ```
   email : employee@example.com
   password : @employee2024
   ```
   Admin
   ```
   email : admin@example.com
   password : @admin2024
   ```
   

5. **Start the Application**:
   
   Start both the backend and frontend applications using:
   ```bash
   make start
   ```

6. **Stopping or Deleting the Application**:
   
   Remember to stop or delete your applications using the `make stop` or `make delete` commands when you are done.

