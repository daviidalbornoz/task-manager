'use client';
import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import TaskStats from './TaskStats'; // Import the new sibling

export default function TaskBoard() {
  const [hasMounted, setHasMounted] = useState(false);
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => { setHasMounted(true); }, []);
  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)); }, [tasks]);

  // Handlers
  const handleAdd = (title) => {
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
  };
  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  const handleClearDone = () => {
    setTasks(tasks.filter(t => !t.done));
  };

  // CALCULATING PROPS FOR SIBLINGS (Lifting State Logic)
  const completed = tasks.filter(t => t.done).length;
  const active = tasks.length - completed;
  const visibleTasks = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  if (!hasMounted) return <div className="max-w-lg mx-auto p-6 mt-10">Loading...</div>;

  return (
      <div className="max-w-lg mx-auto p-10 bg-[#e0e5ec] rounded-[50px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] mt-10">
      <h2 className="text-xl font-bold mb-4">Task Manager</h2>
      
      {/* Sibling 1: TaskStats */}
      <TaskStats 
        total={tasks.length} 
        completed={completed} 
        active={active} 
        onClearCompleted={handleClearDone} 
      />

      <AddTaskForm onAdd={handleAdd} />

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === f ? 'bg-green-700 text-white' : 'bg-slate-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sibling 2: TaskList */}
      <TaskList tasks={visibleTasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}