<<<<<<< Updated upstream
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
import MethaneMitigation1 from "./pages/MethaneMitigation";
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
            <Route path="/MethaneMitigation" element={<MethaneMitigation1 />} />
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
=======
            // src/App.tsx
            import { Toaster } from "@/components/ui/toaster";
            import { Toaster as Sonner } from "@/components/ui/sonner";
            import { TooltipProvider } from "@/components/ui/tooltip";
            import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
            import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
            import { ThemeProvider } from "./context/ThemeContext";
            import Index from "./pages/Index";
          
            import DataMitigation1 from "./pages/DataMitigation";
            import MethaneMitigation1 from "./pages/MethaneMitigation";
            import Fintech1 from "./pages/Fintech";
            


       

            // Legal pages
            import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
            import TermsOfService from "./pages/TermsOfService";
          

            // Admin components
            import AdminRoute from "@/components/AdminRoute";
            import AdminDashboard from "@/admin/AdminDashboard";
            import AdminRoutes from "@/admin/routes/AdminRoutes";
            import BlogManagement from "@/admin/BlogManagement";
            import ArticleManagement from "@/admin/ArticleManagement";
            import BlogEditorPage from "@/admin/pages/BlogEditorPage";
            import ArticleEditorPage from "@/admin/pages/ArticleEditorPage";

            // Blog Category Admin Components
            import BlogCategories from "@/admin/pages/BlogCategories";
            import BlogCategoryForm from "@/admin/pages/BlogCategoryForm";

            // CMS Admin Components
            import ContactMessages from "@/admin/forms/ContactMessages";
            import FreeConsultationSubmissions from "@/admin/forms/FreeConsultationSubmissions";
            import CareerApplications from "@/admin/forms/CareerApplications";

            // Case Studies Admin Components
            import CaseStudiesList from "@/admin/pages/case-studies/CaseStudiesList";
            import CaseStudyForm from "@/admin/pages/case-studies/CaseStudyForm";

            import { useEffect } from "react";
            import WhitepaperDownloadsPage from "./admin/pages/WhitepaperDownloadsPage";
            import CallbackRequestsPage from "./admin/pages/CallbackRequestsPage.tsx";
            import CallbackRequests from "./admin/forms/CallbackRequests.tsx";
            import NewsletterSubscriptions from "./admin/forms/NewsletterSubscriptions.tsx";

            // Scroll to top component
            function ScrollToTop() {
              const { pathname } = useLocation();
              useEffect(() => {
                window.scrollTo(0, 0);
              }, [pathname]);
              return null;
            }

            const queryClient = new QueryClient();

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
                        <Route path="/" element={<Index />} />
                       
                        <Route path="/DataMitigation" element={<DataMitigation1/>} />
                        <Route path="/methanemitigation" element={<MethaneMitigation1 />} />
                        <Route path="/fintech" element={<Fintech1 />} />

                      

                       

                        {/* Services subsections */}
           

                 

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
                          <Route index element={<div className="p-4 sm:p-6"><div className="text-xl sm:text-2xl font-bold mb-4">Admin Dashboard</div><p className="text-gray-600 dark:text-gray-400">Welcome to the admin dashboard. Use the sidebar to navigate to different sections.</p></div>} />
                          <Route path="dashboard" element={<div className="p-4 sm:p-6"><div className="text-xl sm:text-2xl font-bold mb-4">Admin Dashboard</div><p className="text-gray-600 dark:text-gray-400">Welcome to the admin dashboard. Use the sidebar to navigate to different sections.</p></div>} />
              
                          {/* Blog routes */}
                          <Route path="blogs" element={<BlogManagement />} />
                          <Route path="blogs/new" element={<BlogEditorPage />} />
                          <Route path="blogs/:id" element={<BlogEditorPage />} />
              
                          {/* Article routes */}
                          <Route path="articles" element={<ArticleManagement />} />
                          <Route path="articles/new" element={<ArticleEditorPage />} />
                          <Route path="articles/:id" element={<ArticleEditorPage />} />

                          {/* Blog Categories routes */}
                          <Route path="blog-categories" element={<BlogCategories />} />
                          <Route path="blog-categories/new" element={<BlogCategoryForm />} />
                          <Route path="blog-categories/edit/:id" element={<BlogCategoryForm />} />

                          {/* Case Studies routes */}
                          <Route path="case-studies" element={<CaseStudiesList />} />
                          <Route path="case-studies/new" element={<CaseStudyForm />} />
                          <Route path="case-studies/edit/:id" element={<CaseStudyForm />} />

                          {/* Form Management Routes */}
                          <Route path="forms/contact-messages" element={<ContactMessages />} />
                          <Route path="forms/free-consultation" element={<FreeConsultationSubmissions />} />
                          <Route path="forms/career-applications" element={<CareerApplications />} />
                          <Route path="forms/callback-requests" element={<CallbackRequests />} />
                          <Route path="forms/newsletter-subscriptions" element={<NewsletterSubscriptions />} />
              
                          {/* Analytics Routes */}
                          <Route path="analytics/whitepaper-downloads" element={<WhitepaperDownloadsPage />} />
                          <Route path="analytics/callback-requests" element={<CallbackRequestsPage />} />
                        </Route>
            
                        {/* Fallback */}
                      
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </ThemeProvider>
              </QueryClientProvider>
            );

            export default App;
>>>>>>> Stashed changes
