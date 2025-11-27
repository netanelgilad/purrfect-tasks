import { Label, LabelColor } from '@/types/todo';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface LabelBadgeProps {
  label: Label;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

const colorConfig: Record<LabelColor, string> = {
  blue: 'bg-label-blue/15 text-label-blue',
  purple: 'bg-label-purple/15 text-label-purple',
  green: 'bg-label-green/15 text-label-green',
  pink: 'bg-label-pink/15 text-label-pink',
  orange: 'bg-label-orange/15 text-label-orange',
  cyan: 'bg-label-cyan/15 text-label-cyan',
};

export function LabelBadge({ label, onRemove, size = 'sm' }: LabelBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-md transition-task',
        colorConfig[label.color],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      )}
    >
      {label.name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
