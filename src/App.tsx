import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import AIChatbot from "./pages/AIChatbot";
import Notifications from "./pages/Notifications";
import Applications from "./pages/Applications";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<AIChatbot />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
