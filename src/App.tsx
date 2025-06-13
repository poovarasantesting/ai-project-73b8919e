import { BrowserRouter, Routes, Route } from "react-router-dom";
import WidgetCreator from "./pages/WidgetCreator";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<WidgetCreator />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;