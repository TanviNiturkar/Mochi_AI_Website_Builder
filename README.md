<h1 align="center">🧠 Mochi AI</h1>

<p align="center">
An AI-powered website builder that transforms natural language prompts into full-stack web applications using autonomous AI agents, secure cloud sandboxes, and modern full-stack technologies.
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwind-css)
![tRPC](https://img.shields.io/badge/tRPC-TypeSafe-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Inngest](https://img.shields.io/badge/Inngest-AI%20Agents-7C3AED)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1-10A37F?logo=openai)
![Anthropic](https://img.shields.io/badge/Anthropic-Claude-black)
![Docker](https://img.shields.io/badge/Docker-Sandbox-2496ED?logo=docker)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

# 🚀 Live Demo

🌐 **Website:** https://https://mochi-ai-website-builder.vercel.app

📂 **Repository:** https://github.com/TanviNiturkar/mochi-ai

---

# 🎥 Feature Demo

A quick walkthrough of generating a complete web application from a single prompt.

![Mochi Demo](https://raw.githubusercontent.com/TanviNiturkar/assets/main/mochi-demo.gif)

---

# 📸 Screenshots


![Main Page](https://raw.githubusercontent.com/TanviNiturkar/assets/main/main.png)
![login Page](https://raw.githubusercontent.com/TanviNiturkar/assets/main/login1.png)
![project Page](https://raw.githubusercontent.com/TanviNiturkar/assets/main/project.png)
![code Page](https://raw.githubusercontent.com/TanviNiturkar/assets/main/code.png)
![live Page](https://raw.githubusercontent.com/TanviNiturkar/assets/main/live.png)

---

# 📚 Table of Contents

- Why I Built Mochi
- Features
- Tech Stack
- Architecture
- Engineering Highlights
- Project Highlights
- Getting Started
- Project Structure
- Future Improvements
- License

---

# 💡 Why I Built Mochi

Modern AI coding platforms like Lovable, Bolt, and v0 inspired me to understand how AI-powered software engineering works behind the scenes.

Instead of simply calling an LLM, I wanted to build the complete pipeline—from autonomous coding agents and secure cloud sandboxes to background job orchestration, authentication, billing, and live previews.

Mochi was built to explore those engineering challenges while creating a production-ready AI SaaS application.

---

# ✨ Features

### 🤖 AI-Powered App Generation

- Generate complete full-stack applications from natural language prompts
- Multi-agent architecture powered by GPT-4.1
- Supports OpenAI, Anthropic Claude, and Grok

---

### 🧠 Autonomous Coding Agents

- AI can read files
- Write files
- Execute terminal commands
- Iterate until the project is complete

---

### 🖥️ Secure Sandbox Execution

- Every project runs inside isolated E2B cloud sandboxes
- Docker template for fast startup
- AI never executes code on the production server

---

### ⚡ Live Preview

- Instantly preview generated applications
- Share preview URLs
- Automatic project updates

---

### 📂 Code Explorer

- Browse generated source code
- View project files
- Inspect AI-generated output

---

### 🔁 Background Processing

- Powered by Inngest
- Long-running AI tasks
- Reliable retries
- Durable execution

---

### 🔐 Authentication & Billing

- Clerk Authentication
- Clerk Billing
- Credit-based usage system
- Monthly credit tracking

---

### 📡 Modern Full-Stack Architecture

- Next.js 15
- React 19
- tRPC
- Prisma ORM
- Neon PostgreSQL

---

# 🛠 Tech Stack

## 🎨 Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Query

---

## ⚙️ Backend

- tRPC
- Prisma ORM
- Neon PostgreSQL
- Clerk Authentication
- Clerk Billing

---

## 🤖 AI Infrastructure

- OpenAI GPT-4.1
- Anthropic Claude
- Grok
- Inngest Agents
- E2B Sandboxes
- Docker

---

# 🏗 Architecture

```text
                    User
                      │
                      ▼
            Next.js Frontend
                      │
                      ▼
                tRPC API Layer
                      │
                      ▼
          AI Coding Agent (GPT-4.1)
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
      Read Files  Write Files  Run Commands
                      │
                      ▼
         E2B Docker Cloud Sandbox
                      │
                      ▼
           Generated Full-Stack App
                      │
        ┌─────────────┼────────────┐
        ▼             ▼            ▼
   Live Preview   Code Explorer   Database
```

---

# ⚙️ Engineering Highlights

## 🤖 Multi-Agent Architecture

A primary AI coding agent generates the application while additional AI agents create project titles and user-friendly summaries.

---

## 🔒 Secure Execution

All AI-generated code executes inside isolated E2B cloud sandboxes backed by Docker templates.

---

## 🔁 Durable Background Jobs

Application generation is handled through Inngest background workflows, allowing users to continue using the application while generation runs asynchronously.

---

## 📂 Live Preview & Code Explorer

Generated applications include a live preview alongside a code explorer, making it easy to inspect both the UI and the underlying source code.

---

## 💳 Credit-Based Billing

A built-in credit system tracks AI usage and integrates with Clerk Billing for subscription management.

---

# 📈 Project Highlights

✅ Autonomous AI Coding Agent

✅ Secure Cloud Sandboxes

✅ AI Tool Calling

✅ Background Workflow Execution

✅ Live Project Preview

✅ Built-in Code Explorer

✅ Credit System

✅ Clerk Authentication

✅ Subscription Billing

✅ End-to-End Type Safety

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/TanviNiturkar/Mochi_AI_Website_Builder.git

cd mochi-ai
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=

CLERK_SECRET_KEY=

OPENAI_API_KEY=

ANTHROPIC_API_KEY=

XAI_API_KEY=

E2B_API_KEY=

INNGEST_EVENT_KEY=

INNGEST_SIGNING_KEY=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start the application

```bash
npm run dev
```

---

# 📁 Project Structure

```text
src/
├── app/
├── agents/
├── components/
├── sandbox/
├── inngest/
├── lib/
├── trpc/
├── db/
└── prisma/
```

---

# 🔮 Future Improvements

- Real-time streaming with WebSockets
- More AI providers
- Team collaboration
- Project version history
- AI plugin system
- Automated testing
- Kubernetes deployment
- Analytics Dashboard

---

# 📄 License

This project was built for learning, portfolio, and demonstration purposes.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

Built and designed with ❤️ by **Tanvi Niturkar**

</div>
