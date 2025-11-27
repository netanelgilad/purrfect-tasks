import { useState, useCallback } from 'react';
import { Todo, Category, Urgency, Label, DEFAULT_LABELS } from '@/types/todo';

const generateId = () => Math.random().toString(36).substring(2, 9);

const INITIAL_TODOS: Todo[] = [
  {
    id: generateId(),
    title: 'Review quarterly reports',
    completed: false,
    category: 'work',
    urgency: 'high',
    labels: [DEFAULT_LABELS[0], DEFAULT_LABELS[5]],
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Buy groceries for the week',
    completed: false,
    category: 'shopping',
    urgency: 'medium',
    labels: [DEFAULT_LABELS[1]],
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Morning yoga routine',
    completed: true,
    category: 'health',
    urgency: 'low',
    labels: [],
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Call mom for birthday',
    completed: false,
    category: 'personal',
    urgency: 'critical',
    labels: [DEFAULT_LABELS[0]],
    createdAt: new Date(),
  },
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [availableLabels] = useState<Label[]>(DEFAULT_LABELS);

  const addTodo = useCallback((
    title: string,
    category: Category,
    urgency: Urgency,
    labels: Label[]
  ) => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      completed: false,
      category,
      urgency,
      labels,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const getFilteredTodos = useCallback((category: Category | 'all') => {
    if (category === 'all') return todos;
    return todos.filter(todo => todo.category === category);
  }, [todos]);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };

  return {
    todos,
    availableLabels,
    addTodo,
    toggleTodo,
    deleteTodo,
    getFilteredTodos,
    stats,
  };
}
