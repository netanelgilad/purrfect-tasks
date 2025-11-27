import { Category, CATEGORIES } from '@/types/todo';
import { cn } from '@/lib/utils';
import { LayoutGrid } from 'lucide-react';

interface CategoryFilterProps {
  selected: Category | 'all';
  onSelect: (category: Category | 'all') => void;
  counts: Record<Category | 'all', number>;
}

export function CategoryFilter({ selected, onSelect, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('all')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-task',
          selected === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card hover:bg-accent text-foreground shadow-task'
        )}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>All</span>
        <span className={cn(
          'px-2 py-0.5 rounded-full text-xs',
          selected === 'all' ? 'bg-primary-foreground/20' : 'bg-muted'
        )}>
          {counts.all}
        </span>
      </button>

      {CATEGORIES.map(cat => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-task',
            selected === cat.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-card hover:bg-accent text-foreground shadow-task'
          )}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs',
            selected === cat.value ? 'bg-primary-foreground/20' : 'bg-muted'
          )}>
            {counts[cat.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
