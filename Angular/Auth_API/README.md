# Auth API

This is a simple authentication API built with Express.js, using JWT for authentication and bcrypt for password hashing.

## Endpoints

- `POST /register` - Register a new user
- `POST /login` - Login and receive a JWT token
- `GET /users` - Get list of users (requires authentication)

## Running the Server

```bash
npm install
npm start
```

The server will run on http://localhost:3000

## Testing with Postman

1. Import the `Auth_API.postman_collection.json` file into Postman.
2. First, run the "Register User" request to create a user.
3. Then, run the "Login User" request to get a JWT token (it will be stored in the collection variable).
4. Finally, run the "Get Users" request, which uses the token for authentication.

Make sure the server is running before testing.
