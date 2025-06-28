import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { 
  FiArrowRight, 
  FiCheck, 
  FiDownload, 
  FiPlay, 
  FiBarChart2, 
  FiShield, 
  FiTrendingDown,
  FiDatabase,
  FiGlobe
} from 'react-icons/fi';
import { FaSatellite, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
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
    compliance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    workflow: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80'
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

  // Brochure download handler
  const handleDownloadBrochure = () => {
    // Simulate PDF download
    const brochureUrl = '/pdf/Leveraging AI_ML for Smarter, Faster Government.pdf';
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = '/pdf/Leveraging AI_ML for Smarter, Faster Government.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Brochure download started!');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Navbar />

      {/* Fixed Hero Banner Alignment */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Advanced Methane Solutions
                <span className="text-indigo-600 block mt-2">for Sustainable Operations</span>
              </h1>
              <p className={`text-xl max-w-2xl mx-auto md:mx-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Cutting-edge monitoring and reduction technologies to minimize emissions and ensure compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Link 
                  to="/contact" 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Get Started <FiArrowRight className="text-lg" />
                </Link>
                <button 
                  onClick={handleDownloadBrochure}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg transition-colors shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  <FiDownload className="text-lg" />
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 aspect-video max-w-2xl mx-auto">
              <img src={imageUrls.banner} alt="Methane Monitoring" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs - Buttons Removed */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
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
              
              {/* Buttons Removed from this Section */}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
                  
                  {/* Step Number */}
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

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
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
                onClick={handleDownloadBrochure}
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

      {/* About Big Data Rhino Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">About Big Data Rhino</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4`}>
              Precision Data Solutions for Strategic Decision-Making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Founded in February 2022 by Patrick Parks, a proud Reconnaissance Marine veteran, Big Data Rhino is driven by a mission to bring clarity and actionable insights to complex data challenges. We combine military precision with cutting-edge data science to empower smarter business decisions.
              </p>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Our Story: Born from military discipline and technological innovation, Big Data Rhino brings strategic thinking and relentless execution to data solutions. From veteran-owned startup to trusted industry partner, we help organizations navigate data complexity with confidence.
              </p>
            </div>
            <div className="relative">
              <div className={`rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border aspect-video`}>
                <img 
                  src={imageUrls.workflow} 
                  alt="Big Data Rhino Workflow" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-4">Our Approach</h3>
              <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start">
                  <FiShield className="text-gray-800 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Military-grade precision in data handling</span>
                </li>
                <li className="flex items-start">
                  <FiDatabase className="text-gray-800 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Cutting-edge AI and machine learning</span>
                </li>
                <li className="flex items-start">
                  <FiGlobe className="text-gray-800 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Industry-specific expertise</span>
                </li>
                <li className="flex items-start">
                  <FiBarChart2 className="text-gray-800 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Actionable business insights</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Our Capabilities</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🤖", text: "AI Solutions" },
                  { icon: "🔮", text: "Predictive Analytics" },
                  { icon: "📊", text: "Data Visualization" },
                  { icon: "☁️", text: "Cloud Integration" },
                  { icon: "🔌", text: "API Development" },
                  { icon: "🛡️", text: "Security Compliance" }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Industry Impact</h3>
              <div className="space-y-4">
                {[
                  { 
                    industry: "Energy Sector", 
                    description: "Optimizing operations and reducing emissions through analytics",
                    stat: "30% efficiency gains" 
                  },
                  { 
                    industry: "Healthcare", 
                    description: "Transforming patient outcomes with predictive analytics",
                    stat: "Improved diagnostics" 
                  },
                  { 
                    industry: "Government", 
                    description: "Secure, actionable intelligence for public agencies",
                    stat: "DVBE-certified" 
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <h4 className="font-semibold mb-2">{item.industry}</h4>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                    <p className="text-gray-800 dark:text-gray-300 font-medium">{item.stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-16`}>
            <h3 className="text-xl font-bold mb-4">Our Team Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  We combine technical excellence with unique perspectives to deliver innovative solutions:
                </p>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>PhD-level data scientists</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Veterans with military discipline</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Industry domain experts</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Creative problem-solvers</span>
                  </li>
                </ul>
              </div>
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} italic border-l-4 border-gray-500`}>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  "The best solutions emerge when unique perspectives meet deep technical expertise."
                </p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Our culture emphasizes continuous learning, collaboration, and shared success.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-center">Our Commitment to Clients</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🔍", title: "Transparency", description: "Clear communication throughout" },
                { icon: "📈", title: "Results", description: "Measurable business outcomes" },
                { icon: "🛡️", title: "Security", description: "Enterprise-grade protection" },
                { icon: "🤝", title: "Partnership", description: "Long-term collaboration" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
                <FiDownload className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
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
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-lg mt-4 transition-colors"
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