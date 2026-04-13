// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Renders a single task row. Displays the task
//          title, a checkbox to toggle completion, and a
//          delete button. This component owns NO state —
//          it receives everything it needs via props and
//          fires events back up to TaskBoard via callbacks.
// TYPE: Client Component ('use client') — needs onChange
//       and onClick event handlers, which require the browser.
// PROPS:
//   id       — unique identifier (crypto.randomUUID) used
//              to tell TaskBoard WHICH task was acted on
//   title    — the task text typed by the user
//   done     — boolean; true means the task is complete
//   onToggle — callback fired with id when checkbox changes;
//              owned by TaskBoard, which flips done via .map()
//   onDelete — callback fired with id when ✕ is clicked;
//              owned by TaskBoard, which removes via .filter()
// ══════════════════════════════════════════════════════

'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {

  // ── CONDITIONAL RENDER: Neumorphic state styles ────
  // The card's shadow switches based on done. Active tasks
  // use an outward ("popping") shadow to feel tangible and
  // pressable. Completed tasks use an inset ("sunken") shadow
  // and reduced opacity to visually recede — signaling they
  // are finished and out of focus. Both are the same base
  // color (#e0e5ec) so the shadow is the only design signal.
  const cardStyle = done
    ? 'shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] bg-[#e0e5ec] opacity-70'
    : 'shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] bg-[#e0e5ec]';

  // ── CONDITIONAL RENDER: title text style ──────────
  // The title mirrors the card state. line-through + muted
  // gray reinforces that the task is done without relying
  // on the shadow alone — two visual cues are clearer than one.
  const titleStyle = done ? 'line-through text-gray-400' : 'text-gray-700';

  return (
    // transition-all duration-300 animates the shadow swap
    // smoothly when done flips, making the "press" feel tactile.
    <div className={`flex items-center justify-between p-4 mb-4 rounded-2xl transition-all duration-300 ${cardStyle}`}>

      <div className="flex items-center gap-4">

        {/* Controlled checkbox: 'checked' is always driven by
            the done prop — React owns the value, not the DOM.
            onChange fires onToggle(id) so TaskBoard can locate
            this exact task by id and flip its done boolean.
            We pass id here because TaskCard does not call
            setTasks directly — only TaskBoard may do that. */}
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />

        {/* titleStyle is a derived value computed above from
            the done prop. It is not stored in state because
            it has no independent lifecycle — it always equals
            whatever done currently is. */}
        <span className={`font-medium ${titleStyle}`}>
          {title}
        </span>
      </div>

      {/* Delete button: fires onDelete with this task's id.
          TaskBoard owns onDelete and uses .filter() to return
          a new array that excludes the matching task.
          The callback pattern keeps TaskCard stateless —
          it reports what happened, TaskBoard decides what
          to do with that information. */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-600 font-bold text-sm px-2 transition-colors duration-200"
      >
        ✕
      </button>
    </div>
  );
}