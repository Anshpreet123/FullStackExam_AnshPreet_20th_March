# Project Name

## Table of Contents
- [Installation Steps](#installation-steps)
- [Database Setup Instructions](#database-setup-instructions)
- [How to Run the Server](#how-to-run-the-server)
- [How to Run the Frontend](#how-to-run-the-frontend)
- [Folder Structure](#folder-structure)

## Installation Steps

### Dependencies

1. **Backend**:
   - Navigate to the `backend` directory.
   - Install the required dependencies:
     ```bash
     npm install
     ```

2. **Frontend**:
   - Navigate to the `frontend` directory.
   - Install the required dependencies:
     ```bash
     npm install
     ```

### Environment Variables

Create a `.env` file in both the `backend` and `frontend` directories with the following variables:

#### Backend (.env)
PORT=5000 dont change this port
POSTGRES_URI=postgres://your_user:your_password@localhost:5432/your_database
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret

use your uri's and secret. In my case I used docker 

#### Frontend (.env)
NEXT_PUBLIC_API_URL=http://localhost:5000


## Database Setup Instructions

### SQL Schema

1. Ensure you have PostgreSQL installed and running.
2. Create a new database for your application.
3. The SQL schema will be automatically created when you run the server for the first time, as Sequelize will synchronize the models with the database.

### MongoDB Connection

1. Ensure you have MongoDB installed and running.
2. Create a new database for your application.
3. The MongoDB connection will be established using the connection string provided in the `.env` file.

## How to Run the Server

1. Navigate to the `backend` directory.
2. Start the server using:
   ```bash
   npm run dev
   ```
3. The server will run on `http://localhost:5000`.

## How to Run the Frontend

1. Navigate to the `frontend` directory.
2. Start the Next.js application using:
   ```bash
   npm run dev
   ```
3. The frontend will run on `http://localhost:3000`.

## Folder Structure

### Backend
- **src/**: Contains the main application code.
  - **config/**: Configuration files for database connections (PostgreSQL and MongoDB).
  - **controllers/**: Contains the logic for handling requests and responses (MVC structure).
  - **middleware/**: Custom middleware for authentication.
  - **models/**: Database models for SQL and MongoDB.
  - **routes/**: API route definitions.
  - **tests/**: Test files for the backend functionality.
  - **index.js**: Entry point for the backend application.

### Frontend
- **.next/**: Automatically generated files by Next.js for the application.
- **pages/**: Contains the Next.js pages for routing.
- **components/**: Reusable React components.
- **public/**: Static files like images and icons.
- **styles/**: CSS files for styling the application.
- **package.json**: Contains the dependencies and scripts for the frontend.

## Conclusion

This project is structured using the MVC pattern for the backend with Node.js and Express, and the frontend is built using Next.js. Follow the instructions above to set up and run the application locally.


### [Screenshots of the application]
 ![Screenshot of the application](images/1.jpg)
 ![Screenshot of the application](images/2.jpg)
 ![Screenshot of the application](images/3.jpg)
 ![Screenshot of the application](images/4.jpg)
 ![Screenshot of the application](images/5.jpg)
 ![Screenshot of the application](images/6.jpg)
 ![Screenshot of the application](images/7.jpg)
 ![Screenshot of the application](images/8.jpg)
 ![Screenshot of the application](images/9.jpg)
 ![Screenshot of the application](images/10.jpg)
 ![Screenshot of the application](images/11.jpg)
 ![Screenshot of the application](images/12.jpg)

 ### Things I could not implement due to time constraint ==>

 #### 1). Sql injection protech - could have done using zod or joi but forgot initially.
 #### 2). test might not work could not test from my end

 #### 3). For production by aws account was banned didn't had any handy acc to deploy.


 ### Thank you
