# Attendance Application

## Table of Contents

- [Applications](#applications)
- [Database Setup](#database-setup)
- [Available Commands](#available-commands)
- [Environment Variables](#environment-variables)

## Applications

- **frontend**: Front-end application directory
- **backend**: Back-end application directory

## Database Setup

1. **Create Database**:
   - Create a database in MySQL to support your application. You can do this using the MySQL CLI or any database management tool like phpMyAdmin.
   - Make sure to update your **backend** `.env` file with the correct database credentials.

## Available Commands

You can use the following commands to manage your application:

### Migrate Database

Run this command to migrate your database:

```bash
make migrate-db
```

### Create Database Seeder

Run this command to create your database seed data:

```bash
make create-db-seeder
```

### Start Application

To start both the backend and frontend applications, use:

```bash
make start
```

### Stop Application

To stop both the backend and frontend applications, use:

```bash
make stop
```

### Delete Application from PM2

To delete both the backend and frontend applications from PM2, use:

```bash
make delete
```

### Clean Up

To clean up build artifacts and dependencies, use:

```bash
make clean
```

## Environment Variables

Make sure to set the following environment variables correctly in your `.env` files for both the backend and frontend to ensure the application runs smoothly:

### Backend Environment Variables
- `PORT`: The port the backend server will run on.
- `DATABASE_USER`: Your MySQL database username.
- `DATABASE_PASSWORD`: Your MySQL database password.
- `DATABASE_NAME`: The name of the MySQL database.
- `DATABASE_HOST`: The host where your database is located.
- `DATABASE_PORT`: The port on which your database is running (default is usually 3306).
- `JWT_SECRET_KEY`: Secret key used for JWT authentication.
- `AWS_ACCESS_KEY_ID`: AWS access key for S3 integration.
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key for S3 integration.
- `AWS_REGION`: The region where your S3 bucket is located.
- `AWS_S3_BUCKET_NAME`: The name of your S3 bucket for file storage.

### Frontend Environment Variables
- `VITE_BACKEND_API_URL`: The URL to your backend API (make sure to include the correct protocol, e.g., `http://`).
- `VITE_PORT`: The port the frontend application will run on (default is `7100`).