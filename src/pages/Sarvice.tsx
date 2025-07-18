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
import { motion, AnimatePresence } from 'framer-motion';

const ServicesPage = () => {
  const { theme } = useTheme();
  useApolloTracking();
  
  const [activeService, setActiveService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Data Migration'
  });

  const imageUrls = {
    dataMigration: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fintech: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    methane: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const services = [
    {
      id: 'data-migration',
      title: "Data Migration",
      icon: <FiDatabase className="text-3xl text-white" />,
      description: "Seamless data transition to modern platforms with zero downtime",
      highlights: [
        "Legacy system modernization",
        "Cloud migration expertise",
        "Data integrity assurance",
        "Minimal business disruption"
      ],
      link: "/data-migration",
      image: imageUrls.dataMigration
    },
    {
      id: 'fintech',
      title: "Fintech Solutions",
      icon: <FaMoneyBillWave className="text-3xl text-white" />,
      description: "Advanced financial tech for banking and payment systems",
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
      icon: <FaSatellite className="text-3xl text-white" />,
      description: "Methane monitoring and reduction for the energy sector",
      highlights: [
        "Satellite-based emission tracking",
        "AI-powered leak detection",
        "Regulatory compliance reporting",
        "Reduction strategy implementation"
      ],
      link: "/methane-mitigation",
      image: imageUrls.methane
    }
  ];

  const processSteps = [
    {
      title: "Consultation & Planning",
      description: "Tailored strategy based on your business needs.",
      icon: <FiCloud className="text-2xl text-white" />
    },
    {
      id: 'execution-migration',
      title: "Execution & Migration",
      description: "Smooth implementation with minimal disruption.",
      icon: <FaServer className="text-2xl text-white" />
    },
    {
      id: 'optimization-support',
      title: "Optimization & Support",
      description: "Continuous monitoring for optimal performance.",
      icon: <FiBarChart2 className="text-2xl text-white" />
    },
    {
      id: 'compliance-security',
      title: "Compliance & Security",
      description: "Robust protection and regulatory compliance.",
      icon: <FiLock className="text-2xl text-white" />
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Your request has been submitted!');
      resetForm();
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Data Migration'
    });
  };

  const downloadBrochure = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${fileName}`);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.3 },
    animate: { scale: 2, opacity: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} font-sans`}>
      <Navbar />
<section className="relative h-[50vh] sm:h-[67vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-gray-100">  <div className="absolute inset-0">
    <motion.div 
      className="absolute bottom-0 w-full h-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <svg 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path fill="#f9f7f3" fillOpacity="0.9" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,202.7C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
    </motion.div>
  </div>
  
  <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-4">
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
    > 
      Accelerate Growth with AI<span className="text-yellow-500">✨</span><br />Sales & Marketing Automation
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto mt-6"
    >
      Leading brands grow cost-efficiently with Zixflow. Manage entire customer journeys with next-generation CRM and interactions over Email, SMS, and WhatsApp.
    </motion.p>
    
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-10 mx-auto max-w-4xl">
      <img
        src="/image.png"
        alt="Services Banner"
        className="w-full h-auto rounded-lg"
      />
    </div>
  </div>
</section>
    {/* Data Migration Services Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Data Migration Services
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Secure, compliant data transfer with risk assessment and advanced protection strategies tailored to your industry.
        </p>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Learn More
        </button>
      </div>
      
      <div className="relative">
        <div className="bg-blue-100 rounded-2xl p-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-gray-900 rounded-t-lg p-4 mb-4">
              <h3 className="text-white font-semibold">Key Features</h3>
            </div>
            <div className="mb-6">
              <img 
                src="\Data Migration.png" 
                alt="Data Migration"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-4">
              {[
                { name: "Risk Assessment", progress: 90, color: "bg-blue-500" },
                { name: "Regulatory Compliance", progress: 85, color: "bg-green-500" },
                { name: "Security Protocols", progress: 95, color: "bg-purple-500" }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Methane Mitigation Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="bg-green-100 rounded-2xl p-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-gray-900 rounded-t-lg p-4 mb-4">
              <h3 className="text-white font-semibold">Technology Stack</h3>
            </div>
            <div className="mb-6">
              <img 
                src="\Methane Mitigation.png"  // Replace with your image path
                alt="Methane Mitigation"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { metric: "Satellite Detection", value: "Real-time", color: "bg-teal-500" },
                { metric: "AI Analytics", value: "90% Accuracy", color: "bg-orange-500" },
                { metric: "IoT Sensors", value: "24/7 Monitoring", color: "bg-indigo-500" },
                { metric: "Regulatory Support", value: "Compliance", color: "bg-yellow-500" }
              ].map((item, index) => (
                <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-900">{item.metric}</p>
                  <p className="text-sm text-gray-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Methane Mitigation Solutions
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Detect and reduce methane emissions using satellite tech, IoT sensors, and AI-driven analytics for industries like oil/gas and agriculture.
        </p>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>

{/* Fintech Solutions Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Fintech Solutions
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered tools for fraud detection, risk assessment, and regulatory compliance (e.g., CFPB Rule 1071) to transform financial operations.
        </p>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Learn More
        </button>
      </div>
      
      <div className="relative">
        <div className="bg-purple-100 rounded-2xl p-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-gray-900 rounded-t-lg p-4 mb-4">
              <h3 className="text-white font-semibold">Impact Metrics</h3>
            </div>
            <div className="mb-6">
              <img 
                src="\Fintech.png"  // Replace with your image path
                alt="Fintech Analytics"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-4">
              {[
                { name: "Fraud Detection", value: "67% Reduction", color: "bg-red-500" },
                { name: "Customer Retention", value: "3.2x Higher", color: "bg-blue-500" },
                { name: "Compliance Efficiency", value: "$100K Fines Avoided", color: "bg-green-500" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Process Timeline */}
      <section className={`py-20 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Our Process Flow
          </motion.h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-yellow-400 opacity-30 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id || index}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="flex items-start gap-6 relative"
                >
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-bold text-gray-900 shadow-md">
                      {index + 1}
                    </div>
                  </motion.div>
                  
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border border-gray-200 dark:border-gray-700 flex-1`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-yellow-400 rounded-lg">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brochure Downloads */}
      <section className={`py-20 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Explore Our Solutions
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Data Migration Solutions", icon: <FiDatabase className="text-2xl" />, file: 'data-migration.pdf', image: imageUrls.dataMigration },
              { title: "Mainframe Modernization", icon: <FaServer className="text-2xl" />, file: 'mainframe-modernization.pdf', image: imageUrls.fintech },
              { title: "AI/ML for Government", icon: <FiGlobe className="text-2xl" />, file: 'ai-ml-government.pdf', image: imageUrls.methane },
            ].map((brochure, index) => (
              <motion.div
                key={index}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg border border-gray-200 dark:border-gray-600`}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={brochure.image}
                    alt={brochure.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-yellow-400 rounded-lg text-white">
                      {brochure.icon}
                    </div>
                    <h3 className="text-lg font-bold">{brochure.title}</h3>
                  </div>
                  
                  <motion.button
                    onClick={() => downloadBrochure(`/brochures/${brochure.file}`, brochure.file)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-all"
                  >
                    <FiDownload /> Download Brochure
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className={`py-20 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-12"
          >
            Connect With Us
          </motion.h2>
          
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl border border-gray-200 dark:border-gray-700`}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name', 'email', 'phone', 'company'].map((field) => (
                  <div key={field} className="relative">
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-yellow-400 peer`}
                      placeholder=" "
                    />
                    <label className={`absolute left-4 top-3 px-1 transition-all duration-200 pointer-events-none ${
                      formData[field] ? 'text-sm -translate-y-6 bg-white dark:bg-gray-800 text-yellow-500' : 
                      'peer-focus:text-sm peer-focus:-translate-y-6 peer-focus:text-yellow-500 peer-focus:bg-white dark:peer-focus:bg-gray-800'
                    } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg appearance-none ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                  required
                >
                  <option value="Data Migration">Data Migration</option>
                  <option value="Fintech Solutions">Fintech Solutions</option>
                  <option value="Methane Mitigation">Methane Mitigation</option>
                </select>
                <label className={`absolute left-4 -top-3 px-1 text-sm ${
                  theme === 'dark' ? 'text-yellow-400 bg-gray-800' : 'text-yellow-500 bg-white'
                }`}>
                  Service Interest
                </label>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FiArrowRight className="text-gray-500" />
                </div>
              </div>
              
              <motion.button
                type="button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Request Consultation'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;