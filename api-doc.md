```json
1, API: User Login
URL: POST /api/login
Headers: Content-Type: application/json Body:
{
  "email": "user@example.com",
  "password": "password123"
}
Success (200):
{
  "statusCode": 200,
  "message": "login success",
  "data": "JWT_TOKEN"
}
Error (400/404):
{
  "statusCode": 400,
  "message": "Invalid email or password"
}



2, API: User Registration
URL: POST /api/register
Headers: Content-Type: application/json
Request Body:

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword"
}
Responses
Success (201):

{
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "name": "John Doe",
    "email": "user@example.com",
    "id": "uniqueUserId"
  }
}
Error (400 - Validation Error):

{
  "statusCode": 400,
  "error": "email - Invalid email format"
}
Error (400 - Email Already Used):

{
  "statusCode": 400,
  "error": "Email is already used"
}
Error (500):

json
Copy code
{
  "statusCode": 500,
  "error": "Internal Server Error"
}

3 API: Get Products
URL: GET /api/products
Description: Fetches a list of all available products.
Responses
Success (200):

json
Copy code
{
  "statusCode": 200,
  "message": "fetch products success",
  "data": [
    {
      "id": "productId1",
      "name": "Product Name 1",
      "price": 100,
      "description": "Description for Product 1"
    },
    {
      "id": "productId2",
      "name": "Product Name 2",
      "price": 200,
      "description": "Description for Product 2"
    }
  ]
}
Error (500):

{
  "statusCode": 500,
  "error": "Internal Server Error"
}

    4, API: Add to Cart
    URL: POST /api/cart

{
  "userId": "userId123",
  "productId": "productId456"
}
Responses
Success (200 - Product Already in Cart):
{
  "statusCode": 200,
  "message": "Product quantity updated in cart",
  "data": {
    "matchedCount": 1,
    "modifiedCount": 1,
    "acknowledged": true
  }
}
Success (201 - Product Added to Cart):
{
  "statusCode": 201,
  "message": "Product added to cart successfully",
  "data": {
    "userId": "userId123",
    "productId": "productId456",
    "quantity": 1
  }
}
Error (400 - Invalid Input):

json

{
  "statusCode": 400,
  "message": "Invalid productId or userId"
}
Error (500 - Internal Server Error):

json

{
  "statusCode": 500,
  "message": "Internal Server Error",
  "error": "Error message details"
}





5, GET - Fetch Cart Products
URL: GET /api/cart/:userId
Description: Retrieves all products in a user's cart.
Response:

Success (200):
{
  "statusCode": 200,
  "message": "fetch product success",
  "data": [
    {
      "productId": "123",
      "quantity": 2,
      "name": "Product A",
      "price": 20
    },
    {
      "productId": "456",
      "quantity": 1,
      "name": "Product B",
      "price": 30
    }
  ]
}
Error (500):
{
  "statusCode": 500,
  "message": "Internal Server Error",
  "error": "Error details"
}


6, DELETE - Delete Product from Cart
URL: DELETE /api/cart/:userId
Description: Removes a product from the user's cart.

Response:

Success (201):
json
Copy code
{
  "statusCode": 201,
  "message": "Product has been deleted",
  "data": {
    "productId": "123",
    "quantity": 0
  }
}
Error (500):
{
  "statusCode": 500,
  "message": "Internal Server Error",
  "error": "Error details"
}

7, PATCH - Update Product Quantity in Cart
URL: PATCH /api/cart/:userId
Description: Updates the quantity of a product in the user's cart.

Request Body:
{
  "quantity": 3
}
Response:
Success (200):
{
  "statusCode": 200,
  "message": "Product quantity has been updated",
  "data": {
    "productId": "123",
    "quantity": 3
  }
}
Error (400 - Invalid Quantity):
{
  "statusCode": 400,
  "message": "Invalid quantity provided"
}
Error (500 - Internal Server Error):

{
  "statusCode": 500,
  "message": "Failed to update product quantity",
  "error": "Error details"
}

```
