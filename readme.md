<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4DF0C0,100:7B6EF6&height=200&section=header&text=AI%20Meeting%20Coach&fontSize=48&fontColor=ffffff&fontAlignY=38&desc=Real-time%20AI-powered%20meeting%20platform&descAlignY=58&descSize=18" width="100%"/>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

<br/>

> A real-time AI-powered meeting platform where users can join a video call and interact with an AI agent designed for coaching, consultation, interview practice, or guided conversations.
>
> Integrates **Stream Video SDK** for real-time communication and **OpenAI Realtime API** for AI voice interaction.

<br/>

</div>

---

## ✨ Features

- 🎥 &nbsp;**Real-time video/audio meetings**
- 🤖 &nbsp;**AI agent automatically joins meetings**
- 🛠️ &nbsp;**Custom AI agents** with configurable instructions
- 🎙️ &nbsp;**Voice-based conversation** with AI
- ⚡ &nbsp;**Automatic AI session management**
- 🔗 &nbsp;**Meeting lifecycle handling** using webhooks
- 📋 &nbsp;**Agent creation and management** dashboard
- 🗂️ &nbsp;**Redux-based** frontend state management
- 🧑‍🤝‍🧑 &nbsp;**Dynamic avatars** for agents and users

---

## 🏗️ Architecture Overview

The platform consists of three main layers:

<table>
<tr>
<td width="33%" valign="top">

### 🖥️ Frontend
Built using **React** and the **Stream Video React SDK**

**Responsibilities:**
- Creating and joining meetings
- Rendering video/audio sessions
- Displaying AI agents
- Managing meeting state
- Handling user interactions

**Main components:**
- `Room` – Video meeting interface
- `MeetingList` – List of meetings
- `AgentsList` – Agent management UI
- `AgentDialog` – Create agent dialog

</td>
<td width="33%" valign="top">

### 🗄️ Backend
**Node.js** server responsible for:

- Generating Stream tokens
- Handling Stream webhooks
- Connecting AI agents to meetings
- Managing meeting lifecycle
- Storing agents and meetings in the database

**Key modules:**
```
controllers/
   webhook.js
models/
   Agent.js
routes/
   streamRoutes.js
```

</td>
<td width="33%" valign="top">

### 🧠 AI Agent Layer
Powered by **OpenAI Realtime API**

When a meeting starts:

```
User joins meeting
       ↓
Stream sends webhook
       ↓
Backend receives event
       ↓
AI agent connects
       ↓
OpenAI session starts
```

Agents use instructions defined at creation time.

</td>
</tr>
</table>

---

## 🔄 Meeting Lifecycle

<table>
<tr>
<td width="33%" valign="top">

### 🟢 Session Start
```
call.session_started
```
Backend performs:
- Fetch agent configuration
- Connect OpenAI realtime session
- Join AI to the meeting
- Send greeting message

</td>
<td width="33%" valign="top">

### 🟡 Participant Leaves
```
call.session_participant_left
```
If the human participant leaves:
- AI session closes
- Agent disconnects
- Session removed from memory

</td>
<td width="33%" valign="top">

### 🔴 Session End
```
call.session_ended
```
Backend performs:
- Close the AI session
- Clean up all resources

</td>
</tr>
</table>

---

## 📁 Project Structure

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

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

**Frontend**
| Technology | Purpose |
|---|---|
| React | UI framework |
| Redux Toolkit | State management |
| Stream Video React SDK | Video/audio calls |
| TailwindCSS | Styling |

</td>
<td width="50%" valign="top">

**Backend**
| Technology | Purpose |
|---|---|
| Node.js + Express | Server |
| MongoDB | Database |
| Stream Video Node SDK | Meeting management |
| OpenAI Realtime API | AI voice agent |

</td>
</tr>
</table>

---

## 🤖 How AI Agents Work

Agents are created with a **name** and **instructions** that define their behavior:

```
Name: Interview Coach

Instruction:
You are an AI interview coach helping users practice technical interviews.
Ask questions and provide constructive feedback.
```

```
Name: Meditation Coach

Instruction:
You are a calm meditation coach guiding the user through breathing exercises.
```

When a meeting starts, the AI agent uses these instructions to guide the entire conversation.

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory:

```env
STREAM_API_KEY=
STREAM_SECRET=
OPENAI_API_KEY=
MONGODB_URI=
```

---

## 🚀 Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/ai-meeting-coach.git
cd ai-meeting-coach
```

**2. Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

**3. Run the project**

```bash
# Start backend
npm run dev

# Start frontend
npm run dev
```

---

## 🗺️ Future Improvements

| Feature | Status |
|---|---|
| Meeting transcripts | 🔜 Planned |
| Conversation summaries | 🔜 Planned |
| Redis session management | 🔜 Planned |
| Multi-user meeting support | 🔜 Planned |
| AI memory between sessions | 🔜 Planned |
| Analytics dashboard | 🔜 Planned |
| Meeting recordings | 🔜 Planned |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7B6EF6,100:4DF0C0&height=100&section=footer" width="100%"/>

</div>