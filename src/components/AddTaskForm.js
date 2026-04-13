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
        className="flex-1 bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] rounded-2xl p-4 outline-none text-gray-600 placeholder-gray-400"
      />
      <button 
        type="submit" 
        className="bg-[#e0e5ec] text-blue-600 font-bold px-6 py-4 rounded-2xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-200"
      >
        Add Task
      </button>
    </form>
  );
}