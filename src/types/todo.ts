export type Urgency = 'low' | 'medium' | 'high' | 'critical';

export type Category = 'work' | 'personal' | 'shopping' | 'health';

export type LabelColor = 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'cyan';

export interface Label {
  id: string;
  name: string;
  color: LabelColor;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  urgency: Urgency;
  labels: Label[];
  dueDate?: Date;
  createdAt: Date;
}

export const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'personal', label: 'Personal', icon: '👤' },
  { value: 'shopping', label: 'Shopping', icon: '🛒' },
  { value: 'health', label: 'Health', icon: '💪' },
];

export const URGENCY_LEVELS: { value: Urgency; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

export const LABEL_COLORS: LabelColor[] = ['blue', 'purple', 'green', 'pink', 'orange', 'cyan'];

export const DEFAULT_LABELS: Label[] = [
  { id: '1', name: 'Important', color: 'pink' },
  { id: '2', name: 'Quick Win', color: 'green' },
  { id: '3', name: 'Follow Up', color: 'blue' },
  { id: '4', name: 'Ideas', color: 'purple' },
  { id: '5', name: 'Waiting', color: 'orange' },
  { id: '6', name: 'Review', color: 'cyan' },
];
