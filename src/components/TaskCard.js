'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          checked={done} 
          onChange={() => onToggle(id)} 
          className="w-4 h-4"
        />
        <span className={done ? 'line-through text-gray-400' : 'text-gray-900'}>
          {title}
        </span>
      </div>
      
      <button 
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}