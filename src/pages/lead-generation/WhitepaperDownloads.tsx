import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/button';
import { FileText, X } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

// Define a type for our lead data
interface LeadData {
  name: string;
  email: string;
  mobile: string;
  whitepaper: string;
  downloadDate: string;
}

const WhitepaperDownloads = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<{
    title: string;
    pdfPath: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    mobile?: string;
  }>({});

  useEffect(() => {
    document.title = "Whitepaper Downloads | Big Data Rhino";
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const whitepapers = [
    {
      title: "Carbon Mapper Case Study - Energy Department",
      description: "A comprehensive analysis of carbon mapping technologies and their implementation in the energy sector.",
      publishDate: "March 2025",
      pdfPath: "/assets/case-studies/Big+Data+Rhino-Carbon+Mapper-Case+Study-Energy+Dpartment.pdf"
    },
    {
      title: "Case Study: AI Counter-AI Military Applications",
      description: "An in-depth exploration of artificial intelligence and counter-AI strategies in military operations.",
      publishDate: "February 2025",
      pdfPath: "/assets/case-studies/Big+Data+Rhino-Case+Study-AI-Counter-AI-Military.pdf"
    },
    {
      title: "Energy Sector Case Study",
      description: "How big data analytics is transforming energy management and optimization strategies.",
      publishDate: "January 2025",
      pdfPath: "/assets/case-studies/Big+Data+Rhino-Case+Study-Energy-2.pdf"
    },
    {
      title: "FinTech Industry Case Study",
      description: "Exploring the impact of data-driven technologies on financial services and banking innovation.",
      publishDate: "December 2024",
      pdfPath: "/assets/case-studies/Big+Data+Rhino-Case+Study-FinTech.pdf"
    },
    {
      title: "Data Analytics in Military Applications",
      description: "How advanced analytics and big data are revolutionizing military intelligence and decision-making.",
      publishDate: "November 2024",
      pdfPath: "/assets/case-studies/Big+Data+Rhino-Data+Analytics-Military.pdf"
    }
  ];

  // Function to initiate download process
  const initiateDownload = (paper: { title: string; pdfPath: string }) => {
    setSelectedPaper(paper);
    setIsModalOpen(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      mobile?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10,15}$/.test(formData.mobile.replace(/[^0-9]/g, ''))) {
      newErrors.mobile = 'Mobile number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle direct download
  const handleDirectDownload = (pdfPath: string, title: string) => {
    const link = document.createElement('a');
    link.href = pdfPath;
    
    // Extract filename from the path
    const filename = pdfPath.split('/').pop() || title.replace(/\s+/g, '+') + '.pdf';
    link.setAttribute('download', filename);
    
    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle form submission and download
  const handleSubmitAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedPaper) return;
    
    setIsSubmitting(true);
    
    try {
      // Create lead data for Firebase
      const leadData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        whitepaper: selectedPaper.title,
        downloadDate: serverTimestamp(),
        createdAt: new Date().toISOString() // Fallback timestamp
      };
      
      // Add to Firestore
      const docRef = await addDoc(collection(db, "whitepaper_leads"), leadData);
      console.log("Document written with ID: ", docRef.id);
      
      // Proceed with download
      handleDirectDownload(selectedPaper.pdfPath, selectedPaper.title);
      
      // Reset form and close modal
      setFormData({ name: '', email: '', mobile: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving lead data to Firebase:", error);
      
      // Fallback to localStorage if Firebase fails
      try {
        const fallbackData = {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          whitepaper: selectedPaper.title,
          downloadDate: new Date().toISOString()
        };
        
        const existingLeads = JSON.parse(localStorage.getItem('whitepaper_leads') || '[]');
        existingLeads.push(fallbackData);
        localStorage.setItem('whitepaper_leads', JSON.stringify(existingLeads));
        
        console.log("Lead data saved to localStorage as fallback");
        
        // Still allow the download even if Firebase fails
        handleDirectDownload(selectedPaper.pdfPath, selectedPaper.title);
        setFormData({ name: '', email: '', mobile: '' });
        setIsModalOpen(false);
      } catch (localStorageError) {
        console.error("Error saving to localStorage:", localStorageError);
        alert("There was an error processing your download. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Whitepaper Downloads</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Access our collection of expert-authored whitepapers covering the latest trends, innovations, and best practices in technology and business.
            </p>
            
            <div className="space-y-8 mt-8">
              {whitepapers.map((paper, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded flex items-center justify-center flex-shrink-0">
                      <FileText size={48} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2">{paper.title}</h2>
                      <p className="mb-4">{paper.description}</p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <span>Published: {paper.publishDate}</span>
                      </div>
                      <Button 
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => initiateDownload(paper)}
                      >
                        Download Whitepaper
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Lead Generation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Download {selectedPaper?.title}</h2>
            <p className="mb-6">Please provide your contact information to access this whitepaper.</p>
            
            <form onSubmit={handleSubmitAndDownload}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={errors.mobile ? "border-red-500" : ""}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Download Now"}
                </Button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  By downloading this whitepaper, you agree to our privacy policy and consent to receiving future communications from us. We respect your privacy and will never share your information with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhitepaperDownloads;
