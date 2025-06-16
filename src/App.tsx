            // src/App.tsx
            import { Toaster } from "@/components/ui/toaster";
            import { Toaster as Sonner } from "@/components/ui/sonner";
            import { TooltipProvider } from "@/components/ui/tooltip";
            import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
            import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
            import { ThemeProvider } from "./context/ThemeContext";
            import Index from "./pages/Index";
            import About from "./pages/About";
            import Services from "./pages/Services";
            import Research from "./pages/Research";
            import Contact from "./pages/Contact";
            import Login from "./pages/Login";
            import ForgotPassword from "./pages/ForgotPassword";
            import Signup from "./pages/Signup";
            import NotFound from "./pages/NotFound";
            import DataMitigation1 from "./pages/DataMitigation";
            import MethaneMitigation1 from "./pages/MethaneMitigation";
            import Fintech1 from "./pages/Fintech";

            import Solutions from "./pages/Solutions";
            import Blog from "./pages/Blog";
            import BlogArticle from "./pages/BlogArticle";
            import BlogDetail from './pages/BlogDetail';

            import Careers from "./pages/Careers";
            import Overview from "./pages/Overview";
            import LeadGeneration from "./pages/LeadGeneration";
            import ContactUs from "./pages/ContactUs";

            // About subsections
            import Mission from "./pages/about/Mission";
            import Achievements from "./pages/about/Achievements";
            import Leadership from "./pages/about/Leadership";
            import News from "./pages/about/News";

            // Services subsections
            import DataMitigation from "./pages/services/DataMitigation.tsx";
            import MethaneMitigation from "./pages/services/MethaneMitigation";
            import Fintech from "./pages/services/Fintech";
            import CustomDev from "./pages/services/CustomDev";
            import GovernmentSolutions from "./pages/services/GovernmentSolutions";

            // Solutions subsections
            import AiMl from "./pages/solutions/AiMl";
            import Cybersecurity from "./pages/solutions/Cybersecurity";
            import Cloud from "./pages/solutions/Cloud";

            // Case Studies subsections
            import Problem from "./pages/case-studies/Problem";
            import Solution from "./pages/case-studies/Solution";
            import Results from "./pages/case-studies/Results";
            import Insights from "./pages/case-studies/Insights";

            // Blog subsections
            import Articles from "./pages/blog/Articles";
            import Categories from "./pages/blog/Categories";
            import CategoryBlogs from "./pages/blog/CategoryBlogs";
            import Newsletter from "./pages/blog/Newsletter";
            import SeoContent from "./pages/blog/SeoContent";
            import Tags from "./pages/blog/Tags";
            import ArticleDetail from "./pages/ArticleDetail";

            // Careers subsections
            import Jobs from "./pages/careers/Jobs";
            import Apply from "./pages/careers/Apply";
            import Culture from "./pages/careers/Culture";

            // Lead Generation subsections
            import WhitepaperDownloads from "./pages/lead-generation/WhitepaperDownloads";
            import FreeConsultation from "./pages/lead-generation/FreeConsultation";
            import AiChatbot from "./pages/lead-generation/AiChatbot";

            // Contact Us subsections
            import ContactForm from "./pages/contact-us/ContactForm";
            import GoogleMaps from "./pages/contact-us/GoogleMaps";
            import OfficeLocations from "./pages/contact-us/OfficeLocations";

            // Legal pages
            import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
            import TermsOfService from "./pages/TermsOfService";
            import CookiePolicy from "./pages/CookiePolicy";

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
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/research" element={<Research />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/solutions" element={<Solutions />} />
                        <Route path="/DataMitigation" element={<DataMitigation1/>} />
                        <Route path="/methanemitigation" element={<MethaneMitigation1 />} />
                        <Route path="/fintech" element={<Fintech1 />} />

                        {/* Blog routes */}
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
            
                        {/* Blog subsections */}
                        <Route path="/blog/articles" element={<Articles />} />
                        <Route path="/blog/articles/:slug" element={<ArticleDetail />} />
                        <Route path="/blog/categories" element={<Categories />} />
                        <Route path="/blog/category/:categorySlug" element={<CategoryBlogs />} />
                        <Route path="/blog/newsletter" element={<Newsletter />} />
                        <Route path="/blog/seo-content" element={<SeoContent />} />
                        <Route path="/blog/tags" element={<Tags />} />

                        {/* Careers */}
                        <Route path="/careers" element={<Careers />} />

                        {/* Other pages */}
                        <Route path="/overview" element={<Overview />} />
                        <Route path="/lead-generation" element={<LeadGeneration />} />
                        <Route path="/contact-us" element={<ContactUs />} />

                        {/* Legal pages */}
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/cookie-policy" element={<CookiePolicy />} />

                        {/* About subsections */}
                        <Route path="/about/mission" element={<Mission />} />
                        <Route path="/about/achievements" element={<Achievements />} />
                        <Route path="/about/leadership" element={<Leadership />} />
                        <Route path="/about/news" element={<News />} />

                        {/* Services subsections */}
                        <Route path="/services/data-migration" element={<DataMitigation />} />
                        <Route path="/services/methane-mitigation" element={<MethaneMitigation />} />
                        <Route path="/services/fintech" element={<Fintech />} />
                        <Route path="/services/custom-dev" element={<CustomDev />} />
                        <Route path="/services/government-solutions" element={<GovernmentSolutions />} />

                        {/* Solutions subsections */}
                        <Route path="/solutions/ai-ml" element={<AiMl />} />
                        <Route path="/solutions/cybersecurity" element={<Cybersecurity />} />
                        <Route path="/solutions/cloud" element={<Cloud />} />

                        {/* Case Studies subsections */}
                        <Route path="/case-studies" element={<Research />} />
                        <Route path="/case-studies/problem" element={<Research />} />
                        <Route path="/case-studies/solution" element={<Research />} />
                        <Route path="/case-studies/results" element={<Research />} />
                        <Route path="/case-studies/insights" element={<Research />} />

                        {/* Careers subsections */}
                        <Route path="/careers/jobs" element={<Jobs />} />
                        <Route path="/careers/apply" element={<Apply />} />
                        <Route path="/careers/culture" element={<Culture />} />

                        {/* Lead Generation subsections */}
                        <Route path="/lead-generation/whitepaper-downloads" element={<WhitepaperDownloads />} />
                        <Route path="/lead-generation/free-consultation" element={<FreeConsultation />} />
                        <Route path="/lead-generation/ai-chatbot" element={<AiChatbot />} />

                        {/* Contact Us subsections */}
                        <Route path="/contact-us/contact-form" element={<ContactForm />} />
                        <Route path="/contact-us/google-maps" element={<GoogleMaps />} />
                        <Route path="/contact-us/office-locations" element={<OfficeLocations />} />

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
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </ThemeProvider>
              </QueryClientProvider>
            );

            export default App;
