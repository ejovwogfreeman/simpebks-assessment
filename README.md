## E-Commerce Backend API Documentation

### Overview

This Node.js backend provides an API for managing order items and updating seller account information for a Brazilian E-Commerce platform. The API includes endpoints for listing order items, deleting a specific order item, and updating the seller's account details.

### Importing Data

Before using the API, make sure to import the necessary CSV records from the [Brazilian E-Commerce Public Dataset by Olist](https://www.kaggle.com/olistbr/brazilian-ecommerce). The following CSV files should be imported into a MongoDB database:

- olist_order_items_dataset.csv
- olist_products_dataset.csv
- olist_sellers_dataset.csv

### Authentication

Authentication is required for accessing certain endpoints. HTTP Basic authentication is used, with the `seller_id` and `seller_zip_code_prefix` from the `olist_sellers_dataset` collection serving as the username and password, respectively.

### Endpoints

#### 1. Upload CSV

- **Endpoint**: `/upload_csv` (Authentication is not required for this route. This decision has been made to facilitate access to information in the database.)
- **Method**: `POST`
- **Description**: Uploads all three CSV to the DB
- **Status Codes**:
  - 200 OK: Successful request
  - 401 Unauthorized: Authentication failure

#### 2. Login User

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user with the `seller_id` and `seller_zip_code_prefix` from the `olist_sellers_dataset` collection serving as the username and password, respectively.
- **Status Codes**:
  - 200 OK: Successful request
  - 401 Unauthorized: Authentication failure

#### 3. List Order Items

- **Endpoint**: `/order_items`
- **Method**: `GET`
- **Description**: List all order items that belong to the logged-in user. Supports sorting by `price` or `shipping_limit_date` (default). Allows pagination with a `limit` parameter (default 20) and an `offset` query parameter.
- **Response Format**:
  ```json
  {
    "data": [
      {
        "id": "order_item_id",
        "product_id": "product_id",
        "product_category": "products.product_category_name",
        "price": "price",
        "date": "shipping_limit_date"
      }
    ],
    "total": 90214,
    "limit": 20,
    "offset": 560
  }
  ```
- **Status Codes**:
  - 200 OK: Successful request
  - 401 Unauthorized: Authentication failure

#### 4. Delete Order Item

- **Endpoint**: `/order_items/:id`
- **Method**: `DELETE`
- **Description**: Delete an order item by ID from the order items collection.
- **Status Codes**:
  - 200 OK: Order item deleted successfully
  - 404 Not Found: Order item not found
  - 401 Unauthorized: Authentication failure

#### 5. Update Seller's Account

- **Endpoint**: `/account`
- **Method**: `PUT`
- **Description**: Update the logged-in seller's city and/or state. Returns the new seller city and state as a response.
- **Request Body**:
  ```json
  {
    "seller_city": "new_city",
    "seller_state": "new_state"
  }
  ```
- **Response Format**:
  ```json
  {
    "seller": {
      "seller_city": "new_city",
      "seller_state": "new_state"
    }
  }
  ```
- **Status Codes**:
  - 200 OK: Account updated successfully
  - 404 Not Found: Seller not found
  - 401 Unauthorized: Authentication failure

### ES6 and Linting

The codebase adheres to ES6 syntax and follows the StandardJS style guide for linting.

### Testing

Unit tests have been implemented for each endpoint using a testing framework of your choice. Ensure that tests cover various scenarios, including success cases and error handling.

### Repository

The code is hosted on [GitHub](https://github.com/ejovwogfreeman/simplebks-assessment.git). Please visit the repository for the latest code and updates.

### Getting Started

1. Clone the repository: `git clone https://github.com/ejovwogfreeman/simplebks-assessment.git`
2. Install dependencies: `npm install`
3. Run the server: `npm start`

### Contributors

- [Ejovwo Godbless](https://github.com/ejovwogfreeman) (ejovwogfreeman007@gmail.com)

Feel free to open issues or submit pull requests for improvements and bug fixes. Your contributions are welcome!

Note: The .env file has been made public to facilitate testing.s
