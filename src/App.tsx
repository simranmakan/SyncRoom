import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Pages
import Index from "./pages/index";
import Properties from "./pages/Property";
import LifestyleMatch from "./pages/Lifestyle"; // Trusted Match
import NotFound from "./pages/NotFound";

// ✅ Card pages
import SmartSplit from "./pages/SmartSplit";
import BrowsePG from "./pages/Property"; // or your actual BrowsePG component

// ✅ Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Initialize QueryClient for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toaster notifications */}
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Property listing pages */}
          <Route path="/properties" element={<Properties />} />
          <Route path="/browse-pg" element={<Properties />} />

          {/* Card pages */}
          <Route path="/smart-split" element={<SmartSplit />} /> {/* SmartSplit card */}
          <Route path="/trusted-match" element={<LifestyleMatch />} /> {/* Find Roommate card */}

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
