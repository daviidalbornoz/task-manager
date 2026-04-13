// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE: Displays a live summary of task counts (total,
//          active, completed) and a visual progress bar.
//          Also renders the "Clear Completed" button.
//          This component owns NO state — every value it
//          displays is a derived prop calculated in TaskBoard
//          and passed down. It only signals upward when the
//          user clicks Clear Completed.
// TYPE: Client Component ('use client') — needs onClick
//       for the Clear Completed button.
// PROPS:
//   total            — total number of tasks in the list
//   completed        — count of tasks where done === true
//   active           — count of tasks where done === false
//   onClearCompleted — callback owned by TaskBoard; called
//                      with no arguments to remove all done
//                      tasks via .filter() in TaskBoard
// ══════════════════════════════════════════════════════

'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {

  // ── DERIVED VALUE: progressPercent ─────────────────
  // Calculates what percentage of tasks are complete for
  // the progress bar width. This is intentionally NOT stored
  // in state — it is always computable from total and completed,
  // both of which come from TaskBoard's tasks array.
  // The total === 0 guard prevents a division-by-zero result
  // (0/0 = NaN) which would break the inline style width.
  const progressPercent = total === 0 ? 0 : (completed / total) * 100;

  return (
    // Neumorphic card: outward shadow matches the TaskCard
    // "active" style so the stats panel feels like part of
    // the same surface system as the rest of the app.
    <div className="flex flex-col gap-4 p-4 bg-[#e0e5ec] rounded-2xl mb-2 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]">

      <div className="flex justify-between items-center text-sm">

        {/* These three spans display derived values passed
            down as props from TaskBoard. They update automatically
            on every render because TaskBoard re-renders whenever
            tasks changes, passing fresh counts each time.
            No useEffect or local state needed — props are live. */}
        <div className="flex gap-4">
          <span className="text-gray-500">
            Total: <strong className="text-gray-700">{total}</strong>
          </span>
          <span className="text-green-600">
            Done: <strong>{completed}</strong>
          </span>
          <span className="text-orange-500">
            To Do: <strong>{active}</strong>
          </span>
        </div>

        {/* Clear Completed button: fires onClearCompleted with
            no arguments. TaskBoard owns this callback and calls
            .filter(t => !t.done) to return a new array with all
            completed tasks excluded. TaskStats does not modify
            state directly — it only reports the user's intent
            upward, keeping data flow unidirectional. */}
        <button
          onClick={onClearCompleted}
          className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors duration-200"
        >
          Clear Completed
        </button>
      </div>

      {/* ── Progress Bar ───────────────────────────────
          The outer track is a fixed-height Neumorphic sunken
          groove (inset shadow). The inner fill grows from 0%
          to 100% using the progressPercent derived value above.
          transition-all duration-500 animates the width change
          smoothly whenever completed or total changes. */}
      <div className="w-full bg-[#e0e5ec] rounded-full h-3 shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

    </div>
  );
}