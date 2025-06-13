import { LoginForm } from "./components/LoginForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <LoginForm />
      <Toaster />
    </main>
  );
}

export default App;