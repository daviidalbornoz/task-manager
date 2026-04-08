'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // Stop the page from refreshing
    if (!title.trim()) return; // Don't add empty tasks
    
    onAdd(title.trim());
    setTitle(''); // Clear the input field after adding
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?" 
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-green-600"
      />
      <button 
        type="submit" 
        className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}