import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-card rounded-xl p-12 shadow-task text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">Add a task to get started!</p>
      </div>
    );
  }

  // Sort: uncompleted first, then by due date, then by urgency
  const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    // Tasks with due dates come first, sorted by earliest deadline
    if (a.dueDate && b.dueDate) {
      const dateDiff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (dateDiff !== 0) return dateDiff;
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  return (
    <div className="space-y-3">
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
