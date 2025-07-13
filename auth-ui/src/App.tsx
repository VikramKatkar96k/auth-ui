import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SetuForm from "./forms/SetuForm.tsx";
import CasteDeclarationTSX from "./forms/CasteDeclaration";
import ResidencyDeclarationGovFormat from "./forms/ResidencyDeclarationGovFormat";
import NotFound from "./pages/NotFound";
import api from "@/lib/axios"; // 👈 import your Axios instance

const queryClient = new QueryClient();

const App = () => {
  // ⏱ Auto refresh token every 5 mins
  useEffect(() => {
    const interval = setInterval(() => {
      api.get("/api/auth/refresh").catch(() => {
        // handled by axios interceptor on 401
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/forms/setu" element={<SetuForm />} />
            <Route path="/forms/CasteDeclaration" element={<CasteDeclarationTSX />} />
            <Route path="/forms/ResidencyDeclarationGovFormat" element={<ResidencyDeclarationGovFormat />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
