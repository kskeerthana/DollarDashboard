User API Documentation
This API allows users to create, update, delete, and get all users' full name, email addresses, and passwords stored in the database.

Technologies Used
This API is built using the following technologies:

Node.js
Express.js
MongoDB
Bcrypt
Requirements
Node.js
MongoDB
Installation
Clone this repository:
git clone https://github.com/example/user-api.git

Install dependencies:
npm install

Start the server:
npm run server


API Endpoints
Create User
This endpoint allows you to create a user with full name, email, and password. It enforces a strong password rule and adds validation for email and full name.

Method: POST
URL: /user/create
Request Body:
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "P@ssw0rd"
}

Response:
{
  "message": "User created successfully"
}
If the user email or password is invalid, it will return a meaningful message:

json
Copy code
{
  "message": "Invalid email or password"
}
Edit User
This endpoint allows you to update a user's full name and password. Email should not get updated at any point. It throws a proper error message if the user is not in the database.

Method: PUT
URL: /user/edit
Request Body:
{
  "email": "johndoe@example.com",
  "fullName": "John Smith",
  "password": "NewP@ssw0rd"
}
Response:

{
  "message": "User updated successfully"
}
If the user is not in the database, it will return an error message:

{
  "message": "User not found"
}
Delete User
This endpoint allows you to delete a user by taking the user's email as input.

Method: DELETE
URL: /user/delete
Request Body:
{
  "email": "johndoe@example.com"
}

Response:
{
  "message": "User deleted successfully"
}


Get All Users
This endpoint allows you to get all users' full name, email addresses, and passwords stored in the database.

Method: GET
URL: /user/getAll
Response:
{
  "users": [
    {
      "fullName": "John Doe",
      "email": "johndoe@example.com",
      "password": "$2b$10$KJbgZugHmATYGr9XJUxjHeGY6R/XU6RYM.TfJgzN6DWIoKs35A2s2"
    },
    {
      "fullName": "Jane Smith",
      "email": "janesmith@example.com",
      "password": "$2b$10$C/7p9XgOTex/a1zsHJNtIOG7fy2OWCGyn75vix5W5gL8jKRYhQXea"
    }
  ]
}