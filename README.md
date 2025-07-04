# 💬 Tier Group Chat App (Frontend)

A real-time chat application interface built for company teams to collaborate efficiently.  
This frontend connects to a separate Node.js + Socket.IO backend and supports multiple chat rooms to keep team discussions organized.

---

## ✨ Features

- 🔐 **User Authentication** – Secure login and registration (via backend API)
- 💬 **Real-Time Messaging** – Instant updates using WebSocket events
- 🧩 **Multiple Chat Rooms** – Organized communication per team or topic
- 📜 **Message History** – View and scroll through past messages
- 📎  **File/Image Sharing** – Upload and share files within chat rooms

---

## 🛠️ Tech Stack Used (Frontend Only)

- **Framework:** React  
- **WebSocket Client:** Socket.IO for real time communication  
- **API Communication:** Axios

---

## 📦 Server

> 👉 The backend sever is located in a separate repository. You can either use the hosted verion or run locally
### ✅ Option 1: Hosted Backend (Recommended for Demo)

No need to run any backend locally.

### ✅ Option 2: Running Locally

> To run the server locally you’ll need to clone and run it alongside this frontend for full functionality.

**Backend repo**: [chat-app-backend](https://github.com/hyemiie/chat_server)

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Git

### Installation

1. **Clone this repository**:
```bash
git clone https://github.com/hyemiie/chatApplication
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start development server**:

```bash
npm run dev
```

4. **View the app**:
Open your browser and navigate to http://localhost:3000


📱 Usage

- Sign up for a new account or log in with existing credentials
- Create a new room or join an existing room
- Start chatting with your team members in real-time
- Switch between rooms to organize conversations by topic or team


This chat app was built to demonstrate WebSocket integration and frontend architecture. Feel free to reach out if you have any questions or suggestions!

GitHub: @hyemiie
Email: yemiojedapo1@gmail.com
