import { useParams, Link } from "react-router-dom";
import { useTodos } from "@/hooks/useTodos";
import { TodoList } from "@/components/todo/TodoList";
import { AddTodoForm } from "@/components/todo/AddTodoForm";
import { CATEGORIES, Category } from "@/types/todo";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const { todos, availableLabels, addTodo, toggleTodo, deleteTodo } = useTodos();

  const category = CATEGORIES.find(c => c.value === name);
  const filteredTodos = todos.filter(todo => todo.category === name);

  if (!category) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
          <p className="mt-2 text-muted-foreground">The category "{name}" doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/">Back to Tasks</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{category.label}</h1>
              <p className="text-sm text-muted-foreground">
                {filteredTodos.length} task{filteredTodos.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        <AddTodoForm
          onAdd={(title, cat, urgency, labels, dueDate) => addTodo(title, cat, urgency, labels, dueDate)}
          availableLabels={availableLabels}
          defaultCategory={name as Category}
        />

        <div className="mt-6">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
