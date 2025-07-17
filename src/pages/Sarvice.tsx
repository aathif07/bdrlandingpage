import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CardSwap from '@/components/blog/CardSwap';
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

      {/* Enhanced Hero Section with Improved Banner and Background */}
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-gray-100">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute bottom-0 w-full h-[250px]"
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
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight"
          >
            Accelerate Growth with AI<span className="text-yellow-500">✨</span><br />Sales & Marketing Automation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto"
          >
            Leading brands grow cost-efficiently with Zixflow. Manage entire customer journeys with next-generation CRM and interactions over Email, SMS, and WhatsApp.
          </motion.p>
          <div className="flex justify-center gap-4">
           
          </div>
        </div>
      </section>
      
  <div className="absolute inset-0">
    <motion.div 
      className="absolute bottom-0 w-full h-[250px]"
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
  <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight"
    >
      Accelerate Growth with AI<span className="text-yellow-500">✨</span><br />Sales & Marketing Automation
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto"
    >
      Leading brands grow cost-efficiently with Zixflow. Manage entire customer journeys with next-generation CRM and interactions over Email, SMS, and WhatsApp.
    </motion.p>
    {/* Added Banner Centered in the Body */}
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
      >
        Special Offer: Start Today!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="text-md md:text-lg text-gray-600 mb-6"
      >
        Get 20% off your first month with Zixflow. Unlock premium features now!
      </motion.p>
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
        >
          Get Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Learn More
        </motion.button>
      </div>
    </div>
  </div>
   
      {/* Services Section with Ripple Effect */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight"
          >
            Our Core Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 35px rgba(0,0,0,0.15)" }}
                className={`relative p-10 rounded-3xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                } border border-gray-200 dark:border-gray-600 shadow-2xl cursor-pointer transition-all duration-300`}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {activeService === index && (
                  <motion.div
                    variants={rippleVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-yellow-300 rounded-full pointer-events-none"
                    style={{ transformOrigin: 'center' }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-6 mb-8">
                  <motion.div
                    className="p-5 bg-yellow-300 rounded-2xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                </div>
                <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-lg`}>
                  {service.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <FiCheck className="text-yellow-400 text-xl flex-shrink-0" />
                      <span className="text-base">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-3 text-yellow-400 hover:text-yellow-500 font-semibold text-lg transition-colors"
                >
                  Discover More <FiArrowRight className="text-xl" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline with Flow Animation */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight text-gray-900 dark:text-white"
          >
            Our Process Flow
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="space-y-14 relative"
          >
            <div className="absolute left-6 top-0 w-1 bg-yellow-400 h-full transform -translate-x-1/2 opacity-40"></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id || index}
                variants={sectionVariants}
                className="flex items-start gap-8 relative"
              >
                <motion.div
                  className="relative flex-shrink-0 z-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-gray-900 shadow-lg">
                    {index + 1}
                  </div>
                </motion.div>
                <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-xl flex-1 border border-gray-200 dark:border-gray-600`}>
                  <div className="flex items-center gap-5 mb-6">
                    <motion.div
                      className="p-4 bg-yellow-400 rounded-xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  </div>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      

      {/* Brochure Downloads with Curve Design */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight text-gray-900 dark:text-white"
          >
            Explore Our Solutions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Data Migration Solutions", icon: <FiDatabase className="text-2xl text-white" />, file: 'data-migration.pdf', image: imageUrls.dataMigration },
              { title: "Mainframe Modernization", icon: <FaServer className="text-2xl text-white" />, file: 'mainframe-modernization.pdf', image: imageUrls.fintech },
              { title: "AI/ML for Government", icon: <FiGlobe className="text-2xl text-white" />, file: 'ai-ml-government.pdf', image: imageUrls.methane },
            ].map((brochure, index) => (
              <motion.div
                key={index}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative group p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden`}
                whileHover={{ y: -10 }}
              >
                <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={brochure.image}
                    alt={brochure.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 bg-yellow-400 rounded-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {brochure.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{brochure.title}</h3>
                </div>
                <motion.button
                  onClick={() => downloadBrochure(`/brochures/${brochure.file}`, brochure.file)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold hover:bg-yellow-500 transition-all shadow-md"
                >
                  <FiDownload /> Download Brochure
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form with Animated Inputs */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto relative">
          <motion.svg
            className="absolute top-0 left-0 w-full h-full text-yellow-400 opacity-10"
            viewBox="0 0 1440 320"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <path
              fill="currentColor"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </motion.svg>
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight text-gray-900 dark:text-white relative z-10"
          >
            Connect With Us
          </motion.h2>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`p-10 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-2xl border border-gray-200 dark:border-gray-600 relative z-10`}
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {['name', 'email', 'phone', 'company'].map((field, index) => (
                  <motion.div
                    key={field}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      className={`w-full p-5 rounded-xl bg-transparent border ${
                        theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 peer text-gray-900 dark:text-white placeholder-transparent`}
                      required
                    />
                    <label
                      className={`absolute left-5 top-5 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-yellow-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </motion.div>
                ))}
                <motion.div
                  className="relative md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full p-5 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'
                    } border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none transition-all duration-300 cursor-pointer`}
                    required
                  >
                    <option value="Data Migration">Data Migration</option>
                    <option value="Fintech Solutions">Fintech Solutions</option>
                    <option value="Methane Mitigation">Methane Mitigation</option>
                    <option value="All Services">All Services</option>
                  </select>
                  <label className="absolute left-5 -top-3 text-sm font-medium text-yellow-400">
                    Service Interest
                  </label>
                  <motion.div
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: formData.service ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiArrowRight />
                  </motion.div>
                </motion.div>
              </div>
              <motion.button
                type="button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all shadow-lg disabled:opacity-50 relative overflow-hidden"
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Processing..." : "Request Consultation"}
                </span>
                <motion.div
                  className="absolute inset-0 bg-yellow-500 opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Promotional Banner Section */}
      <section className="py-16 bg-gradient-to-r from-gray-100 via-yellow-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 w-full h-[150px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <svg 
              className="w-full h-full rotate-180"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path fill="#fff3e0" fillOpacity="0.9" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,202.7C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
          </motion.div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 tracking-wide"
          >
            Unlock Exclusive Features Today!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-md md:text-lg mb-6 text-gray-600 max-w-md mx-auto"
          >
            Get 30% off your first month with Zixflow’s premium plan. Start optimizing now!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 shadow-md"
          >
            Claim Offer Now
          </motion.button>
        </div>
      </section>

      {/* Updated Bottom Banner Section */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute bottom-0 w-full h-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
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
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-wide"
          >
            Boost Your Business with AI-Powered<span className="text-yellow-600">✨</span><br />Sales & Marketing Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-md md:text-lg mb-10 text-gray-700 max-w-xl mx-auto leading-relaxed"
          >
            Transform your growth strategy with Zixflow’s cutting-edge CRM and multi-channel engagement tools. Start today!
          </motion.p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black border border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
            >
              Schedule a Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-yellow-600 text-white rounded-xl font-semibold text-lg hover:bg-yellow-700 transition-all duration-300 shadow-md"
            >
              View Plans
            </motion.button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;