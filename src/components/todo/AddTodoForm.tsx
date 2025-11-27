import { useState } from 'react';
import { Category, Urgency, Label, CATEGORIES, URGENCY_LEVELS } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Plus, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LabelBadge } from './LabelBadge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface AddTodoFormProps {
  onAdd: (title: string, category: Category, urgency: Urgency, labels: Label[]) => void;
  availableLabels: Label[];
}

export function AddTodoForm({ onAdd, availableLabels }: AddTodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('work');
  const [urgency, setUrgency] = useState<Urgency>('medium');
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title.trim(), category, urgency, selectedLabels);
    setTitle('');
    setCategory('work');
    setUrgency('medium');
    setSelectedLabels([]);
    setIsOpen(false);
  };

  const toggleLabel = (label: Label) => {
    setSelectedLabels(prev =>
      prev.find(l => l.id === label.id)
        ? prev.filter(l => l.id !== label.id)
        : [...prev, label]
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-card hover:bg-accent rounded-xl p-4 shadow-task hover:shadow-task-hover transition-task flex items-center gap-3 text-muted-foreground hover:text-foreground"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary" />
        </div>
        <span className="font-medium">Add a new task...</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-xl p-4 shadow-task-hover animate-slide-in"
    >
      <div className="space-y-4">
        {/* Title input */}
        <Input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="border-0 text-lg font-medium placeholder:text-muted-foreground/50 focus-visible:ring-0 px-0"
        />

        {/* Options row */}
        <div className="flex flex-wrap gap-3">
          {/* Category */}
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Urgency */}
          <Select value={urgency} onValueChange={(v) => setUrgency(v as Urgency)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {URGENCY_LEVELS.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Labels */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="w-4 h-4" />
                Labels
                {selectedLabels.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {selectedLabels.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <div className="space-y-1">
                {availableLabels.map(label => (
                  <label
                    key={label.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer transition-task"
                  >
                    <Checkbox
                      checked={selectedLabels.some(l => l.id === label.id)}
                      onCheckedChange={() => toggleLabel(label)}
                    />
                    <LabelBadge label={label} />
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Selected labels */}
        {selectedLabels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map(label => (
              <LabelBadge
                key={label.id}
                label={label}
                onRemove={() => toggleLabel(label)}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={!title.trim()}>
            Add Task
          </Button>
        </div>
      </div>
    </form>
  );
}
