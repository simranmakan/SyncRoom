import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./index.css";

// ✅ Pages
import Index from "./pages/index";
import Properties from "./pages/Property";
import LifestyleMatch from "./pages/Lifestyle";
import NotFound from "./pages/NotFound";
import Roommates from "./pages/Roommates"; // 👈 Added Roommates page

// ✅ Card Pages
import SmartSplit from "./pages/SmartSplit";

// ✅ Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast Notifications */}
        <Toaster />
        <Sonner />

        <Router>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Index />} />

            {/* Property Listing Pages */}
            <Route path="/properties" element={<Properties />} />

            {/* Card Pages */}
            <Route path="/smart-split" element={<SmartSplit />} /> {/* Smart Split card */}
            <Route path="/lifestyle-match" element={<LifestyleMatch />} /> {/* Find Roommates card */}
            <Route path="/roommates" element={<Roommates />} /> {/* Roommates card */}

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
