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
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
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

      {/* Enhanced Hero Section with Improved Wave Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={imageUrls.banner} 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          
          {/* Enhanced Wave Animation */}
          <motion.div 
            className="absolute bottom-0 w-full h-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <svg 
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path 
                fill="#fcd34d"
                fillOpacity="0.8"
                d="M0,224L60,224C120,224,240,224,360,208C480,192,600,160,720,160C840,160,960,192,1080,192C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              >
                <animate
                  attributeName="d"
                  dur="12s"
                  repeatCount="indefinite"
                  values="
                    M0,224L60,224C120,224,240,224,360,208C480,192,600,160,720,160C840,160,960,192,1080,192C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
                    M0,128L60,160C120,192,240,256,360,256C480,256,600,192,720,170.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
                    M0,192L60,197.3C120,203,240,213,360,208C480,203,600,181,720,170.7C840,160,960,160,1080,170.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
                    M0,224L60,224C120,224,240,224,360,208C480,192,600,160,720,160C840,160,960,192,1080,192C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
              </path>
            </svg>
          </motion.div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2
            }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight"
          >
            Flow into the Future with <span className="text-yellow-300">Dynamic Solutions</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4, 
              ease: "easeOut" 
            }}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
          >
            Transform your business with our fluid, innovative technology services.
          </motion.p>
          
          {/* Subtle floating animation for text */}
        </div>
      </section>

      {/* Services Section with Ripple Effect */}
      <section className={`py-24 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }}
                className={`relative p-8 rounded-3xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                } border border-gray-200 dark:border-gray-600 shadow-xl cursor-pointer`}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Ripple Effect */}
                {activeService === index && (
                  <motion.div
                    variants={rippleVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-yellow-300 rounded-full pointer-events-none"
                    style={{ transformOrigin: 'center' }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-4 bg-yellow-300 rounded-2xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <FiCheck className="text-yellow-300 flex-shrink-0" />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 font-semibold transition-colors"
                >
                  Discover More <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline with Flow Animation */}
      <section className={`py-24 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight"
          >
            Our Process Flow
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="space-y-12 relative"
          >
            {/* Flow Line */}
            <div className="absolute left-6 top-0 w-1 bg-yellow-300 h-full transform -translate-x-1/2 opacity-30"></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id || index}
                variants={sectionVariants}
                className="flex items-start gap-6 relative"
              >
                <motion.div
                  className="relative flex-shrink-0 z-10"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-xl font-bold text-gray-900 shadow-lg">
                    {index + 1}
                  </div>
                </motion.div>
                <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg flex-1 border border-gray-200 dark:border-gray-600`}>
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="p-3 bg-yellow-300 rounded-xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brochure Downloads with Curve Design */}
      <section className={`py-24 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight"
          >
            Explore Our Solutions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className={`relative group p-6 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden`}
                whileHover={{ y: -10 }}
              >
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
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
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="p-3 bg-yellow-300 rounded-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {brochure.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold">{brochure.title}</h3>
                </div>
                <motion.button
                  onClick={() => downloadBrochure(`/brochures/${brochure.file}`, brochure.file)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-300 text-gray-900 rounded-full font-semibold hover:bg-yellow-400 transition-all shadow-md"
                >
                  <FiDownload /> Download Brochure
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form with Animated Inputs */}
      <section className={`py-24 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto relative">
          {/* Wave Background Decoration */}
          <motion.svg
            className="absolute top-0 left-0 w-full h-full text-yellow-300 opacity-10"
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
            className="text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight relative z-10"
          >
            Connect With Us
          </motion.h2>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-2xl border border-gray-200 dark:border-gray-600 relative z-10`}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className={`w-full p-4 rounded-xl bg-transparent border ${
                        theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 peer text-gray-900 dark:text-white placeholder-transparent`}
                      required
                    />
                    <label
                      className={`absolute left-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-yellow-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base`}
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
                    className={`w-full p-4 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'
                    } border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 appearance-none transition-all duration-300 cursor-pointer`}
                    required
                  >
                    <option value="Data Migration">Data Migration</option>
                    <option value="Fintech Solutions">Fintech Solutions</option>
                    <option value="Methane Mitigation">Methane Mitigation</option>
                    <option value="All Services">All Services</option>
                  </select>
                  <label className="absolute left-4 -top-3 text-sm font-medium text-yellow-300">
                    Service Interest
                  </label>
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
                className="w-full px-8 py-4 bg-yellow-300 text-gray-900 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all shadow-lg disabled:opacity-50 relative overflow-hidden"
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Processing..." : "Request Consultation"}
                </span>
                <motion.div
                  className="absolute inset-0 bg-yellow-400 opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;