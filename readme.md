<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>AI Meeting Coach Platform</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #070910;
    --surface: #0e1117;
    --surface2: #151820;
    --border: rgba(255,255,255,0.07);
    --accent: #4DF0C0;
    --accent2: #7B6EF6;
    --accent3: #F06A6A;
    --text: #e8eaf0;
    --muted: #6b7280;
    --glow: rgba(77,240,192,0.15);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.7;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* GRID BACKGROUND */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(77,240,192,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(77,240,192,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  /* NOISE OVERLAY */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .wrap {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px 120px;
  }

  /* ─── HEADER ─── */
  header {
    padding: 80px 0 60px;
    position: relative;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(77,240,192,0.08);
    border: 1px solid rgba(77,240,192,0.2);
    border-radius: 100px;
    padding: 6px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .badge::before {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 20px;
  }

  h1 .line1 { display: block; color: var(--text); }
  h1 .line2 {
    display: block;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 17px;
    color: var(--muted);
    max-width: 560px;
    font-weight: 300;
    line-height: 1.7;
  }

  /* ─── FEATURE CHIPS ─── */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 40px 0 0;
  }

  .chip {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 12.5px;
    color: var(--muted);
    font-family: 'DM Mono', monospace;
    transition: all 0.2s;
  }

  .chip:hover {
    border-color: rgba(77,240,192,0.3);
    color: var(--accent);
    background: rgba(77,240,192,0.04);
  }

  /* ─── SECTION TITLES ─── */
  .section {
    margin-top: 80px;
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
    max-width: 80px;
  }

  h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 3vw, 30px);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 28px;
    color: var(--text);
  }

  h3 {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  p { color: var(--muted); font-size: 15px; margin-bottom: 14px; }

  /* ─── ARCHITECTURE CARDS ─── */
  .arch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }

  .arch-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }

  .arch-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .arch-card.frontend::before { background: linear-gradient(90deg, var(--accent2), transparent); }
  .arch-card.backend::before  { background: linear-gradient(90deg, var(--accent), transparent); }
  .arch-card.ai::before       { background: linear-gradient(90deg, var(--accent3), transparent); }

  .arch-card:hover {
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-3px);
  }

  .arch-icon {
    font-size: 26px;
    margin-bottom: 14px;
    display: block;
  }

  .arch-card ul {
    list-style: none;
    margin-top: 12px;
  }

  .arch-card ul li {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    padding: 4px 0;
    padding-left: 14px;
    position: relative;
  }

  .arch-card ul li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 10px;
  }

  /* ─── FLOW DIAGRAM ─── */
  .flow {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .flow-step {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 420px;
  }

  .flow-node {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 20px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--text);
    flex: 1;
    text-align: center;
    transition: all 0.2s;
  }

  .flow-node:hover {
    border-color: rgba(77,240,192,0.4);
    color: var(--accent);
  }

  .flow-node.highlight {
    background: rgba(77,240,192,0.07);
    border-color: rgba(77,240,192,0.3);
    color: var(--accent);
  }

  .flow-arrow {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 420px;
    padding: 6px 0;
    color: var(--muted);
    font-size: 18px;
  }

  /* ─── LIFECYCLE ─── */
  .lifecycle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }

  .lifecycle-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 26px;
    transition: all 0.25s;
  }

  .lifecycle-card:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-2px);
  }

  .event-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent2);
    background: rgba(123,110,246,0.1);
    border: 1px solid rgba(123,110,246,0.2);
    border-radius: 6px;
    padding: 4px 10px;
    display: inline-block;
    margin-bottom: 16px;
  }

  .lifecycle-card ul {
    list-style: none;
    margin-top: 12px;
  }

  .lifecycle-card ul li {
    font-size: 13px;
    color: var(--muted);
    padding: 5px 0;
    padding-left: 18px;
    position: relative;
    border-bottom: 1px solid var(--border);
  }

  .lifecycle-card ul li:last-child { border-bottom: none; }

  .lifecycle-card ul li::before {
    content: '·';
    position: absolute;
    left: 4px;
    color: var(--accent);
    font-size: 20px;
    line-height: 1;
    top: 4px;
  }

  /* ─── CODE BLOCK ─── */
  .code-block {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin: 20px 0;
  }

  .code-header {
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .code-dots { display: flex; gap: 6px; }
  .code-dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-r { background: #FF5F57; }
  .dot-y { background: #FFBD2E; }
  .dot-g { background: #28CA41; }

  .code-title {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    margin-left: 8px;
    letter-spacing: 0.05em;
  }

  pre {
    padding: 22px;
    overflow-x: auto;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    line-height: 1.8;
    color: #a8b3c8;
  }

  .kw  { color: var(--accent2); }
  .str { color: var(--accent); }
  .cm  { color: #4a5568; font-style: italic; }
  .var { color: var(--accent3); }

  /* ─── TECH STACK ─── */
  .stack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .stack-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 26px;
  }

  .stack-card h3 {
    margin-bottom: 18px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
  }

  .stack-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13.5px;
    color: var(--text);
    font-weight: 400;
  }

  .stack-item:last-child { border-bottom: none; }

  .stack-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* ─── ENV TABLE ─── */
  .env-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
  }

  .env-table th {
    text-align: left;
    padding: 10px 16px;
    color: var(--muted);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 1px solid var(--border);
  }

  .env-table td {
    padding: 13px 16px;
    border-bottom: 1px solid var(--border);
    color: var(--text);
  }

  .env-table tr:last-child td { border-bottom: none; }

  .env-table td:first-child { color: var(--accent); }
  .env-table td:last-child { color: var(--muted); font-size: 12px; }

  /* ─── FUTURE LIST ─── */
  .future-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    list-style: none;
  }

  .future-list li {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
    font-size: 13.5px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s;
  }

  .future-list li:hover {
    border-color: rgba(77,240,192,0.25);
    color: var(--text);
  }

  .future-list li::before {
    content: '○';
    color: var(--accent);
    font-size: 10px;
    flex-shrink: 0;
  }

  /* ─── INSTALL STEPS ─── */
  .steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .step {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 16px;
    align-items: start;
  }

  .step-num {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(77,240,192,0.08);
    border: 1px solid rgba(77,240,192,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: var(--accent);
    flex-shrink: 0;
  }

  .step-body h3 { margin-bottom: 6px; font-size: 15px; }

  /* ─── LICENSE ─── */
  .license-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .license-badge {
    background: rgba(123,110,246,0.1);
    border: 1px solid rgba(123,110,246,0.25);
    border-radius: 12px;
    padding: 16px 22px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: var(--accent2);
    white-space: nowrap;
  }

  /* ─── DIVIDER ─── */
  .divider {
    height: 1px;
    background: var(--border);
    margin: 70px 0 0;
  }

  /* ─── ANIMATIONS ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .section { animation: fadeUp 0.6s ease both; }
  .section:nth-child(1)  { animation-delay: 0.05s; }
  .section:nth-child(2)  { animation-delay: 0.10s; }
  .section:nth-child(3)  { animation-delay: 0.15s; }
  .section:nth-child(4)  { animation-delay: 0.20s; }
  .section:nth-child(5)  { animation-delay: 0.25s; }
  .section:nth-child(6)  { animation-delay: 0.30s; }

  @media (max-width: 600px) {
    .stack-grid { grid-template-columns: 1fr; }
    .arch-grid  { grid-template-columns: 1fr; }
    .lifecycle-grid { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<div class="wrap">

  <!-- HEADER -->
  <header>
    <div class="badge">Platform Documentation</div>
    <h1>
      <span class="line1">AI Meeting Coach</span>
      <span class="line2">Platform</span>
    </h1>
    <p class="subtitle">
      A real-time AI-powered meeting platform where users can join a video call and interact with an AI agent designed for coaching, consultation, interview practice, or guided conversations.
    </p>
    <div class="chips">
      <span class="chip">Stream Video SDK</span>
      <span class="chip">OpenAI Realtime API</span>
      <span class="chip">React</span>
      <span class="chip">Node.js</span>
      <span class="chip">MongoDB</span>
      <span class="chip">Redux Toolkit</span>
      <span class="chip">TailwindCSS</span>
    </div>
  </header>

  <div class="divider"></div>

  <!-- FEATURES -->
  <section class="section">
    <div class="section-label">01 — Features</div>
    <h2>What it does</h2>
    <div class="arch-grid">
      <div class="arch-card frontend">
        <span class="arch-icon">🎥</span>
        <h3>Real-time Meetings</h3>
        <ul>
          <li>Video &amp; audio calls</li>
          <li>AI agent auto-joins</li>
          <li>Dynamic avatars</li>
        </ul>
      </div>
      <div class="arch-card ai">
        <span class="arch-icon">🤖</span>
        <h3>AI Agents</h3>
        <ul>
          <li>Custom instructions</li>
          <li>Voice-based conversation</li>
          <li>Auto session management</li>
        </ul>
      </div>
      <div class="arch-card backend">
        <span class="arch-icon">⚙️</span>
        <h3>Management</h3>
        <ul>
          <li>Agent dashboard</li>
          <li>Meeting lifecycle hooks</li>
          <li>Redux state management</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ARCHITECTURE -->
  <section class="section">
    <div class="section-label">02 — Architecture</div>
    <h2>Three-layer system</h2>

    <div class="arch-grid">
      <div class="arch-card frontend">
        <span class="arch-icon">🖥️</span>
        <h3>Frontend</h3>
        <p style="font-size:13px; margin-bottom:10px;">React + Stream Video React SDK</p>
        <ul>
          <li>Create &amp; join meetings</li>
          <li>Render video/audio sessions</li>
          <li>Display AI agents</li>
          <li>Handle user interactions</li>
        </ul>
        <br/>
        <div style="font-family:'DM Mono',monospace; font-size:11px; color:var(--muted);">
          Room · MeetingList · AgentsList · AgentDialog
        </div>
      </div>

      <div class="arch-card backend">
        <span class="arch-icon">🗄️</span>
        <h3>Backend</h3>
        <p style="font-size:13px; margin-bottom:10px;">Node.js + Express + MongoDB</p>
        <ul>
          <li>Generate Stream tokens</li>
          <li>Handle webhooks</li>
          <li>Connect AI agents</li>
          <li>Manage meeting lifecycle</li>
        </ul>
        <br/>
        <div style="font-family:'DM Mono',monospace; font-size:11px; color:var(--muted);">
          webhook.js · Agent.js · streamRoutes.js
        </div>
      </div>

      <div class="arch-card ai">
        <span class="arch-icon">🧠</span>
        <h3>AI Agent Layer</h3>
        <p style="font-size:13px; margin-bottom:10px;">OpenAI Realtime API</p>
        <ul>
          <li>Fetch agent config</li>
          <li>Start OpenAI session</li>
          <li>Join meeting</li>
          <li>Send greeting</li>
        </ul>
        <br/>
        <div style="font-family:'DM Mono',monospace; font-size:11px; color:var(--muted);">
          Instruction-driven · Voice-native
        </div>
      </div>
    </div>
  </section>

  <!-- AI FLOW -->
  <section class="section">
    <div class="section-label">03 — AI Agent Flow</div>
    <h2>How agents connect</h2>
    <div class="flow">
      <div class="flow-step">
        <div class="flow-node">User joins meeting</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <div class="flow-node">Stream sends webhook</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <div class="flow-node">Backend receives event</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <div class="flow-node">AI agent connects to meeting</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <div class="flow-node highlight">Realtime OpenAI session starts</div>
      </div>
    </div>

    <div style="margin-top:24px;">
      <div class="code-block">
        <div class="code-header">
          <div class="code-dots"><div class="code-dot dot-r"></div><div class="code-dot dot-y"></div><div class="code-dot dot-g"></div></div>
          <span class="code-title">Example Agent Instruction</span>
        </div>
        <pre><span class="cm">// Agent: Interview Coach</span>
<span class="kw">Name:</span> <span class="str">Interview Coach</span>

<span class="kw">Instruction:</span>
<span class="str">You are an AI interview coach helping users
practice technical interviews. Ask questions
and provide constructive feedback.</span></pre>
      </div>
    </div>
  </section>

  <!-- LIFECYCLE -->
  <section class="section">
    <div class="section-label">04 — Lifecycle</div>
    <h2>Meeting events</h2>
    <div class="lifecycle-grid">
      <div class="lifecycle-card">
        <span class="event-tag">call.session_started</span>
        <h3>Session Start</h3>
        <ul>
          <li>Fetch agent configuration</li>
          <li>Connect OpenAI realtime session</li>
          <li>Join AI to the meeting</li>
          <li>Send greeting message</li>
        </ul>
      </div>
      <div class="lifecycle-card">
        <span class="event-tag">call.session_participant_left</span>
        <h3>Participant Leaves</h3>
        <ul>
          <li>AI session closes</li>
          <li>Agent disconnects</li>
          <li>Session removed from memory</li>
        </ul>
      </div>
      <div class="lifecycle-card">
        <span class="event-tag">call.session_ended</span>
        <h3>Session End</h3>
        <ul>
          <li>Close AI session</li>
          <li>Clean up resources</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- PROJECT STRUCTURE -->
  <section class="section">
    <div class="section-label">05 — Structure</div>
    <h2>Project layout</h2>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot dot-r"></div><div class="code-dot dot-y"></div><div class="code-dot dot-g"></div></div>
        <span class="code-title">project-root</span>
      </div>
      <pre><span class="var">project-root/</span>
├── <span class="kw">backend/</span>
│   ├── controllers/
│   │   └── <span class="str">webhook.js</span>
│   ├── models/
│   │   └── <span class="str">Agent.js</span>
│   ├── routes/
│   │   └── <span class="str">streamRoutes.js</span>
│   └── <span class="str">server.js</span>
│
├── <span class="kw">frontend/</span>
│   ├── components/
│   ├── pages/
│   │   └── <span class="str">Room.jsx</span>
│   ├── store/
│   │   └── <span class="cm">redux slices</span>
│   └── <span class="str">App.jsx</span>
│
└── <span class="str">README.md</span></pre>
    </div>
  </section>

  <!-- TECH STACK -->
  <section class="section">
    <div class="section-label">06 — Tech Stack</div>
    <h2>Technologies used</h2>
    <div class="stack-grid">
      <div class="stack-card">
        <h3>Frontend</h3>
        <div class="stack-item"><span class="stack-dot"></span>React</div>
        <div class="stack-item"><span class="stack-dot"></span>Redux Toolkit</div>
        <div class="stack-item"><span class="stack-dot"></span>Stream Video React SDK</div>
        <div class="stack-item"><span class="stack-dot"></span>TailwindCSS</div>
      </div>
      <div class="stack-card">
        <h3>Backend</h3>
        <div class="stack-item"><span class="stack-dot"></span>Node.js</div>
        <div class="stack-item"><span class="stack-dot"></span>Express</div>
        <div class="stack-item"><span class="stack-dot"></span>MongoDB</div>
        <div class="stack-item"><span class="stack-dot"></span>Stream Video Node SDK</div>
        <div class="stack-item"><span class="stack-dot"></span>OpenAI Realtime API</div>
      </div>
    </div>
  </section>

  <!-- ENV VARIABLES -->
  <section class="section">
    <div class="section-label">07 — Configuration</div>
    <h2>Environment variables</h2>
    <p>Create a <code style="font-family:'DM Mono',monospace; color:var(--accent); background:rgba(77,240,192,0.07); padding:2px 8px; border-radius:5px; font-size:13px;">.env</code> file in the backend directory:</p>
    <div class="code-block" style="margin-top:16px;">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot dot-r"></div><div class="code-dot dot-y"></div><div class="code-dot dot-g"></div></div>
        <span class="code-title">backend/.env</span>
      </div>
      <table class="env-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>STREAM_API_KEY</td><td>Your Stream API key</td></tr>
          <tr><td>STREAM_SECRET</td><td>Your Stream secret</td></tr>
          <tr><td>OPENAI_API_KEY</td><td>OpenAI API key for Realtime API</td></tr>
          <tr><td>MONGODB_URI</td><td>MongoDB connection string</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- INSTALLATION -->
  <section class="section">
    <div class="section-label">08 — Setup</div>
    <h2>Installation</h2>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h3>Clone the repository</h3>
          <div class="code-block">
            <div class="code-header"><div class="code-dots"><div class="code-dot dot-r"></div><div class="code-dot dot-y"></div><div class="code-dot dot-g"></div></div><span class="code-title">terminal</span></div>
            <pre><span class="str">git clone</span> https://github.com/yourusername/ai-meeting-coach.git
<span class="kw">cd</span> ai-meeting-coach</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h3>Install dependencies</h3>
          <div class="code-block">
            <div class="code-header"><div class="code-dots"><div class="code-dot dot-r"></div><div class="code-dot dot-y"></div><div class="code-dot dot-g"></div></div><span class="code-title">backend + frontend</span></div>
            <pre><span class="cm"># Backend</span>
<span class="kw">cd</span> backend && <span class="str">npm install</span>

<span class="cm"># Frontend</span>
<span class="kw">cd</span> frontend && <span class="str">npm install</span></pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h3>Run the project</h3>
          <div class="code-block">
            <div class="code-header"><div class="code-dots"><div class="code-dot dot-r"></div><div class="code-dot dot-y"></div><div class="code-dot dot-g"></div></div><span class="code-title">start both servers</span></div>
            <pre><span class="cm"># Start backend</span>
<span class="str">npm run dev</span>

<span class="cm"># Start frontend</span>
<span class="str">npm run dev</span></pre>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FUTURE -->
  <section class="section">
    <div class="section-label">09 — Roadmap</div>
    <h2>Future improvements</h2>
    <ul class="future-list">
      <li>Meeting transcripts</li>
      <li>Conversation summaries</li>
      <li>Redis session management</li>
      <li>Multi-user meeting support</li>
      <li>AI memory between sessions</li>
      <li>Analytics dashboard</li>
      <li>Meeting recordings</li>
    </ul>
  </section>

  <!-- LICENSE -->
  <section class="section">
    <div class="section-label">10 — License</div>
    <h2>Open source</h2>
    <div class="license-box">
      <div class="license-badge">MIT</div>
      <p style="margin:0;">This project is released under the MIT License. You are free to use, modify, and distribute this software.</p>
    </div>
  </section>

</div>
</body>
</html>