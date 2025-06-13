import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import ImageView from "@/pages/ImageView";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<ImageView />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;