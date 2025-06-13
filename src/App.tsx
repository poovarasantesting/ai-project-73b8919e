import { Toaster } from "@/components/ui/toaster";
import { LoginForm } from "@/components/LoginForm";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <LoginForm />
      <Toaster />
    </div>
  );
}