import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/layouts/app-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

// Placeholder pages
function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>This is the profile page.</p>
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p>Configure your app settings here.</p>
    </div>
  );
}