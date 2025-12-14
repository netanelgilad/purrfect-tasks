import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import CategoryPage from "./pages/CategoryPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { home, dashboard, settings, category, taskPage, other } = {
    home: '/',
    dashboard: '/dashboard',
    settings: '/settings',
    category: '/category/:name2',
    taskPage: '/task/:id',
    other: '*'
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={home} element={<Index />} />
              <Route path={dashboard} element={<Dashboard />} />
              <Route path={settings} element={<Settings />} />
              <Route path={category} element={<CategoryPage />} />
              <Route path={taskPage} element={<TaskDetailPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path={other} element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
