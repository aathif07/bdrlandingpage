import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { FiArrowRight, FiCheck, FiDatabase, FiShield, FiClock, FiBarChart2, FiServer, FiGlobe, FiDownload } from 'react-icons/fi';

const DataMigration = () => {
  const { theme } = useTheme();
  
  // Initialize Apollo tracking
  useApolloTracking();
  
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Data Migration',
    message: ''
  });

  // Image URLs
  const imageUrls = {
    dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    dataFlow: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    security: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    workflow: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80'
  };

  useEffect(() => {
    document.title = "Data Migration Services | Big Data Rhino";
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
    // Public PDF link for the brochure
    const brochureUrl = '/pdf/Big Data Rhino-Data Migration Solutions.pdf';
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = '/pdf/Big Data Rhino-Data Migration Solutions.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Track download event
    console.log('Brochure download initiated');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Navbar />
      
      {/* Banner Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Data <span className="text-indigo-600">Migration</span> Services
              </h1>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Seamlessly transfer your data between systems with minimal downtime and maximum security. Our certified experts ensure your migration is smooth, efficient, and risk-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleOpenPopup}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center"
                >
                  Get Started <FiArrowRight className="ml-2" />
                </button>
                <button 
                  onClick={downloadBrochure}
                  className={`border-2 border-indigo-600 ${theme === 'dark' ? 'text-indigo-400 border-indigo-400 hover:bg-indigo-900/20' : 'text-indigo-600 hover:bg-indigo-50'} px-8 py-4 rounded-lg font-semibold flex items-center justify-center`}
                >
                  <FiDownload className="mr-2" />
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="relative">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} aspect-video`}>
                <img 
                  src={imageUrls.dashboard} 
                  alt="Data Migration Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Data Migration Solutions</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Comprehensive services to meet all your data migration needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiDatabase className="text-3xl text-indigo-600" />,
                title: "Database Migration",
                description: "Seamless transfer of databases between platforms with zero downtime and complete data integrity."
              },
              {
                icon: <FiGlobe className="text-3xl text-indigo-600" />,
                title: "Cloud Migration",
                description: "Secure movement of data and applications to cloud platforms with optimized architectures."
              },
              {
                icon: <FiServer className="text-3xl text-indigo-600" />,
                title: "Application Migration",
                description: "Modernization of applications while ensuring data compatibility during platform transitions."
              }
            ].map((service, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6 mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-center`}>{service.description}</p>
                <button 
                  onClick={handleOpenPopup}
                  className="mt-6 mx-auto block text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Data Migration Process</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              A proven methodology for successful data migration projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FiBarChart2 className="text-3xl text-indigo-600" />,
                title: "Assessment",
                description: "We analyze your current data landscape and requirements"
              },
              {
                icon: <FiServer className="text-3xl text-indigo-600" />,
                title: "Planning",
                description: "Detailed migration strategy and risk mitigation plan"
              },
              {
                icon: <FiDatabase className="text-3xl text-indigo-600" />,
                title: "Execution",
                description: "Phased migration with continuous validation"
              },
              {
                icon: <FiCheck className="text-3xl text-indigo-600" />,
                title: "Validation",
                description: "Comprehensive testing and performance tuning"
              }
            ].map((step, index) => (
              <div key={index} className="group">
                <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2`}>
                  <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6 mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-1 bg-indigo-600 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Without blue background */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Data Migration?</h2>
              <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Fill out the form and our migration specialist will contact you within 24 hours to discuss your project requirements.
              </p>
              <div className="space-y-6">
                {[
                  "Free initial consultation",
                  "No obligation quote",
                  "GDPR & HIPAA compliant processes"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FiCheck className="text-green-500 text-xl" />
                    </div>
                    <p className={`ml-3 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Full Name" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  required 
                />
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Phone Number" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  required 
                />
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Tell us about your migration needs" 
                  rows={4}
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
{/* About Big Data Rhino Section - Theme-based */}
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
            alt="Big Data Rhino Team" 
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

      {/* Consultation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className={`relative w-full max-w-lg p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} max-h-[90vh] overflow-y-auto`}>
            <button 
              onClick={handleClosePopup} 
              className="absolute top-3 right-4 text-xl font-bold hover:opacity-70"
              type="button"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-6">Request Consultation</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Full Name" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required 
              />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required 
              />
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your project" 
                rows={3}
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMigration;