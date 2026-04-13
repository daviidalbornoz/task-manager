# Task Manager 2.0

A Neumorphic task manager built with Next.js 16, React 19, and Tailwind CSS v4.
Built for ISM 3232 – Business Data Applications, Module 10 (USF Muma College of Business).

---

## Features

- Add tasks via a controlled form with blank-input validation
- Toggle tasks complete/incomplete with visual Neumorphic feedback
- Delete individual tasks
- Filter view — All / Active / Done via a sidebar panel
- Live stats bar with total, active, and completed counts + progress bar
- Clear all completed tasks in one click
- Persists across browser refreshes via localStorage

---

## Design Direction — Neumorphism (Soft UI)

The app uses a single base color (`#e0e5ec`) throughout. Depth is created entirely
through shadow pairs:

- **Raised elements** (active task cards, buttons, stats panel) use outward double shadows:
  `shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]`
- **Sunken elements** (completed tasks, the text input, active filter button) use inset shadows:
  `shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]`

Key layout departure from the workshop: filter buttons are moved into a **left sidebar panel**
rather than a horizontal row above the task list. This creates a two-column layout using
Tailwind `flex` with a fixed-width `aside` and a `flex-1` main content area.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind import only
│   ├── layout.js          # Root layout — fonts, metadata, bg color
│   └── page.js            # Server Component — renders TaskBoard
└── components/
    ├── TaskBoard.js        # Client Component — owns all state
    ├── TaskList.js         # Renders filtered task array via .map()
    ├── TaskCard.js         # Single task row — toggle + delete
    ├── AddTaskForm.js      # Controlled form — lifts new title up
    └── TaskStats.js        # Live counts, progress bar, clear button
```
---

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm

### Steps

1. Clone the repository:
```bash
   git clone https://github.com/YOUR_USERNAME/task-manager.git
   cd task-manager
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## AI Usage Log

- **TaskBoard.js layout restructure** — Asked Claude to convert the horizontal filter
  buttons into a two-column sidebar layout using Tailwind flex. It produced the `aside` +
  `flex-1` panel structure. I reviewed each className and confirmed the shadow values matched
  my existing Neumorphic system before keeping it.

- **Code commenting pass** — Asked Claude to add header blocks and "why" comments to each
  component file following the rubric requirements. I read every comment line by line, rewrote
  any that did not match how I understood the code, and removed any that restated the obvious.

- **TaskStats.js restyling** — Asked Claude to update the stats panel from a flat `bg-slate-50`
  card to match the Neumorphic shadow system used in the rest of the app. I verified the inset
  shadow on the progress bar track matched the input field style in AddTaskForm.js.

---

## Academic Integrity

AI assistance was used as permitted under the ISM 3232 AI policy. All submitted code
was reviewed, understood, and where necessary modified by the student. This project
was built independently and not copied from another student or commercial template.