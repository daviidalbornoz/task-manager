// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard
// PURPOSE: The "brain" of the entire app. This is the only
//          component that owns state. It passes data DOWN
//          to children as props, and receives user actions
//          UP from children via callback functions.
//          This pattern is called "lifting state up."
// TYPE: Client Component ('use client') — required because
//       useState and useEffect only run in the browser.
// PROPS: None — this is the top-level stateful component.
// ══════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import TaskStats from './TaskStats';

export default function TaskBoard() {

  // ── STATE: hasMounted ───────────────────────────────
  // Next.js renders components on the server before sending
  // HTML to the browser. localStorage does not exist on the
  // server, so we use hasMounted to delay rendering the full
  // UI until we are confirmed to be in the browser.
  // This prevents a "hydration mismatch" error where the
  // server-rendered HTML differs from what React expects.
  const [hasMounted, setHasMounted] = useState(false);

  // ── STATE: tasks ────────────────────────────────────
  // tasks is an array of objects: { id, title, done }.
  // It lives here in TaskBoard because multiple children
  // (TaskList, TaskStats, AddTaskForm) all need to read
  // or modify it — so the closest common ancestor owns it.
  //
  // The lazy initializer function runs ONCE on first render.
  // The typeof window guard prevents a crash during SSR:
  // on the server, window does not exist, so we return []
  // immediately rather than calling localStorage.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // ── STATE: filter ───────────────────────────────────
  // filter tracks which view the user selected: 'all',
  // 'active', or 'done'. It gets its own useState call
  // because it changes independently from tasks — a user
  // can change the filter without adding or removing tasks.
  const [filter, setFilter] = useState('all');

  // ── EFFECT: confirm browser mount ──────────────────
  // This effect runs once after the first render (empty
  // dependency array []). Setting hasMounted to true signals
  // that we are now safely in the browser and localStorage
  // is accessible. The UI is held back until this fires.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ── EFFECT: persist tasks to localStorage ──────────
  // This effect syncs React state to the browser's
  // localStorage every time the tasks array changes.
  // The dependency array [tasks] tells React: only re-run
  // this effect when tasks changes — skip all other renders.
  // Without this sync, tasks would be lost on page refresh.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── HANDLERS (callbacks passed down to children) ───

  // handleAdd: spreads existing tasks into a new array and
  // appends the new task. We CANNOT push() directly into
  // the existing array — React compares references, not
  // contents. Mutating the original array gives React the
  // same reference back, so it skips the re-render.
  const handleAdd = (title) => {
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
  };

  // handleToggle: .map() creates a new array. When we find
  // the matching task by id, we use spread { ...t } to copy
  // all its properties, then override only done with !t.done.
  // Every other task is returned unchanged.
  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // handleDelete: .filter() returns a new array containing
  // only tasks whose id does NOT match. The task with the
  // matching id is excluded, effectively removing it.
  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // handleClearDone: same logic as handleDelete but filters
  // out ALL tasks where done is true in a single pass.
  const handleClearDone = () => {
    setTasks(tasks.filter(t => !t.done));
  };

  // ── DERIVED VALUES (intentionally NOT in state) ────
  // completed, active, and visibleTasks are calculated
  // fresh on every render directly from tasks. Storing
  // them as separate state would create a duplication bug:
  // we'd have to update tasks AND the derived values in
  // sync on every change — a guaranteed source of bugs.
  const completed = tasks.filter(t => t.done).length;
  const active = tasks.length - completed;

  // visibleTasks filters the master list based on the
  // current filter value. This is a derived value, not
  // state — it changes automatically whenever tasks or
  // filter changes, with no extra setState needed.
  const visibleTasks = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true; // 'all' — no filtering applied
  });

  // ── CONDITIONAL RENDER: loading guard ──────────────
  // hasMounted is false during SSR and the first browser
  // paint. Returning early here prevents localStorage from
  // being called before the browser environment is ready,
  // which would cause a hydration mismatch crash.
  if (!hasMounted) return (
    <div className="max-w-lg mx-auto p-6 mt-10 text-[#6b7280]">
      Loading...
    </div>
  );

  // ── RENDER: Sidebar Layout ──────────────────────────
  // The outer wrapper uses flex to create a two-panel layout:
  // a narrow left sidebar (filter buttons) and a wider right
  // main panel (form, stats, task list). This is the key
  // layout departure from the workshop's top-button design.
  return (
    <div className="flex gap-6 max-w-3xl mx-auto mt-10 p-10 bg-[#e0e5ec] rounded-[50px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">

      {/* ── LEFT SIDEBAR: Filter Controls ── */}
      {/* flex-col stacks buttons vertically in the sidebar.
          w-32 gives the sidebar a fixed width so the main
          panel always has consistent space. */}
      <aside className="flex flex-col gap-3 w-32 pt-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-1">
          Filter
        </p>

        {/* Conditional render: the active filter button gets
            a "sunken" inset shadow to look pressed in the
            Neumorphic style. Inactive buttons "pop out." */}
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`capitalize py-2 px-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
              filter === f
                ? 'shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-green-700'
                : 'shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] text-[#6b7280] hover:text-green-700'
            }`}
          >
            {f}
          </button>
        ))}
      </aside>

      {/* ── RIGHT MAIN PANEL ── */}
      {/* flex-1 lets this panel grow to fill all remaining
          space beside the fixed-width sidebar. */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#374151]">Task Manager</h2>

        {/* TaskStats receives derived values as props.
            onClearCompleted is passed DOWN so TaskStats can
            trigger a state change in TaskBoard — the only
            component allowed to call setTasks. */}
        <TaskStats
          total={tasks.length}
          completed={completed}
          active={active}
          onClearCompleted={handleClearDone}
        />

        {/* AddTaskForm only needs to signal upward when the
            user submits. onAdd is the callback that carries
            the new title up to handleAdd here in TaskBoard. */}
        <AddTaskForm onAdd={handleAdd} />

        {/* TaskList receives the already-filtered visibleTasks
            array — it does not need to know about the filter
            itself. onToggle and onDelete flow back up to the
            handlers defined above. */}
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}