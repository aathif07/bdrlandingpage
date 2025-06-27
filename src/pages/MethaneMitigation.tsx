import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { FiArrowRight, FiCheck, FiDownload, FiPlay, FiBarChart2, FiShield, FiTrendingDown } from 'react-icons/fi';
import { FaSatellite, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
import phoneIcon from '../../public/phone icon.png';
import { toast } from 'sonner';

const MethaneMitigation = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Methane Monitoring'
  });

  // Image URLs
  const imageUrls = {
    logo: 'https://via.placeholder.com/150x50?text=Your+Logo',
    banner: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1574717024453-354a7d62faf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    monitoring: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    reduction: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    compliance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  };

  const services = [
    {
      title: "Methane Monitoring",
      icon: <FaSatellite className="text-4xl text-indigo-600" />,
      highlights: [
        "Real-time emission tracking",
        "Automated leak detection",
        "Advanced sensor networks",
        "Satellite data integration"
      ],
      image: imageUrls.monitoring
    },
    {
      title: "Emission Reduction",
      icon: <FiTrendingDown className="text-4xl text-indigo-600" />,
      highlights: [
        "Leak repair prioritization",
        "Operational optimization",
        "Waste-to-value solutions",
        "Carbon credit guidance"
      ],
      image: imageUrls.reduction
    },
    {
      title: "Regulatory Compliance",
      icon: <FaClipboardCheck className="text-4xl text-indigo-600" />,
      highlights: [
        "Automated reporting",
        "Audit preparation",
        "Policy change alerts",
        "Documentation management"
      ],
      image: imageUrls.compliance
    }
  ];

  const processSteps = [
    {
      title: "Initial Assessment",
      description: "We conduct a comprehensive analysis of your current methane emissions using advanced detection technologies.",
      icon: <FaChartLine className="text-3xl text-indigo-600" />
    },
    {
      title: "Solution Deployment",
      description: "Our team implements tailored monitoring systems and reduction strategies specific to your operations.",
      icon: <FiBarChart2 className="text-3xl text-indigo-600" />
    },
    {
      title: "Continuous Optimization",
      description: "Ongoing data analysis and system adjustments ensure maximum efficiency and compliance.",
      icon: <FiShield className="text-3xl text-indigo-600" />
    }
  ];

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const handleVideoOpen = () => setShowVideo(true);
  const handleVideoClose = () => setShowVideo(false);

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
      setShowPopup(false);
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
     <Navbar />


      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Advanced <span className="text-indigo-600">Methane Solutions</span> for Sustainable Operations
              </h1>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Cutting-edge monitoring and reduction technologies to minimize emissions and ensure compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact" className="btn-primary">
                  Get Started <FiArrowRight className="ml-2"/>
                </Link>
                <button onClick={handleOpenPopup} className="btn-secondary">
                  <img src={phoneIcon} alt="Phone" className="w-5 h-5 mr-2"/>
                  Request Demo
                </button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 aspect-video">
              <img src={imageUrls.banner} alt="Methane Monitoring" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs - Enhanced UI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Methane Solutions</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              End-to-end services to detect, measure, and reduce methane emissions
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
              {services.map((service, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${activeTab === index 
                    ? 'bg-white dark:bg-gray-800 shadow-md text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  onClick={() => setActiveTab(index)}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`rounded-xl overflow-hidden shadow-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} aspect-video`}>
              <img src={services[activeTab].image} alt={services[activeTab].title} className="w-full h-full object-cover"/>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  {services[activeTab].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{services[activeTab].title}</h3>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services[activeTab].highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <FiCheck className="text-indigo-600 dark:text-indigo-400 text-xs"/>
                      </div>
                    </div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button onClick={handleOpenPopup} className="btn-primary">
                  Learn More
                </button>
                <button 
                  onClick={() => {
                    setFormData({...formData, service: services[activeTab].title});
                    handleOpenPopup();
                  }} 
                  className="btn-secondary"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Proven Process</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              A systematic approach to effective methane management
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
            
            <div className="space-y-16 lg:space-y-0">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative lg:flex items-center gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Step Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className={`p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-100 dark:border-gray-700`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Step Number (for desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-16 h-16 rounded-full bg-indigo-600 text-white items-center justify-center text-2xl font-bold z-10">
                    {index + 1}
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Enhanced */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Technology in Action</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Watch how our advanced methane detection systems work in real-world applications
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 aspect-video max-w-5xl mx-auto bg-black">
            {showVideo ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/watch?v=paSLSzoha4E" 
                  title="Methane Monitoring Technology" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <>
                <img 
                  src={imageUrls.videoThumbnail} 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handleVideoOpen}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <FiPlay className="text-white text-3xl ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-xl md:text-2xl font-bold">Methane Detection Technology</h3>
                  <p className="text-sm md:text-base">3:24 min</p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Field Deployment",
                time: "2:15 min",
                onClick: () => setShowVideo(true)
              },
              {
                title: "Data Analytics",
                time: "4:30 min",
                onClick: () => setShowVideo(true)
              },
              {
                title: "Case Study",
                time: "5:42 min",
                onClick: () => setShowVideo(true)
              }
            ].map((video, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer transition-colors`}
                onClick={video.onClick}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <FiPlay className="text-white ml-1" />
                  </div>
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{video.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Reduce Your Methane Emissions?</h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our experts will help you implement the most effective solutions for your operations.
              </p>
              
              <div className="space-y-4">
                {[
                  "Customized monitoring solutions",
                  "Regulatory compliance assurance",
                  "Proven reduction strategies",
                  "24/7 technical support"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <FiCheck className="text-indigo-600 dark:text-indigo-400 text-xs"/>
                      </div>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium mt-6"
                onClick={() => toast.success('Brochure download started')}
              >
                <FiDownload className="mr-2"/>
                Download Full Solution Brochure (PDF)
              </button>
            </div>
            
            <div className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-100 dark:border-gray-700`}>
              <h3 className="text-2xl font-bold mb-6">Request Information</h3>
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
                    <option value="Methane Monitoring">Methane Monitoring</option>
                    <option value="Emission Reduction">Emission Reduction</option>
                    <option value="Regulatory Compliance">Regulatory Compliance</option>
                    <option value="All Services">All Services</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full btn-primary py-4 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Get Expert Consultation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer 
      />

      {/* Demo Request Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <button 
              onClick={handleClosePopup} 
              className="absolute top-4 right-4 text-2xl font-bold hover:opacity-70 transition-opacity"
              type="button"
            >
              &times;
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                <img src={phoneIcon} alt="Phone" className="w-6 h-6"/>
              </div>
              <h3 className="text-2xl font-bold">Schedule a Consultation</h3>
            </div>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
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
                <label className="block mb-2 font-medium">Service Interest*</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="Methane Monitoring">Methane Monitoring</option>
                  <option value="Emission Reduction">Emission Reduction</option>
                  <option value="Regulatory Compliance">Regulatory Compliance</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn-primary py-3 text-lg mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Scheduling..." : "Schedule Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethaneMitigation;