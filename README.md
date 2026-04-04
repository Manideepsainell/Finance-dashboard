
# Finance Dashboard Backend

Backend API for a finance dashboard system that manages financial records, user roles, access control and summary analytics.

Built as part of a backend engineering assessment.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt password hashing

## Features

### Authentication
- User registration
- User login
- JWT based authentication
- Role based access (Admin/User)

### Financial Records
- Create financial record
- View all records
- View single record
- Soft delete records

### Access Control
- Users can access only their own records
- Admin can access all records

### Analytics
- Total credit calculation
- Total debit calculation
- Balance calculation

## Project Structure

src/
│
├── models/
│   ├── User.js
│   └── FinancialRecord.js
│
├── controllers/
│   ├── authController.js
│   └── financeController.js
│
├── routes/
│   ├── authRoutes.js
│   └── financeRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── db.js
│
app.js
server.js

## Setup Instructions

### 1. Clone repository

git clone <repo-url>

### 2. Install dependencies

npm install

### 3. Environment variables

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

### 4. Run server

npm run dev

## API Endpoints

### Auth APIs

POST /auth/register  
Register new user

POST /auth/login  
Login user

### Finance APIs

POST /finance  
Create record

GET /finance  
Get all records

GET /finance/:id  
Get single record

DELETE /finance/:id  
Soft delete record

GET /finance/summary  
Get financial summary (Admin only)

## Design Decisions

- Soft delete used instead of permanent delete to preserve financial history
- JWT used for stateless authentication
- Role based authorization implemented for admin controls
- MongoDB aggregation used for analytics calculations
- Validation added to prevent invalid financial data

## Assumptions

- Financial amounts are always positive numbers
- Type determines credit or debit impact
- Admin role manages analytics
- Deleted records should not appear in queries

## Future Improvements

- Pagination support
- Search filters
- Unit tests
- Rate limiting
- API documentation using Swagger