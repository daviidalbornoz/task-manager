// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: Renders a controlled input field and submit
//          button so the user can type and add a new task.
//          This component does NOT own the task list —
//          it only captures the user's input locally and
//          signals upward via the onAdd callback when the
//          user submits. TaskBoard receives that signal
//          and appends the new task to its state.
// TYPE: Client Component ('use client') — needs useState
//       to track the input value and onSubmit to handle
//       form submission in the browser.
// PROPS:
//   onAdd — callback owned by TaskBoard; called with the
//           trimmed title string when the user submits.
//           Data flows UP because TaskBoard owns tasks state.
// ══════════════════════════════════════════════════════

'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {

  // ── STATE: title ────────────────────────────────────
  // title is local to this component — no other component
  // needs to know what the user is currently typing.
  // Lifting this up to TaskBoard would be unnecessary coupling.
  // It stays here until the user submits, at which point
  // only the final trimmed string travels up via onAdd.
  const [title, setTitle] = useState('');

  // ── HANDLER: handleSubmit ───────────────────────────
  function handleSubmit(e) {

    // e.preventDefault() stops the browser's default form
    // behavior, which would reload the entire page on submit.
    // A page reload would wipe React state and localStorage
    // would be the only recovery — we prevent that here.
    e.preventDefault();

    // Validation: .trim() removes leading and trailing
    // whitespace. If the result is an empty string, we return
    // early and do nothing — blank tasks are not allowed.
    if (!title.trim()) return;

    // Fire the callback with the cleaned title. onAdd is
    // owned by TaskBoard, which will spread the new task
    // into the tasks array with a new UUID and done: false.
    onAdd(title.trim());

    // Reset local state so the input clears immediately
    // after submission, ready for the next task entry.
    setTitle('');
  }

  return (
    // onSubmit on the <form> handles both button clicks AND
    // keyboard Enter presses. Using onClick on the button
    // alone would miss keyboard submission — a11y matters.
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">

      {/* Controlled input: 'value' is always driven by the
          title state variable — React owns the field, not
          the DOM. onChange fires on every keystroke to keep
          state and the displayed value perfectly in sync.
          The inset shadow gives the field a "sunken" look
          in the Neumorphic design — it feels like a recess
          you type into, reinforcing the tactile metaphor. */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] rounded-2xl p-4 outline-none text-gray-600 placeholder-gray-400"
      />

      {/* Submit button: type="submit" ties this button to
          the form's onSubmit handler above. active: shadow
          swaps to an inset on click — the button physically
          "sinks" when pressed, matching the Neumorphic
          language used across the whole app. */}
      <button
        type="submit"
        className="bg-[#e0e5ec] text-blue-600 font-bold px-6 py-4 rounded-2xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-200"
      >
        Add Task
      </button>
    </form>
  );
}