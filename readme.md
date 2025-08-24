# API Documentation

This is a simple API for managing users. It supports the following endpoints:

## POST /auth/register

Registers a new user.

Request Body:

* `name`: The user's name
* `email`: The user's email address
* `password`: The user's password

Response:

* `user`: The newly created user object
* `token`: A JSON Web Token that can be used to authenticate the user

## POST /auth/login

Logs in an existing user.

Request Body:

* `email`: The user's email address
* `password`: The user's password

Response:

* `user`: The user object
* `token`: A JSON Web Token that can be used to authenticate the user

## GET /auth/users/me

Gets the currently logged in user.

Request Headers:

* `Authorization`: The JSON Web Token obtained from the login endpoint

Response:

* `user`: The user object

## GET /auth/users/:id

Gets a user by ID.

Request Headers:

* `Authorization`: The JSON Web Token obtained from the login endpoint

Path Parameters:

* `id`: The ID of the user to retrieve

Response:

* `user`: The user object

## PUT /auth/users/:id

Updates a user.

Request Headers:

* `Authorization`: The JSON Web Token obtained from the login endpoint

Path Parameters:

* `id`: The ID of the user to update

Request Body:

* `name`: The user's name
* `email`: The user's email address
* `password`: The user's password

Response:

* `user`: The updated user object

## DELETE /auth/users/:id

Deletes a user.

Request Headers:

* `Authorization`: The JSON Web Token obtained from the login endpoint

Path Parameters:

* `id`: The ID of the user to delete

Response:

* `message`: A success message indicating that the user was deleted

## POST /auth/logout

Logs out the currently logged in user.

Request Headers:

* `Authorization`: The JSON Web Token obtained from the login endpoint

Response:

* `message`: A success message indicating that the user was logged out
