# Task Manager

A full-stack Task Manager app with Node.js + Express + MongoDB (backend) and React (frontend). Includes Docker setup and a GitHub Actions CI workflow.

Features

- User registration and login (JWT)
- Create/read/update/delete tasks
- Protected routes

Local setup

1. Clone repository
2. Backend:
   - cd backend
   - cp .env.example .env and edit
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm start

Docker

- Build and start everything with Docker Compose:

  docker-compose up --build

CI/CD

- GitHub Actions workflow at `.github/workflows/deploy.yml` installs dependencies and builds frontend and backend artifacts.

API

- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- GET /api/auth/me (Bearer token)
- GET /api/tasks (Bearer token)
- POST /api/tasks { title, description }
- GET|PUT|DELETE /api/tasks/:id
