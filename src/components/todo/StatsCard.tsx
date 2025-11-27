import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

interface StatsCardProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function StatsCard({ stats }: StatsCardProps) {
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-task">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Progress</h2>
        <span className="text-2xl font-bold text-primary">{completionRate}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${completionRate}%` }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
            <ListTodo className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>

        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-urgency-low-bg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-urgency-low" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
          <p className="text-xs text-muted-foreground">Done</p>
        </div>

        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-urgency-high-bg flex items-center justify-center">
            <Circle className="w-5 h-5 text-urgency-high" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>
    </div>
  );
}
