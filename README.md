# Backend API Documentation

## `users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information

### HTTP Method

`POST`

### Endpoint

`/users/register`

### Request Body

The request body should in JSON format and include the following fields:

- `fullname` (object):
- `firstname` (string, required): User's first name (minimum 3 characters)
- `lastname` (string, optional): User's last name (minimum 3 characters)
- `email` (string, required): User's email address (must be a vaild email)
