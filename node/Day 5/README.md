# Real-time Task Board with MongoDB

A real-time task management application built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- Real-time task updates using WebSockets
- MongoDB database with Mongoose ODM
- RESTful API for task management
- Modern UI with filtering capabilities
- Toast notifications for user feedback
- Connection status monitoring

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```
4. Configure your MongoDB connection in `.env` file

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally:
   - **macOS**: `brew install mongodb-community`
   - **Ubuntu/Debian**: `sudo apt-get install mongodb`
   - **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)

2. Start MongoDB service:
   - **macOS**: `brew services start mongodb-community`
   - **Ubuntu/Debian**: `sudo systemctl start mongodb`
   - **Windows**: Run MongoDB as a service

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database user
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `PATCH /tasks/:id/toggle` - Toggle task completion
- `DELETE /tasks/:id` - Delete a task

## Socket.IO Events

### Client to Server
- `tasks:request` - Request current task list
- `task:create` - Create a new task
- `task:delete` - Delete a task
- `task:toggle` - Toggle task completion

### Server to Client
- `tasks:list` - Send task list
- `task:created` - Notify about new task
- `task:updated` - Notify about updated task
- `task:deleted` - Notify about deleted task
- `error` - Send error messages

## Project Structure

```
├── models/
│   └── Task.js          # Mongoose Task model
├── routes/
│   └── taskRoutes.js    # REST API routes
├── services/
│   └── taskService.js   # Business logic
├── socket/
│   └── taskSocket.js    # Socket.IO handlers
├── public/
│   ├── index.html       # Frontend HTML
│   ├── styles.css       # CSS styles
│   └── app.js           # Frontend JavaScript
├── server.js            # Main server file
├── package.json         # Dependencies
└── README.md            # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Environment**: dotenv for configuration

## License

MIT