# Task Manager

A clean, fully functional task management app built with **Next.js 14** and **React**, featuring a Neumorphic UI design. Users can add, complete, filter, and delete tasks — with all data persisted to `localStorage` so nothing is lost on page refresh.

---

## Features

- Add new tasks with a controlled input form
- Mark tasks complete with a checkbox toggle
- Delete individual tasks or clear all completed tasks at once
- Filter tasks by **All**, **Active**, or **Done**
- Live progress bar showing completion percentage
- Data persists across page refreshes via `localStorage`
- Neumorphic design system with smooth shadow transitions

---

## Technologies Used

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/) (Hooks: `useState`, `useEffect`)
- [Tailwind CSS v4](https://tailwindcss.com/) (utility-first styling)
- JavaScript (ES6+)
- `localStorage` for client-side persistence
- `crypto.randomUUID()` for unique task IDs

---

## Project Structure

```
src/
├── app/
│   ├── page.js          # Root route — renders TaskBoard
│   ├── layout.js        # Global layout, fonts, metadata
│   └── globals.css      # Tailwind import
└── components/
    ├── TaskBoard.js     # Central state owner — all logic lives here
    ├── TaskStats.js     # Live task counts + progress bar
    ├── AddTaskForm.js   # Controlled input form for new tasks
    ├── TaskList.js      # Maps filtered tasks to TaskCard components
    └── TaskCard.js      # Individual task row (checkbox + delete)
```

---

## How to Run

**Prerequisites:** Node.js 18+ and npm installed.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/task-manager.git

# 2. Navigate into the project folder
cd task-manager

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Key Concepts Demonstrated

- **Lifting state up** — `TaskBoard` is the single source of truth; all child components receive data via props and communicate back via callbacks
- **Controlled components** — all inputs are driven by React state, not the DOM
- **Derived values over state** — `visibleTasks`, `completed`, and `active` are computed fresh each render rather than stored as separate state, preventing sync bugs
- **Server vs. Client Components** — `page.js` and `layout.js` are Server Components; interactive components declare `'use client'` at the boundary
- **Hydration safety** — `hasMounted` guard prevents `localStorage` from being accessed during SSR, avoiding hydration mismatch errors

---

## What I Learned

Building this project deepened my understanding of React's unidirectional data flow. Managing state in one place (`TaskBoard`) while passing callbacks down to stateless child components made the app easier to debug and reason about. I also learned how Next.js App Router separates server and client rendering boundaries, and why that distinction matters for performance and hydration.

---

## Author

David Albornoz — [University of South Florida, Muma College of Business](https://www.usf.edu/business/)  
Business Analytics & Information Systems | Cybersecurity Concentration
