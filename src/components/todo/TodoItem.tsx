import { useState } from 'react';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Check, Trash2 } from 'lucide-react';
import { UrgencyBadge } from './UrgencyBadge';
import { LabelBadge } from './LabelBadge';
import { CategoryIcon } from './CategoryIcon';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 200);
  };

  return (
    <div
      className={cn(
        'group bg-card rounded-xl p-4 shadow-task hover:shadow-task-hover transition-task animate-slide-in',
        isDeleting && 'animate-fade-out'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={cn(
            'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
            todo.completed
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/30 hover:border-primary'
          )}
        >
          {todo.completed && (
            <Check className="w-3 h-3 text-primary-foreground animate-check" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <CategoryIcon category={todo.category} size="sm" />
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'font-medium text-foreground transition-task',
                  todo.completed && 'line-through text-muted-foreground'
                )}
              >
                {todo.title}
              </p>
              
              {/* Labels & Urgency */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <UrgencyBadge urgency={todo.urgency} />
                {todo.labels.map(label => (
                  <LabelBadge key={label.id} label={label} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
