import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '@/hooks/useTodos';
import { CATEGORIES, URGENCY_LEVELS, Category, Urgency, Label } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryIcon } from '@/components/todo/CategoryIcon';
import { UrgencyBadge } from '@/components/todo/UrgencyBadge';
import { LabelBadge } from '@/components/todo/LabelBadge';
import { ArrowLeft, Save, Trash2, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { todos, availableLabels, updateTodo, deleteTodo } = useTodos();

  const todo = todos.find(t => t.id === id);

  const [title, setTitle] = useState(todo?.title || '');
  const [category, setCategory] = useState<Category>(todo?.category || 'personal');
  const [urgency, setUrgency] = useState<Urgency>(todo?.urgency || 'medium');
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(todo?.labels || []);
  const [dueDate, setDueDate] = useState<Date | undefined>(todo?.dueDate);

  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-muted-foreground">Task not found</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    if (!title.trim()) {
      toast({ title: 'Title required', variant: 'destructive' });
      return;
    }
    updateTodo(todo.id, { title, category, urgency, labels: selectedLabels, dueDate });
    toast({ title: 'Task updated successfully' });
    navigate('/');
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    toast({ title: 'Task deleted' });
    navigate('/');
  };

  const toggleLabel = (label: Label) => {
    setSelectedLabels(prev =>
      prev.some(l => l.id === label.id)
        ? prev.filter(l => l.id !== label.id)
        : [...prev, label]
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Task</h1>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-task space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="text-lg"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Category</label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  <div className="flex items-center gap-2">
                    <CategoryIcon category={cat.value} size="sm" />
                    <span>{cat.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Urgency</label>
          <Select value={urgency} onValueChange={(v) => setUrgency(v as Urgency)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {URGENCY_LEVELS.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  <UrgencyBadge urgency={level.value} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dueDate && 'text-muted-foreground'
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Labels */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Labels</label>
          <div className="flex flex-wrap gap-2">
            {availableLabels.map(label => (
              <button
                key={label.id}
                onClick={() => toggleLabel(label)}
                className={cn(
                  'transition-all',
                  selectedLabels.some(l => l.id === label.id)
                    ? 'ring-2 ring-primary ring-offset-2 rounded-full'
                    : 'opacity-50 hover:opacity-100'
                )}
              >
                <LabelBadge label={label} />
              </button>
            ))}
          </div>
        </div>

        {/* Meta info */}
        <div className="pt-4 border-t border-border text-sm text-muted-foreground">
          <p>Created: {format(todo.createdAt, 'PPP')}</p>
          <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
