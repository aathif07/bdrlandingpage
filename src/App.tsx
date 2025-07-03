// src/App.tsx

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Sarvice from "./pages/Sarvice"; // Fixed: Use default import
import NotFound from "./pages/NotFound";
import DataMitigation1 from "./pages/DataMigration";
import DataMigration1 from "./pages/DataMigration";
import Fintech1 from "./pages/Fintech";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// QueryClient setup
const queryClient = new QueryClient();

// Global type declaration for trackingFunctions
declare global {
  interface Window {
    trackingFunctions?: {
      onLoad: (config: { appId: string }) => void;
    };
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Sarvice/>} />
            <Route path="/DataMitigation" element={<DataMitigation1 />} />
            <Route path="/DataMigration" element={<DataMigration1 />} />
            <Route path="/fintech" element={<Fintech1 />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
