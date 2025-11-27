import { Urgency } from '@/types/todo';
import { cn } from '@/lib/utils';

interface UrgencyBadgeProps {
  urgency: Urgency;
  size?: 'sm' | 'md';
}

const urgencyConfig = {
  low: {
    bg: 'bg-urgency-low-bg',
    text: 'text-urgency-low',
    label: 'Low',
  },
  medium: {
    bg: 'bg-urgency-medium-bg',
    text: 'text-urgency-medium',
    label: 'Medium',
  },
  high: {
    bg: 'bg-urgency-high-bg',
    text: 'text-urgency-high',
    label: 'High',
  },
  critical: {
    bg: 'bg-urgency-critical-bg',
    text: 'text-urgency-critical',
    label: 'Critical',
  },
};

export function UrgencyBadge({ urgency, size = 'sm' }: UrgencyBadgeProps) {
  const config = urgencyConfig[urgency];

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-task',
        config.bg,
        config.text,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {config.label}
    </span>
  );
}
