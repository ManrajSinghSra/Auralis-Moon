# AI Meeting Coach Platform

A real-time AI-powered meeting platform where users can join a video call and interact with an AI agent designed for coaching, consultation, interview practice, or guided conversations.

The system integrates **Stream Video SDK** for real-time communication and **OpenAI Realtime API** for AI voice interaction. When a meeting starts, the AI agent automatically joins the call and begins interacting with the user according to predefined instructions.

---

## Features

* Real-time video/audio meetings
* AI agent automatically joins meetings
* Custom AI agents with configurable instructions
* Voice-based conversation with AI
* Automatic AI session management
* Meeting lifecycle handling using webhooks
* Agent creation and management dashboard
* Redux-based frontend state management
* Dynamic avatars for agents and users

---

## Architecture Overview

The platform consists of three main layers:

### 1. Frontend

Built using React and the Stream Video React SDK.

Responsibilities:

* Creating and joining meetings
* Rendering video/audio sessions
* Displaying AI agents
* Managing meeting state
* Handling user interactions

Main components:

* `Room` – Video meeting interface
* `MeetingList` – List of meetings
* `AgentsList` – Agent management UI
* `AgentDialog` – Create agent dialog

---

### 2. Backend

Node.js server responsible for:

* Generating Stream tokens
* Handling Stream webhooks
* Connecting AI agents to meetings
* Managing meeting lifecycle
* Storing agents and meetings in the database

Key modules:

```
controllers/
   webhook.js
models/
   Agent.js
routes/
   streamRoutes.js
```

---

### 3. AI Agent Layer

When a meeting starts:

```
User joins meeting
      ↓
Stream sends webhook
      ↓
Backend receives event
      ↓
AI agent connects to meeting
      ↓
Realtime OpenAI session starts
```

The AI agent receives instructions defined during agent creation.

Example instruction:

```
You are a calm meditation coach guiding the user through breathing exercises.
```

---

## Meeting Lifecycle

### Session Start

```
call.session_started
```

Backend performs:

* Fetch agent configuration
* Connect OpenAI realtime session
* Join AI to the meeting
* Send greeting message

---

### Participant Leaves

```
call.session_participant_left
```

If the human participant leaves:

* AI session closes
* Agent disconnects
* Session removed from memory

---

### Session End

```
call.session_ended
```

Backend closes the AI session and cleans up resources.

---

## Project Structure

```
project-root
│
├── backend
│   ├── controllers
│   │   └── webhook.js
│   ├── models
│   │   └── Agent.js
│   ├── routes
│   │   └── streamRoutes.js
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   │   └── Room.jsx
│   ├── store
│   │   └── redux slices
│   └── App.jsx
│
└── README.md
```

---

## Tech Stack

Frontend

* React
* Redux Toolkit
* Stream Video React SDK
* TailwindCSS

Backend

* Node.js
* Express
* MongoDB
* Stream Video Node SDK
* OpenAI Realtime API

---

## Environment Variables

Create a `.env` file in the backend:

```
STREAM_API_KEY=
STREAM_SECRET=
OPENAI_API_KEY=
MONGODB_URI=
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/yourusername/ai-meeting-coach.git
cd ai-meeting-coach
```

### 2. Install dependencies

Backend

```
cd backend
npm install
```

Frontend

```
cd frontend
npm install
```

---

## Running the Project

Start backend

```
npm run dev
```

Start frontend

```
npm run dev
```

---

## How AI Agents Work

Agents are created with:

* Name
* Instructions

Example:

```
Name: Interview Coach

Instruction:
You are an AI interview coach helping users practice technical interviews.
Ask questions and provide constructive feedback.
```

When a meeting starts, the AI agent uses these instructions to guide the conversation.

---

## Future Improvements

* Meeting transcripts
* Conversation summaries
* Redis session management
* Multi-user meeting support
* AI memory between sessions
* Analytics dashboard
* Meeting recordings

---

## License

MIT License
