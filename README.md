Snitch E-Commerce

Snitch is a full-stack e-commerce application being built from scratch using React, Node.js, Express and MongoDB.

The application is focused on a fashion e-commerce experience with user authentication, product management, seller functionality, cart and order management. Payment integration is planned for a later stage.

The backend is being developed first. Once the APIs are ready, the React frontend will consume them.

Features

Authentication

User registration

User login

User logout

Get current logged-in user

JWT access token authentication

Refresh token based session management

Password hashing with bcrypt

Protected routes

Refresh token revocation

Users

User account

User profile

User roles

Authentication state

Sellers

Seller authentication

Product creation

Product update

Product deletion

Seller-specific product management

Role and ownership based authorization

Products

Create product

Get all products

Get single product

Update product

Delete product

Product validation

Product ownership

Cart

Add product to cart

Update quantity

Remove product

View cart

Calculate cart total

Orders

Create order from cart

Store ordered products

Store quantity and price

Store shipping information

Track order status

Track payment status

View order history

Payment

Payment integration will be added after the core cart and order functionality is completed.

Tech Stack

Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt

express-validator

cookie-parser

CORS

Helmet

express-rate-limit

dotenv

Frontend

React

React Router

Axios

CSS

Database

MongoDB Atlas

Mongoose

Development

Git

GitHub

VS Code

Nodemon

Postman

Project Structure

snitch-ecommerce/
│
├── backend/
│   ├── src/
│   │   ├── app/
│   │   │   └── app.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── product/
│   │   │   ├── cart/
│   │   │   └── order/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
├── .gitignore
└── README.md

The backend uses a feature-based structure. Related files are kept inside their respective modules instead of putting all controllers, models and routes into separate large folders.

For example:

modules/
└── product/
    ├── product.model.js
    ├── product.controller.js
    ├── product.routes.js
    └── product.validator.js

This keeps the code related to one feature together and makes the project easier to maintain as it grows.

Backend Architecture

The backend is a REST API built with Node.js and Express.

MongoDB is used for data storage and Mongoose is used to define schemas and communicate with MongoDB.

The basic request flow is:

React Frontend
      |
      | HTTP Request
      ↓
Express API
      |
      ↓
Middleware
      |
      ↓
Route
      |
      ↓
Controller
      |
      ↓
Mongoose Model
      |
      ↓
MongoDB

For protected routes:

Request
   ↓
Authentication Middleware
   ↓
Verify Access Token
   ↓
Attach User
   ↓
Controller
   ↓
Database

The backend is responsible for validating and processing requests instead of trusting values sent directly from the frontend.

Backend Modules

Auth

Handles registration, login, refresh tokens, logout and current-user authentication.

User

Manages user information and roles.

Product

Handles product creation, listing, details, updates and deletion.

Cart

Manages products and quantities associated with a user.

Order

Manages checkout orders, order status and payment status.

Authentication

Authentication APIs

Method

Endpoint

Description

Access

POST

/api/auth/register

Create a new account

Public

POST

/api/auth/login

Login user

Public

POST

/api/auth/refresh-token

Generate a new access token

Refresh Token

POST

/api/auth/logout

Logout user

Authenticated

GET

/api/auth/me

Get current user

Authenticated

Registration

Registration accepts:

Name

Email

Password

Confirm password

The backend validates the request, checks for an existing email, hashes the password using bcrypt and creates the user.

The password is never returned in the user response.

Login

The login process:

Finds the user by email.

Compares the submitted password with the stored bcrypt hash.

Creates an access token.

Creates a refresh token.

Stores refresh token information server-side.

Returns the access token.

Stores the refresh token in an HTTP-only cookie.

Access Token

The access token is short-lived and is used for protected API requests.

Authorization: Bearer <access-token>

Refresh Token

The refresh token is used to obtain a new access token after the access token expires.

It is stored in an HTTP-only cookie so browser JavaScript cannot directly access it. The backend also keeps track of the refresh token/session so it can be invalidated during logout.

Authentication Flow

Register
   ↓
Validate Input
   ↓
Check Existing Email
   ↓
Hash Password
   ↓
Create User

Login
   ↓
Validate Credentials
   ↓
Compare Password
   ↓
Create Access Token
   ↓
Create Refresh Token
   ↓
Store Refresh Token
   ↓
Return Access Token

Access Token Expires
   ↓
Refresh Token Request
   ↓
Validate Refresh Token
   ↓
Check Server-side Session
   ↓
Create New Access Token

Logout
   ↓
Invalidate Refresh Token
   ↓
Clear Refresh Token Cookie
   ↓
Session Ends

User Roles

The application will support:

user
seller

Authentication identifies the user. Authorization determines what that user is allowed to do.

A logged-in user should not automatically be allowed to update or delete another seller's products.

Product APIs

Method

Endpoint

Description

Access

POST

/api/products

Create product

Authenticated

GET

/api/products

Get all products

Public

GET

/api/products/:id

Get single product

Public

PUT

/api/products/:id

Update product

Authenticated

DELETE

/api/products/:id

Delete product

Authenticated

The final authorization layer will ensure that product management actions are performed only by users who have permission to perform them.

A product is expected to contain:

name
description
price
category
images
quantity
seller
createdAt
updatedAt

Cart

The cart belongs to a user and stores products that the user intends to purchase.

Main operations:

Add Product
    ↓
Update Quantity
    ↓
Remove Product
    ↓
View Cart
    ↓
Calculate Total

The backend will validate product information and quantities instead of trusting values calculated only by the frontend.

Orders

The order module will manage checkout requests.

An order is expected to contain:

user
products
quantity
price
totalAmount
shippingAddress
paymentStatus
orderStatus
createdAt
updatedAt

Planned order flow:

User
  ↓
Cart
  ↓
Checkout
  ↓
Create Order
  ↓
Payment
  ↓
Order Confirmation
  ↓
Order History

Order and payment functionality will be implemented after the core authentication, product and cart functionality.

Frontend

The frontend will be built using React.

Its main responsibility is to provide the user interface and communicate with the backend APIs.

Planned pages and features include:

Home

Product listing

Product details

Login

Register

Cart

Checkout

Orders

User profile

Seller dashboard

Product management

The frontend will not connect directly to MongoDB.

React
  ↓
HTTP Request
  ↓
Express API
  ↓
Controller
  ↓
MongoDB

Validation

Request validation is handled using express-validator.

Validation will be applied to:

Request body

URL parameters

Query parameters

Examples include:

Email format

Password requirements

Required fields

Confirm password

Product price

Product quantity

MongoDB ObjectId

Invalid input will return a 400 Bad Request response.

Error Handling

The API will use standard HTTP status codes:

Status

Meaning

200

OK

201

Created

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

500

Internal Server Error

Examples:

Invalid request data → 400

Invalid login credentials → 401

Authenticated but not allowed → 403

Resource not found → 404

Duplicate email → 409

Security

The backend is designed with:

Password hashing with bcrypt

Short-lived JWT access tokens

Refresh token management

HTTP-only refresh token cookies

Environment variables for secrets

Authentication middleware

Request validation

MongoDB ObjectId validation

Helmet

CORS

Rate limiting

Generic authentication error messages

Sensitive configuration such as the MongoDB connection string and JWT secrets is kept in environment variables and is not committed to Git.

Database

MongoDB Atlas is used as the database.

Mongoose is used to define schemas and communicate with MongoDB.

Main data areas:

users
products
carts
orders

The corresponding collections will be managed through Mongoose models.

Environment Variables

Create a .env file inside the backend directory.

PORT=3000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

Never commit the actual .env file to GitHub.

A .env.example file is included to show the required variables without exposing sensitive values.

Installation

Requirements

Node.js

npm

Git

MongoDB Atlas account

Clone the Repository

git clone https://github.com/umakantatech-eng/snitch-ecommerce.git
cd snitch-ecommerce

Backend Setup

cd backend
npm install

Create:

backend/.env

Add the required environment variables and start the development server:

npm run dev

The backend currently runs on:

http://localhost:3000

API Base URL

During local development:

http://localhost:3000

API routes use the /api prefix.

Examples:

POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
GET  /api/auth/me

GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

API Testing

The APIs can be tested using Postman or another API testing tool.

Important cases include:

User registration

Duplicate email

Login

Invalid credentials

Access token authentication

Refresh token

Logout

Product creation

Product listing

Product update

Product deletion

Validation errors

Invalid MongoDB IDs

Unauthorized requests

Development Workflow

The project is being developed feature by feature.

A typical backend feature follows:

Requirement
    ↓
Model / Schema
    ↓
Validation
    ↓
Controller
    ↓
Route
    ↓
Middleware
    ↓
API Testing
    ↓
Frontend Integration

This keeps the development process manageable and makes each feature easier to test before moving to the next one.

Git and GitHub

Git is used for local version control and GitHub is used as the remote repository.

Repository:

https://github.com/umakantatech-eng/snitch-ecommerce

Basic workflow:

git status
git add .
git commit -m "your commit message"
git push origin main

Changes are committed in small steps so that individual features and fixes can be tracked.

Current Status

The project is currently under development.

Backend Setup Completed

Node.js project setup

Express setup

ES Modules configuration

MongoDB Atlas connection

Mongoose setup

Environment variable setup

bcrypt setup

JWT dependencies

Cookie parser

CORS

Helmet

express-validator

express-rate-limit

Nodemon

Feature-based project structure

Currently Being Implemented

User model

Authentication

Registration API

Login API

Access token

Refresh token

Authentication middleware

Upcoming

Complete authentication flow

Product CRUD

Product ownership and seller authorization

React frontend

Cart

Orders

Payment integration

Deployment

Planned Application Flow

Customer Flow

Register / Login
      ↓
Browse Products
      ↓
Product Details
      ↓
Add to Cart
      ↓
Checkout
      ↓
Create Order
      ↓
Payment
      ↓
Order Confirmation
      ↓
Order History

Seller Flow

Login
  ↓
Seller Authorization
  ↓
Seller Dashboard
  ↓
Create Product
  ↓
Update Product
  ↓
Delete Product
  ↓
Manage Products

Future Features

After the core application is stable, additional features may include:

Product search

Product filtering

Product sorting

Pagination

Categories

Product image upload

Wishlist

Multiple shipping addresses

Seller dashboard

Order management

Payment gateway

Email notifications

Admin functionality

Automated tests

Production logging

Deployment

CI/CD

Project Goal

The goal is to build a complete e-commerce application while understanding how the different parts of a real full-stack application work together.

The project covers:

REST API development

Authentication

Authorization

JWT

Refresh tokens

Password security

MongoDB

Mongoose

Request validation

Middleware

Product CRUD

Cart management

Order management

React frontend

API integration

Git and GitHub

Deployment

The application is being built incrementally so that each feature can be understood, tested and improved before moving to the next one.

Repository

GitHub:

https://github.com/umakantatech-eng/snitch-ecommerce

License

This project is currently being developed for learning and portfolio purposes.