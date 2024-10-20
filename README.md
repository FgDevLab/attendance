# Attendance Application

## Table of Contents

- [Requirements](#requirements)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Test](#test)

## Requirements

| Requirement  | Version        |
|--------------|----------------|
| **Node.js**  | 18             |
| **MySQL**    |  8             |
| **PM2**      |  5             |
| **pnpm**     |  9             |


## API Documentation

[Postman Api Collection](https://github.com/FgDevLab/attendance/blob/main/attendance.postman_collection.json)

## Setup Instructions

To set up and run the Attendance Application, please follow these steps:

1. **Create the Database**:  
   Set up a MySQL database using the command line interface (CLI) or a tool like phpMyAdmin.  
   **Update the `.env` file in the backend directory** with the appropriate database credentials.

2. **Configure Environment Variables**:  

   **Backend Variables**:
   ```plaintext
   PORT=your_backend_port
   DATABASE_USER=your_mysql_username
   DATABASE_PASSWORD=your_mysql_password
   DATABASE_NAME=your_database_name
   DATABASE_HOST=your_database_host
   DATABASE_PORT=your_database_port
   JWT_SECRET_KEY=your_jwt_secret_key
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET_NAME=your_s3_bucket_name
   ```

   **Frontend Variables**:
   ```plaintext
   VITE_BACKEND_API_URL=http://your_backend_api_url
   VITE_PORT=default 7100
   ```

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
   To stop or remove the applications, run:
   ```bash
   make stop
   ```
   or
   ```bash
   make delete
   ```

## Test

To run the tests, utilize the following commands in the `frontend` folder with pnpm:

  ```bash
   pnpm run test
   ```
 
