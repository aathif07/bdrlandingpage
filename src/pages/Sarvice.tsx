import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  FiArrowRight, 
  FiCheck, 
  FiDownload, 
  FiBarChart2, 
  FiShield,
  FiDatabase,
  FiGlobe,
  FiCloud,
  FiLock
} from 'react-icons/fi';
import { FaSatellite, FaClipboardCheck, FaMoneyBillWave, FaServer } from 'react-icons/fa';
import { toast } from 'sonner';

const ServicesPage = () => {
  const { theme } = useTheme();
  
  // Initialize Apollo tracking
  useApolloTracking();
  
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Data Migration'
  });

  // Image URLs
  const imageUrls = {
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    dataMigration: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    fintech: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    methane: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    workflow: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  };

  const services = [
    {
      id: 'data-migration',
      title: "Data Migration",
      icon: <FiDatabase className="text-4xl text-indigo-600" />,
      description: "Seamless transition of your critical business data to modern platforms with zero downtime",
      highlights: [
        "Legacy system modernization",
        "Cloud migration expertise",
        "Data integrity assurance",
        "Minimal business disruption"
      ],
      link: "/services/data-migration",
      image: imageUrls.dataMigration
    },
    {
      id: 'fintech',
      title: "Fintech Solutions",
      icon: <FaMoneyBillWave className="text-4xl text-indigo-600" />,
      description: "Advanced financial technology solutions for modern banking and payment systems",
      highlights: [
        "Fraud detection systems",
        "Real-time transaction processing",
        "Regulatory compliance",
        "API banking integration"
      ],
      link: "/services/fintech",
      image: imageUrls.fintech
    },
    {
      id: 'methane',
      title: "Methane Mitigation",
      icon: <FaSatellite className="text-4xl text-indigo-600" />,
      description: "Comprehensive methane monitoring and reduction solutions for energy sector",
      highlights: [
        "Emission tracking",
        "Leak detection",
        "Regulatory compliance",
        "Reduction strategies"
      ],
      link: "/services/methane-mitigation",
      image: imageUrls.methane
    }
  ];

  const processSteps = [
    {
      title: "Consultation & Planning",
      description: "We begin with a thorough analysis of your requirements and develop a customized migration strategy.",
      icon: <FiCloud className="text-3xl text-indigo-600" />
    },
    {
      title: "Execution & Migration",
      description: "Our experts implement the solution with minimal disruption to your operations.",
      icon: <FaServer className="text-3xl text-indigo-600" />
    },
    {
      title: "Optimization & Support",
      description: "Continuous monitoring and refinement to ensure peak performance and value.",
      icon: <FiBarChart2 className="text-3xl text-indigo-600" />
    },
    {
      title: "Compliance & Security",
      description: "Ensure ongoing regulatory compliance and data protection with our managed services.",
      icon: <FiLock className="text-3xl text-indigo-600" />
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Your request has been submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Data Migration'
      });
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Brochure download handler
  const handleDownloadBrochure = () => {
    // Simulate PDF download
    const brochureUrl = '/pdf/BigDataRhino_Services_Overview.pdf';
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'BigDataRhino_Services_Overview.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Brochure download started!');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className={`relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-indigo-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Enterprise <span className="text-indigo-600">Technology Solutions</span> 
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Transform your business with our specialized services designed for complex industry challenges and digital transformation.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={handleDownloadBrochure}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <FiDownload className="text-lg" />
                Download Brochure
              </button>
              <Link 
                to="/contact" 
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className={`rounded-xl overflow-hidden shadow-2xl ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border aspect-video`}>
              <img 
                src={imageUrls.banner} 
                alt="Enterprise Solutions" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Specialized solutions for complex industry challenges
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {services.map((service, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === index 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveTab(index)}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`rounded-xl overflow-hidden shadow-xl ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border aspect-video`}>
              <img 
                src={services[activeTab].image} 
                alt={services[activeTab].title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  {services[activeTab].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{services[activeTab].title}</h3>
              </div>
              
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {services[activeTab].description}
              </p>
              
              <ul className="space-y-3">
                {services[activeTab].highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <FiCheck className="text-indigo-600 dark:text-indigo-400 text-xs"/>
                      </div>
                    </div>
                    <span className="text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Link 
                  to={services[activeTab].link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Explore {services[activeTab].title}
                  <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Delivery Process</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              A proven methodology for successful implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                    {step.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Business?</h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our solution experts will help you find the right approach for your needs.
              </p>
              
              <div className="space-y-4">
                {[
                  "Industry-specific expertise",
                  "Proven implementation methodology",
                  "Ongoing support and optimization",
                  "Compliance and security focused"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <FiCheck className="text-indigo-600 dark:text-indigo-400 text-xs"/>
                      </div>
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium mt-6"
                onClick={handleDownloadBrochure}
              >
                <FiDownload className="mr-2"/>
                Download Full Services Brochure (PDF)
              </button>
            </div>
            
            <div className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border border-gray-100 dark:border-gray-700`}>
              <h3 className="text-2xl font-bold mb-6">Request Service Information</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium">Full Name*</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email*</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium">Phone*</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Company*</label>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Service Interest*</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Data Migration">Data Migration</option>
                    <option value="Fintech Solutions">Fintech Solutions</option>
                    <option value="Methane Mitigation">Methane Mitigation</option>
                    <option value="All Services">All Services</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-lg transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Get Expert Consultation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;