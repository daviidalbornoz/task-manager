'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-lg mb-6 border border-slate-200">
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <span>Total: <strong>{total}</strong></span>
          <span className="text-green-600">Done: <strong>{completed}</strong></span>
          <span className="text-orange-600">To Do: <strong>{active}</strong></span>
        </div>
        
        <button 
          onClick={onClearCompleted}
          className="text-xs text-red-600 hover:underline font-medium"
        >
          Clear Completed
        </button>
      </div>
      
      {/* Visual Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-600 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${total === 0 ? 0 : (completed / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}