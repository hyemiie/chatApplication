# Work Group Chat App

A real-time chat application designed for company teams to collaborate effectively. This app provides different chat rooms for various work groups, making it easy to stay organized and communicate efficiently.

## Features

- **Multiple Chat Rooms**: Create and join specific rooms tailored to your workgroups
- **Real-Time Messaging**: Instant updates across all connected users
- **User Authentication**: Secure login system to protect your data
- **Message History**: Access past messages for reference

## Technologies Used

- **Frontend**: React for a dynamic and responsive user interface
- **Backend**: Node.js and Express for handling server-side operations
- **Database**: MongoDB (or your chosen database) for storing user data, messages, and rooms
- **WebSocket**: Socket.IO for real-time communication

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB or any other supported database
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/work-group-chat-app.git
   cd work-group-chat-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server and client**:
   
   Open two terminals:
   
   - Start the backend:
     ```bash
     cd server
     npm run start
     ```
   
   - Start the frontend:
     ```bash
     npm run dev
     ```

5. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`.
