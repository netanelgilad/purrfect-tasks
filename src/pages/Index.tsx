import { useState } from 'react';
import { Category } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';
import { AddTodoForm } from '@/components/todo/AddTodoForm';
import { TodoList } from '@/components/todo/TodoList';
import { CategoryFilter } from '@/components/todo/CategoryFilter';
import { StatsCard } from '@/components/todo/StatsCard';
import { CheckSquare } from 'lucide-react';

const Index = () => {
  const { todos, availableLabels, addTodo, toggleTodo, deleteTodo, getFilteredTodos, stats } = useTodos();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredTodos = getFilteredTodos(selectedCategory);

  // Calculate counts for each category
  const counts = {
    all: todos.length,
    work: todos.filter(t => t.category === 'work').length,
    personal: todos.filter(t => t.category === 'personal').length,
    shopping: todos.filter(t => t.category === 'shopping').length,
    health: todos.filter(t => t.category === 'health').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <CheckSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">TaskFlow</h1>
              <p className="text-muted-foreground">Organize your day, one task at a time</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr,280px] gap-8">
          {/* Main content */}
          <main className="space-y-6">
            {/* Category filter */}
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              counts={counts}
            />

            {/* Add todo form */}
            <AddTodoForm onAdd={addTodo} availableLabels={availableLabels} />

            {/* Todo list */}
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <StatsCard stats={stats} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Index;
