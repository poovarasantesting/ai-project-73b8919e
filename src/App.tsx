import { Toaster } from "sonner";
import { RegistrationForm } from "./components/RegistrationForm";

function App() {
  return (
    <main className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <RegistrationForm />
    </main>
  );
}

export default App;