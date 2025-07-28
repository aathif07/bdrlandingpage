import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FiArrowRight, FiCheck, FiDatabase, FiShield, FiClock, FiBarChart2, FiServer, FiGlobe, FiDownload } from 'react-icons/fi';

const DataMigration = () => {
  const { theme } = useTheme();
  
  useApolloTracking();
  
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Data Migration',
    message: ''
  });

  // Public image URLs
  const imageUrls = {
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
    databaseMigration: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cloudMigration: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    appMigration: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    backgroundPattern: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  };

  // Grayish-brown color scheme
  const colors = {
    primary: theme === 'dark' ? 'amber-500' : 'amber-600',
    primaryLight: theme === 'dark' ? 'amber-400' : 'amber-500',
    secondary: theme === 'dark' ? 'stone-400' : 'stone-600',
    background: theme === 'dark' ? 'stone-900' : 'stone-50',
    card: theme === 'dark' ? 'stone-800' : 'white',
    textPrimary: theme === 'dark' ? 'stone-100' : 'stone-800',
    textSecondary: theme === 'dark' ? 'stone-300' : 'stone-600',
    border: theme === 'dark' ? 'stone-700' : 'stone-200'
  };

  useEffect(() => {
    document.title = "Data Migration Services | DataRhino";
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', service: 'Data Migration', message: '' });
      setShowPopup(false);
      setIsSubmitting(false);
      alert('Thank you for your submission! We will contact you shortly.');
    }, 1500);
  };

  const downloadBrochure = () => {
    const brochureUrl = '/pdf/DataRhino-Data-Migration-Solutions.pdf';
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'DataRhino-Data-Migration-Solutions.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    {
      title: "Database Migration",
      icon: <FiDatabase className="text-2xl" />,
      content: "Our database migration services ensure seamless transfer of your critical data between platforms with zero downtime. We support all major database systems including MySQL, PostgreSQL, Oracle, and SQL Server.",
      image: imageUrls.databaseMigration
    },
    {
      title: "Cloud Migration",
      icon: <FiGlobe className="text-2xl" />,
      content: "Transition to the cloud with confidence. We specialize in AWS, Azure, and Google Cloud migrations, providing secure data transfer, architecture optimization, and cost management strategies.",
      image: imageUrls.cloudMigration
    },
    {
      title: "Application Migration",
      icon: <FiServer className="text-2xl" />,
      content: "Modernize your applications while maintaining data integrity. We handle complex application migrations including legacy system upgrades, platform changes, and containerization.",
      image: imageUrls.appMigration
    }
  ];

  const steps = [
    {
      title: "Assessment",
      description: "Comprehensive analysis of your current data landscape",
      icon: <FiBarChart2 className="text-2xl" />
    },
    {
      title: "Planning",
      description: "Custom migration strategy with risk mitigation",
      icon: <FiClock className="text-2xl" />
    },
    {
      title: "Execution",
      description: "Phased implementation with validation checkpoints",
      icon: <FiDatabase className="text-2xl" />
    },
    {
      title: "Optimization",
      description: "Performance tuning and documentation",
      icon: <FiCheck className="text-2xl" />
    }
  ];

  return (
    
    <div className={`min-h-screen bg-${colors.background} text-${colors.textPrimary}`}>
      <Navbar />
      {/* Background Pattern */}

      <div className="fixed inset-0 -z-10 opacity-10 dark:opacity-5">
        <img 
          src={imageUrls.backgroundPattern} 
          alt="Background pattern" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <Navbar />
  
      
      {/* Banner Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-xl overflow-hidden shadow-xl h-[350px] max-w-6xl mx-auto`}>
            <div className="relative h-full w-full">
              <img 
                src={imageUrls.banner} 
                alt="Data Migration Services" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
                <div className="px-10">
                  <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      Modern Data Migration <span className="text-amber-300">Solutions</span>
                    </h1>
                    <p className="text-lg text-white/90 mb-6">
                      Seamless, secure data transfer with zero downtime and maximum efficiency
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={handleOpenPopup}
                        className={`px-6 py-3 bg-${colors.primary} hover:bg-${colors.primaryLight} text-white rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-1`}
                      >
                        Get Started Today
                      </button>
                      <button 
                        onClick={downloadBrochure}
                        className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium transition-all"
                      >
                        Download Brochure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Paragraph Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-${colors.background}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Enterprise-Grade Data Migration</h2>
            <p className={`text-lg leading-relaxed text-${colors.textSecondary} max-w-3xl mx-auto`}>
              At DataRhino, we specialize in cutting-edge data migration solutions that minimize risk and maximize efficiency. Our certified migration experts employ proven methodologies to ensure your data is transferred accurately, securely, and with minimal disruption.
            </p>
          </div>
        </div>
      </section>

      {/* Three Tab Services Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-${colors.background} to-${theme === 'dark' ? 'stone-800' : 'stone-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Data Migration Services</h2>
            <p className={`text-xl text-${colors.textSecondary}`}>
              Comprehensive solutions tailored to your specific needs
            </p>
          </div>

          <div className="mb-8">
            <div className={`flex flex-col sm:flex-row justify-center border-b border-${colors.border}`}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-8 py-4 text-lg font-medium flex items-center justify-center space-x-2 transition-all ${activeTab === index ? 
                    `border-b-2 border-${colors.primary} text-${colors.primary} font-semibold` : 
                    `text-${colors.textSecondary} hover:text-${colors.textPrimary}`}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.icon}
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`p-8 rounded-xl bg-${colors.card} shadow-lg border border-${colors.border}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`rounded-xl overflow-hidden border border-${colors.border} shadow-md`}>
                <img 
                  src={tabs[activeTab].image} 
                  alt={tabs[activeTab].title} 
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">{tabs[activeTab].title}</h3>
                <p className={`text-lg text-${colors.textSecondary} mb-6`}>
                  {tabs[activeTab].content}
                </p>
                <ul className={`space-y-3 mb-8 text-${colors.textSecondary}`}>
                  {[
                    "End-to-end project management",
                    "Data validation and reconciliation",
                    "Minimal business disruption",
                    "Post-migration support",
                    "Security and compliance certified"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`bg-${colors.primary}/10 rounded-full p-1 mr-3`}>
                        <FiCheck className={`text-${colors.primary}`} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleOpenPopup}
                  className={`bg-${colors.primary} hover:bg-${colors.primaryLight} text-white px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-1`}
                >
                  Get a Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-${theme === 'dark' ? 'stone-800' : 'white'} to-${theme === 'dark' ? 'stone-900' : 'stone-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Data Migration Process</h2>
            <p className={`text-xl text-${colors.textSecondary}`}>
              A structured approach to ensure migration success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <div className={`h-full p-8 rounded-xl bg-${colors.card} border border-${colors.border} shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2 group-hover:border-${colors.primary}`}>
                  <div className={`w-14 h-14 rounded-full bg-${colors.primary}/10 flex items-center justify-center mb-6`}>
                    {React.cloneElement(step.icon, { className: `text-2xl text-${colors.primary}` })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className={`text-${colors.textSecondary}`}>{step.description}</p>
                  <div className={`mt-6 text-${colors.primary} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <FiArrowRight className="text-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-${theme === 'dark' ? 'stone-800' : 'stone-100'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See Our Data Migration in Action</h2>
            <p className={`text-xl text-${colors.textSecondary}`}>
              Watch how we helped a client migrate 10TB of data with zero downtime
            </p>
          </div>
          
          <div className={`aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border-4 border-${theme === 'dark' ? 'stone-700' : 'white'}`}>
            <img 
              src={imageUrls.videoThumbnail} 
              alt="Data Migration Video Thumbnail" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className={`w-20 h-20 bg-${colors.primary} hover:bg-${colors.primaryLight} rounded-full flex items-center justify-center text-white shadow-xl transform transition hover:scale-110`}
                aria-label="Play video"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className={`p-10 rounded-2xl bg-${colors.card} shadow-xl border border-${colors.border}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Start Your Data Migration Project</h2>
                <p className={`text-lg mb-6 text-${colors.textSecondary}`}>
                  Get a free consultation with our migration experts. Fill out the form and we'll get back to you within 24 hours.
                </p>
                <div className={`p-6 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} mb-6`}>
                  <h3 className="font-semibold mb-3">Why choose DataRhino?</h3>
                  <ul className={`space-y-2 text-${colors.textSecondary}`}>
                    {[
                      "Certified migration specialists",
                      "Proven methodology",
                      "24/7 support",
                      "99.9% success rate",
                      "Competitive pricing"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className={`text-${colors.primary} mt-1 mr-2 flex-shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={downloadBrochure}
                  className={`flex items-center text-${colors.primary} hover:text-${colors.primaryLight} font-medium`}
                >
                  <FiDownload className="mr-2" />
                  Download Full Service Brochure
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Full Name" 
                      className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent focus:border-${colors.primary}`} 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Email Address" 
                      className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent focus:border-${colors.primary}`} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="Phone Number" 
                      className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent focus:border-${colors.primary}`} 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      placeholder="Company Name" 
                      className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent focus:border-${colors.primary}`} 
                    />
                  </div>
                </div>
                
                <div>
                  <select 
                    name="service" 
                    value={formData.service} 
                    onChange={handleChange} 
                    className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent focus:border-${colors.primary}`}
                    aria-label="Select service"
                  >
                    <option value="Data Migration">Data Migration Service</option>
                    <option value="Database Migration">Database Migration</option>
                    <option value="Cloud Migration">Cloud Migration</option>
                    <option value="Application Migration">Application Migration</option>
                  </select>
                </div>
                
                <div>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tell us about your migration needs (data volume, current systems, timeline, etc.)" 
                    rows={5}
                    className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent focus:border-${colors.primary}`} 
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button 
                    type="submit" 
                    className={`w-full sm:w-auto bg-${colors.primary} hover:bg-${colors.primaryLight} text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50 transition-all hover:shadow-lg hover:-translate-y-1`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Request Consultation"}
                  </button>
                  <p className={`text-sm text-${colors.textSecondary} text-center sm:text-left`}>
                    We respect your privacy. Your information will never be shared.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer 
        privacyPolicy="/privacy-policy"
        dataPolicy="/data-policy"
        termsConditions="/terms-conditions"
      />

      {/* Consultation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl bg-${colors.card} text-${colors.textPrimary} max-h-[90vh] overflow-y-auto`}>
            <button 
              onClick={handleClosePopup} 
              className="absolute top-4 right-4 text-2xl font-bold hover:opacity-70 transition-opacity"
              type="button"
              aria-label="Close popup"
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Request Data Migration Consultation</h3>
              <p className={`text-${colors.textSecondary}`}>
                Fill out the form and we'll contact you within 24 hours
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Full Name" 
                className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent`} 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent`} 
                required 
              />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent`} 
                required 
              />
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your migration project" 
                rows={3}
                className={`w-full p-3 rounded-lg bg-${theme === 'dark' ? 'stone-700' : 'stone-50'} text-${colors.textPrimary} focus:outline-none focus:ring-2 focus:ring-${colors.primary} border border-transparent`} 
              ></textarea>
              <button 
                type="submit" 
                className={`w-full bg-${colors.primary} hover:bg-${colors.primaryLight} text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-all hover:shadow-lg`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMigration;