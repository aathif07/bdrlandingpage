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
  FiDatabase,
  FiGlobe,
  FiCloud,
  FiLock
} from 'react-icons/fi';
import { FaSatellite, FaMoneyBillWave, FaServer } from 'react-icons/fa';
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
      icon: <FiDatabase className="text-4xl text-yellow-500" />,
      description: "Seamless transition of your critical business data to modern platforms with zero downtime",
      highlights: [
        "Legacy system modernization",
        "Cloud migration expertise",
        "Data integrity assurance",
        "Minimal business disruption"
      ],
      link: "/methanemitigation",
      image: imageUrls.dataMigration
    },
    {
      id: 'fintech',
      title: "Fintech Solutions",
      icon: <FaMoneyBillWave className="text-4xl text-yellow-500" />,
      description: "Advanced financial technology solutions for modern banking and payment systems",
      highlights: [
        "Fraud detection systems",
        "Real-time transaction processing",
        "Regulatory compliance",
        "API banking integration"
      ],
      link: "/fintech",
      image: imageUrls.fintech
    },
    {
      id: 'methane',
      title: "Methane Mitigation",
      icon: <FaSatellite className="text-4xl text-yellow-500" />,
      description: "Comprehensive methane monitoring and reduction solutions for energy sector",
      highlights: [
        "Emission tracking",
        "Leak detection",
        "Regulatory compliance",
        "Reduction strategies"
      ],
      link: "/methanemitigation",
      image: imageUrls.methane
    }
  ];

  const processSteps = [
    {
      title: "Consultation & Planning",
      description: "We begin with a thorough analysis of your requirements and develop a customized migration strategy.",
      icon: <FiCloud className="text-3xl text-yellow-500" />
    },
    {
      title: "Execution & Migration",
      description: "Our experts implement the solution with minimal disruption to your operations.",
      icon: <FaServer className="text-3xl text-yellow-500" />
    },
    {
      title: "Optimization & Support",
      description: "Continuous monitoring and refinement to ensure peak performance and value.",
      icon: <FiBarChart2 className="text-3xl text-yellow-500" />
    },
    {
      title: "Compliance & Security",
      description: "Ensure ongoing regulatory compliance and data protection with our managed services.",
      icon: <FiLock className="text-3xl text-yellow-500" />
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
  const downloadBrochure = (filePath: string, fileName: string) => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Downloading ${fileName}`);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-white'}`}>
      <Navbar />

      {/* Hero Section */}
      <section className={`relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[500px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-[95%] mx-auto w-full flex flex-col items-center">
          <div className="relative mb-10 w-full max-w-5xl flex justify-center">
            <div className={`rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} aspect-[21/9] max-h-[400px] w-full`}>
              <img 
                src="/image.png" 
                alt="Methane Solutions Dashboard" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="space-y-6 text-center max-w-7xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Enterprise <span className="text-yellow-500"> Technology Services </span> 
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mx-auto`}>
              Transform your business with our specialized services designed for complex industry challenges and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Add buttons or other content here if needed */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
                    ? 'text-white shadow-md bg-yellow-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
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
                <div className="p-3 rounded-full bg-yellow-500/10">
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
                    <div className="mt-1 flex-shrink-0 bg-yellow-500/10 w-5 h-5 rounded-full flex items-center justify-center">
                      <FiCheck className="text-xs text-yellow-500"/>
                    </div>
                    <span className="text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Link 
                  to={services[activeTab].link}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors bg-yellow-500 hover:bg-yellow-600"
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
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
                className={`p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} border border-gray-200 dark:border-gray-600 transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-yellow-500/10">
                    {step.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-bold bg-yellow-500">
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

      {/* Brochure Downloads Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Our Brochures</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Explore detailed information about our specialized solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brochure 1 */}
            <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border border-yellow-100 dark:border-gray-600 flex flex-col`}>
              <div className="flex items-center gap-3 mb-4">
                <FiDatabase className="text-2xl text-yellow-500" />
                <h3 className="text-xl font-bold">Data Migration Solutions</h3>
              </div>
              <p className={`mb-6 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Comprehensive guide to our legacy system modernization and cloud migration services
              </p>
              <button 
                onClick={() => downloadBrochure('/pdf/Big Data Rhino-Data Migration Solutions.pdf', 'Big Data Rhino-Data Migration Solutions')}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors bg-yellow-500 hover:bg-yellow-600"
              >
                <FiDownload className="text-lg" />
                Download PDF
              </button>
            </div>

            {/* Brochure 2 */}
            <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border border-yellow-100 dark:border-gray-600 flex flex-col`}>
              <div className="flex items-center gap-3 mb-4">
                <FaServer className="text-2xl text-yellow-500" />
                <h3 className="text-xl font-bold">Mainframe Modernization</h3>
              </div>
              <p className={`mb-6 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Strategies for transforming legacy mainframe applications to modern architectures
              </p>
              <button 
                onClick={() => downloadBrochure('/pdf/Mainframe Application Modernization (6).pdf', 'Mainframe_Application_Modernization.pdf')}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors bg-yellow-500 hover:bg-yellow-600"
              >
                <FiDownload className="text-lg" />
                Download PDF
              </button>
            </div>

            {/* Brochure 3 */}
            <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border border-yellow-100 dark:border-gray-600 flex flex-col`}>
              <div className="flex items-center gap-3 mb-4">
                <FiGlobe className="text-2xl text-yellow-500" />
                <h3 className="text-xl font-bold">AI/ML for Government</h3>
              </div>
              <p className={`mb-6 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                How AI and machine learning can create smarter, faster government operations
              </p>
              <button 
                onClick={() => downloadBrochure('/pdf/Lleveraging AI_ML for Smarter, Faster Government.pdf', 'AI_ML_for_Government.pdf')}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors bg-yellow-500 hover:bg-yellow-600"
              >
                <FiDownload className="text-lg" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
                    <div className="mt-1 flex-shrink-0 bg-yellow-500/10 w-5 h-5 rounded-full flex items-center justify-center">
                      <FiCheck className="text-xs text-yellow-500"/>
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border border-gray-200 dark:border-gray-600`}>
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
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
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
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
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
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
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
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
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
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full px-6 py-4 text-white font-medium rounded-lg transition-colors bg-yellow-500 hover:bg-yellow-600"
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