# Review Service API
### Overview
This project implements a Review Service API using Node.js, Express, and MongoDB. The service allows users to add and retrieve product reviews. It includes basic validation and error handling.

### Features
- Add a review for a product
- Retrieve reviews for a specific product
- Validation for rating values
- Prevent multiple reviews from the same user for a product

### Technologies Used
- Node.js
- Express
- MongoDB (using Mongoose for ORM)
- TypeScript
- MongoDB Memory Server (for in-memory database during development/testing)

### Getting Started
#### Prerequisites
- Node.js installed on your local machine
- MongoDB installed (if not using in-memory server)

Installation
1. Clone the repository:
`git clone <repository-url>`

2. Install dependencies:
   `npm install`

3. Set up environment variables:

- By default, the server will use `PORT=3100`

### Running the Server
To start the server, run:

`npm start` 

The server will start and listen on the port specified in the .env file or default to 3100.

### Running Tests
To run the tests, use:

`npm test`


### API Endpoints
#### Get Reviews for a Product
- URL: `/api/products/:productId/reviews`
- Method: GET
- URL Params: `productId=[number]`
- Success Response:
    - Code: 200
    - Content: [{ id, product_id, content, rating, user_id }]

#### Add a Review for a Product
- URL: `/api/products/:productId/reviews`
- Method: POST
- URL Params: `productId=[number]`
- Body:
`{
  "content": "Great product!",
  "rating": 5,
  "user_id": 123
}`
- Success Response:
    - Code: 200
    - Content: { id, product_id, content, rating, user_id }
- Error Response:
    - Code: 400
    - Content: { error: "Rating is required and must be between 1 and 5" }
    - Content: { error: "User has already reviewed this product." }
      
### Error Handling
Errors are logged to the console and a generic error message is sent to the client with a 500 status code.

### Database Connection
The project uses MongoMemoryServer for an in-memory database during development/testing, which is set up in config/database.ts. For production, it connects to a MongoDB instance specified in the DATABASE_URL environment variable.
