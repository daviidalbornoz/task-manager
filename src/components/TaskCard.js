'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  return (
    <div 
      className={`flex items-center justify-between p-4 mb-4 rounded-2xl transition-all duration-300 ${
        done 
          ? "shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] bg-[#e0e5ec] opacity-70" 
          : "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] bg-[#e0e5ec]"
      }`}
    >
      <div className="flex items-center gap-4">
        <input 
          type="checkbox" 
          checked={done} 
          onChange={() => onToggle(id)} 
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />
        <span className={`font-medium ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {title}
        </span>
      </div>
      
      <button 
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-600 font-bold text-sm px-2"
      >
        ✕
      </button>
    </div>
  );
}