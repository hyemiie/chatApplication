import { io } from "socket.io-client";

// Use a specific URL for production, or derive it from the current location in development
const URL =
  process.env.NODE_ENV === "production" 
    ? "https://chat-server-3s8b.onrender.com" // Your production backend URL
    : "http://localhost:5000"; // Your local development URL

// Initialize the socket connection
export const socket = io(URL);
