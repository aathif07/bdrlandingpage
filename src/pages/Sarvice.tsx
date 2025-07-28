import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      image: imageUrls.dataMigration,
      color: "bg-blue-500"
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
      image: imageUrls.fintech,
      color: "bg-green-500"
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
      image: imageUrls.methane,
      color: "bg-teal-500"
    }
  ];

  const processSteps = [
    {
      title: "Consultation & Planning",
      description: "Tailored strategy based on your business needs.",
      icon: <FiCloud className="text-2xl text-white" />,
      color: "bg-blue-500"
    },
    {
      id: 'execution-migration',
      title: "Execution & Migration",
      description: "Smooth implementation with minimal disruption.",
      icon: <FaServer className="text-2xl text-white" />,
      color: "bg-yellow-500"
    },
    {
      id: 'optimization-support',
      title: "Optimization & Support",
      description: "Continuous monitoring for optimal performance.",
      icon: <FiBarChart2 className="text-2xl text-white" />,
      color: "bg-green-500"
    },
    {
      id: 'compliance-security',
      title: "Compliance & Security",
      description: "Robust protection and regulatory compliance.",
      icon: <FiLock className="text-2xl text-white" />,
      color: "bg-purple-500"
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

  return (
    <div className="min-h-[90vh] flex flex-col text-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-gray-100 pt-24">
        <div className="absolute inset-0">
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
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
          > 
            Empower Your Business with Our Services<span className="text-blue-500">✨</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto mt-6"
          >
            Transform your operations with our expert services and solutions.
          </motion.p>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-12 mx-auto max-w-5xl">
            <img
              src="https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/stock-assets/getty/image/photography/43/85/transgender-business_0661.jpg/_jcr_content/renditions/cq5dam.thumbnail.1280.1280.png"
              alt="Services Banner"
              className="w-full h-auto max-h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-8"
          >
            Precision Data Solutions for Strategic Decision-Making
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto px-4"
          >
            Founded in February 2022 by Patrick Parks, a proud Reconnaissance Marine veteran, Big Data Rhino is driven by a mission to bring clarity and actionable insights to complex data challenges. We combine military precision with cutting-edge data science to empower smarter business decisions.
          </motion.p>

          <div className="mt-12 grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-left hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">Our Mission</h3>
              <div className="text-gray-600 space-y-4">
                <p>
                  At Big Data Rhino, our mission is to harness the power of data and analytics to solve complex business challenges. We identify hidden patterns and opportunities within your data that others might miss.
                </p>
                <p>
                  We transform raw, unstructured data into strategic assets through our advanced analytics capabilities. Our solutions help organizations of all sizes make smarter decisions, reduce costs, and uncover new revenue streams.
                </p>
                <p>
                  We are committed to providing innovative solutions that transform raw data into actionable insights, enabling organizations to optimize operations, enhance customer experiences, and drive sustainable growth.
                </p>
              </div>
            </motion.div>
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
              <a href="/data-migration">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg">
                  Learn More <FiArrowRight className="inline ml-2" />
                </button>
              </a>
            </div>
            
            <div className="relative">
              <div className="bg-blue-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="bg-blue-600 rounded-t-lg p-4 mb-4">
                    <h3 className="text-white font-semibold">Data Migration</h3>
                  </div>
                  <div className="mb-6">
                    <img 
                      src="/Data_Migration.png" 
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
                  <div className="bg-green-600 rounded-t-lg p-4 mb-4">
                    <h3 className="text-white font-semibold">Methane Mitigation</h3>
                  </div>
                  <div className="mb-6">
                    <img 
                      src="/Methane_Mitigation.png"
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
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg">
                Learn More <FiArrowRight className="inline ml-2" />
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
                AI-powered tools for fraud detection, risk assessment, and regulatory compliance to transform financial operations.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg">
                Learn More <FiArrowRight className="inline ml-2" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-purple-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="bg-purple-600 rounded-t-lg p-4 mb-4">
                    <h3 className="text-white font-semibold">Fintech Analytics</h3>
                  </div>
                  <div className="mb-6">
                    <img 
                      src="/Fintech.png"
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
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            Our Process Flow
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-400 opacity-30 transform -translate-x-1/2"></div>
            
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
                    <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-xl font-bold text-white shadow-md`}>
                      {index + 1}
                    </div>
                  </motion.div>
                  
                  <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-200 flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 ${step.color} rounded-lg text-white`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>    

      {/* Solutions Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Explore Our Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <img 
                src="/Data_Migration.png" 
                alt="Data Migration" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Data Migration</h3>
              </div>
              <a 
                href="/pdfs/Data_Migration_Brochure.pdf" 
                download 
                className="w-full max-w-xs py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transition-all duration-200 text-center"
              >
                Download Brochure
              </a>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <img 
                src="/Fintech_Solutions.png" 
                alt="Fintech Solutions" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Fintech Solutions</h3>
              </div>
              <a 
                href="/pdfs/Fintech_Solutions_Brochure.pdf" 
                download 
                className="w-full max-w-xs py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transition-all duration-200 text-center"
              >
                Download Brochure
              </a>
            </div>

            <div className="bg-orange-100 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <img 
                src="/Methane_Mitigation.png" 
                alt="Methane Mitigation" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Methane Mitigation</h3>
              </div>
              <a 
                href="/pdfs/Methane_Mitigation_Brochure.pdf" 
                download 
                className="w-full max-w-xs py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transition-all duration-200 text-center"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900"
          >
            Connect With Us
          </motion.h2>
          
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white shadow-xl border border-gray-200"
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
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      placeholder=" "
                    />
                    <label className={`absolute left-4 top-3 px-1 transition-all duration-200 pointer-events-none ${
                      formData[field] ? 'text-sm -translate-y-6 bg-white text-blue-500' : 
                      'peer-focus:text-sm peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-focus:bg-white'
                    } text-gray-500`}>
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
                  className="w-full px-4 py-3 rounded-lg appearance-none bg-white border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
                <label className="absolute left-4 -top-3 px-1 text-sm text-blue-500 bg-white">
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
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 shadow-md"
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