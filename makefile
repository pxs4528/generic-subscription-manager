# Makefile for SubHub project

# Frontend commands
frontend:
    cd frontend && npm install

dev-frontend:
    cd frontend && npm run dev

# Backend commands
backend:
    cd backend && go mod tidy

run-backend:
    cd backend/cmd/main && go run .

# Combined command to run both frontend and backend
run: frontend backend run-backend

