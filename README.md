# AI Chatbot Backend 🧠

A robust **Node.js + Express + MongoDB** backend providing conversational AI capabilities via NLP, designed to power chatbots across web and mobile platforms.

---

## 📝 Overview

This repository implements the backend for an AI-powered chatbot featuring:

- Intent and entity detection using NLP  
- MongoDB-based storage for conversations and context  
- A REST API enabling seamless interaction from frontend services

Designed for multi-platform integration—including web and mobile—the backend enables rich user engagement and customer support automation. :contentReference[oaicite:1]{index=1}

---

## ✨ Features

- **Message processing**: Incoming texts are processed to extract intent/entities and generate replies  
- **Conversation storage**: Full message history preserved in MongoDB  
- **Stateless per session**: Supports multi-turn dialogues via session tracking  
- **Simple and extendable**: Easily integrate advanced NLP or generative AI models  
- **Clean RESTful API**: Minimal endpoints for easy use and integration

---

## 🛠️ Tech Stack

- **Node.js** & **Express** – HTTP server and routing  
- **MongoDB** with **Mongoose** – Data storage for messages & session context  
- **node-nlp** (or NLP.js) – NLP engine for intent and entity recognition  
- **dotenv** – Configuration via environment variables  
- **Optional**: OpenAI GPT integration for smarter responses :contentReference[oaicite:2]{index=2}

---

## 📋 Prerequisites

- Node.js v14+  
- MongoDB (local or Atlas)  
- (Optional) OpenAI API Key if using GPT integration

---

## 🏗️ Installation

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourname/ai-chatbot-backend.git
   cd ai-chatbot-backend
   
2. **Install dependencies**:
   ```bash
   npm install
   
3. **Configure Environment: Create a .env file**:
   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ai_chatbot
   
4. **Start server**:
   ```bash
   npm start

Server will run on `http://localhost:4000`

**🚀 Usage**
**🔄 Chat Endpoint**
POST `/api/chat`

- Request:
  ```json
    {
      "userId": "user123",
      "text": "Hi there!"
    }

- Response:
  ```json
    {
      "reply": "Hello! How can I help you?",
      "intent": "greet",
      "entities": []
    }
  
**📚 Conversation History**
GET `/api/history/:userId`
Retrieves all past messages for a user, sorted chronologically.
