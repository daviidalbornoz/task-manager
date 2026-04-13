// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Renders the filtered list of tasks by mapping
//          each task object to a TaskCard component.
//          This component owns NO state and does NO filtering
//          itself — it receives an already-filtered array
//          from TaskBoard and simply renders what it gets.
// TYPE: Server Component — no hooks, no browser events.
//       TaskCard handles its own 'use client' boundary.
// PROPS:
//   tasks    — filtered array of task objects from TaskBoard;
//              already scoped to all/active/done by TaskBoard
//   onToggle — callback passed through to each TaskCard;
//              owned by TaskBoard, which flips done via .map()
//   onDelete — callback passed through to each TaskCard;
//              owned by TaskBoard, which removes via .filter()
// ══════════════════════════════════════════════════════

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {

  // ── CONDITIONAL RENDER: empty state ────────────────
  // If tasks is an empty array (either no tasks exist, or
  // the active filter matches nothing), we return early with
  // a friendly message instead of rendering an empty list.
  // This fires when tasks.length === 0, which happens when:
  //   - the user has no tasks yet
  //   - the user filters to 'done' but nothing is completed
  //   - the user filters to 'active' but everything is done
  if (tasks.length === 0) {
    return (
      <p className="p-4 text-center text-gray-400 italic">
        All caught up!
      </p>
    );
  }

  return (
    <div className="divide-y border-t">

      {/* .map() transforms the tasks array into an array of
          JSX elements — one TaskCard per task object.
          We use .map() and not a for-loop because JSX expects
          an expression, not a statement, inside curly braces.

          key={task.id} is required so React can track which
          card is which across re-renders. Without a stable key,
          React may re-render the wrong card when the list
          changes (e.g. after a delete), causing visual bugs.

          {...task} spreads all task properties (id, title, done)
          as individual props onto TaskCard so we do not have
          to list each one manually. onToggle and onDelete are
          passed through unchanged — TaskList does not own them
          and does not modify them, it just forwards them down. */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          {...task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}