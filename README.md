SmartTaskPro – Frontend

A task & team management web application inspired by tools like Trello and Asana.
This is the frontend client built with React + TypeScript and modern tooling for performance, developer experience, and scalability.

🚀 Tech Stack

Build Tool: Vite
 + React + TypeScript

Routing: React Router

Server State: TanStack Query (React Query)

Client/App State: Context API + Zustand
 (or Redux Toolkit option)

Forms & Validation: React Hook Form
 + Zod

HTTP Client: Axios
 (with interceptors for auth)

Styling: TailwindCSS

Testing: Vitest
 + React Testing Library

Linting & Formatting: ESLint
 + Prettier

(Optional: Husky
 + lint-staged
 for git hooks)

📂 Project Structure
src/
├── components/       # Reusable UI components
├── context/          # Auth + App context providers
├── features/         # Feature-based folders (auth, projects, tasks)
├── pages/            # Page-level components for routes
├── store/            # Zustand store(s)
├── styles/           # Tailwind CSS & global styles
├── AppRouter.tsx     # Routing setup
├── main.tsx          # Entry point
└── api/              # Axios API functions

⚡️ Getting Started
1. Clone the repo
git clone https://github.com/yourusername/smarttaskpro-frontend.git
cd smarttaskpro-frontend

2. Install dependencies
npm install

3. Run development server
npm run dev


Open http://localhost:5173
 (default Vite port).

🛠 Available Scripts

npm run dev – Start dev server (Vite)

npm run build – Production build

npm run preview – Preview production build locally

npm run lint – Run ESLint

npm run test – Run unit/integration tests with Vitest

🔐 Authentication Flow

Auth Context + React Query manages login, registration, and logout.

Axios interceptors automatically attach JWT tokens to API requests.

Protected Routes via React Router ensure only logged-in users access projects/tasks.

🎨 Styling

TailwindCSS for utility-first styling.

Theme + sidebar state handled via Zustand (uiStore).

Components designed for responsiveness and clean UI.

✅ Testing

Vitest: test runner with Vite integration.

React Testing Library: unit & integration tests for components.

Example command:

npm run test

🔧 Linting & Formatting

ESLint + Prettier for code consistency.

(Optional) Husky + lint-staged to run lint/tests before commits.
