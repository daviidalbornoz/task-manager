import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <p className="p-4 text-center text-gray-400">All caught up!</p>;

  return (
    <div className="divide-y border-t">
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