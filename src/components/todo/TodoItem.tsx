import { useState } from 'react';
import { format, isToday, isTomorrow, isPast, isThisWeek } from 'date-fns';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Check, Trash2, CalendarIcon } from 'lucide-react';
import { UrgencyBadge } from './UrgencyBadge';
import { LabelBadge } from './LabelBadge';
import { CategoryIcon } from './CategoryIcon';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDueDate(date: Date): { text: string; isOverdue: boolean; isUrgent: boolean } {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const isOverdue = isPast(date) && !isToday(date);
  const isUrgent = isToday(date) || isTomorrow(date);
  
  if (isToday(date)) {
    return { text: 'Today', isOverdue: false, isUrgent: true };
  }
  if (isTomorrow(date)) {
    return { text: 'Tomorrow', isOverdue: false, isUrgent: true };
  }
  if (isOverdue) {
    return { text: format(date, 'MMM d'), isOverdue: true, isUrgent: false };
  }
  if (isThisWeek(date)) {
    return { text: format(date, 'EEEE'), isOverdue: false, isUrgent: false };
  }
  return { text: format(date, 'MMM d'), isOverdue: false, isUrgent: false };
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 200);
  };

  const dueDateInfo = todo.dueDate ? formatDueDate(todo.dueDate) : null;

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
              
              {/* Labels, Urgency & Due Date */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <UrgencyBadge urgency={todo.urgency} />
                {dueDateInfo && !todo.completed && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                      dueDateInfo.isOverdue && 'bg-destructive/10 text-destructive',
                      dueDateInfo.isUrgent && !dueDateInfo.isOverdue && 'bg-amber-500/10 text-amber-600',
                      !dueDateInfo.isOverdue && !dueDateInfo.isUrgent && 'bg-muted text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    {dueDateInfo.text}
                  </span>
                )}
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
