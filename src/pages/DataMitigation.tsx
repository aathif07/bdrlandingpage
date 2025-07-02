
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FiCheck, FiDatabase, FiShield, FiBarChart2, FiServer, FiGlobe } from 'react-icons/fi';

// Define TypeScript interface for form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const DataMigration = () => {
  const { theme } = useTheme();
  
  // Initialize Apollo tracking
  useApolloTracking();
  
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Placeholder for API call
      // await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) });
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', phone: '', company: '', service: 'Data Migration', message: '' });
      setShowPopup(false);
      alert('Thank you for your submission! We will contact you shortly.');
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadBrochure = () => {
    const brochureUrl = '/pdf/Big Data Rhino-Data Migration Solutions.pdf';
    try {
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.download = 'Big Data Rhino-Data Migration Solutions.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Brochure download initiated');
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download brochure. Please check the file path or try again later.');
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-700' : 'bg-white'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={`relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[500px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-[95%] mx-auto w-full flex flex-col items-center">
          <div className="relative mb-10 w-full max-w-5xl flex justify-center">
            <div className={`rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} aspect-[21/9] max-h-[400px] w-full`}>
               <img 
                src="/datamitigation.png" 
                alt="Methane Solutions Dashboard" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="space-y-6 text-center max-w-7xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Data <span className="text-yellow-500">Migration</span> Services
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mx-auto`}>
              Seamlessly transfer your data between systems with minimal downtime and maximum security. Our certified experts ensure your migration is smooth, efficient, and risk-free.
            </p>
          </div>
        </div>
      </section>

      {/* About Big Data Rhino Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Our Approach</h3>
              <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start">
                  <FiShield className="text-gray-700 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Military-grade precision in data handling</span>
                </li>
                <li className="flex items-start">
                  <FiDatabase className="text-gray-700 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Cutting-edge AI and machine learning</span>
                </li>
                <li className="flex items-start">
                  <FiGlobe className="text-gray-700 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Industry-specific expertise</span>
                </li>
                <li className="flex items-start">
                  <FiBarChart2 className="text-gray-700 dark:text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Actionable business insights</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Our Capabilities</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🤖", text: "AI Solutions" },
                  { icon: "🔮", text: "Predictive Analytics" },
                  { icon: "📊", text: "Data Visualization" },
                  { icon: "☁️", text: "Cloud Integration" },
                  { icon: "🔌", text: "API Development" },
                  { icon: "🛡️", text: "Security Compliance" }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-sm`}>
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Industry Impact</h3>
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
                  <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-sm`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{item.industry}</h4>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                    <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{item.stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-lg mb-16`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Our Team Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  We combine technical excellence with unique perspectives to deliver innovative solutions:
                </p>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <FiCheck className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    <span>PhD-level data scientists</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Veterans with military discipline</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Industry domain experts</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Creative problem-solvers</span>
                  </li>
                </ul>
              </div>
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-100 border-gray-200'} italic border-l-4`}>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  "The best solutions emerge when unique perspectives meet deep technical expertise."
                </p>
                <p className={` ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our culture emphasizes continuous learning, collaboration, and shared success.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Our Commitment to Clients</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🔍", title: "Transparency", description: "Clear communication throughout" },
                { icon: "📈", title: "Results", description: "Measurable business outcomes" },
                { icon: "🛡️", title: "Security", description: "Enterprise-grade protection" },
                { icon: "🤝", title: "Partnership", description: "Long-term collaboration" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{item.title}</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
                icon: <FiDatabase className="text-3xl text-yellow-500" />,
                title: "Database Migration",
                description: "Seamless transfer of databases between platforms with zero downtime and complete data integrity."
              },
              {
                icon: <FiGlobe className="text-3xl text-yellow-500" />,
                title: "Cloud Migration",
                description: "Secure movement of data and applications to cloud platforms with optimized architectures."
              },
              {
                icon: <FiServer className="text-3xl text-yellow-500" />,
                title: "Application Migration",
                description: "Modernization of applications while ensuring data compatibility during platform transitions."
              }
            ].map((service, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 mx-auto">
                  {service.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div  className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Data Migration Process</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              A proven methodology for successful data migration projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FiBarChart2 className="text-3xl text-yellow-500" />,
                title: "Assessment",
                description: "We analyze your current data landscape and requirements"
              },
              {
                icon: <FiServer className="text-3xl text-yellow-500" />,
                title: "Planning",
                description: "Detailed migration strategy and risk mitigation plan"
              },
              {
                icon: <FiDatabase className="text-3xl text-yellow-500" />,
                title: "Execution",
                description: "Phased migration with continuous validation"
              },
              {
                icon: <FiCheck className="text-3xl text-yellow-500" />,
                title: "Validation",
                description: "Comprehensive testing and performance tuning"
              }
            ].map((step, index) => (
              <div key={index} className="group">
                <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2`}>
                  <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-1 bg-yellow-500 mx-auto mb-4"></div>
                    <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{step.title}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
                      <FiCheck className="text-yellow-500 text-xl" />
                    </div>
                    <p className={`ml-3 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Contact Us</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Full Name" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                  required 
                />
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Phone Number" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                  required 
                />
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Company Name" 
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                />
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Tell us about your migration needs" 
                  rows={4}
                  className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                />
                <button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Consultation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 p-4">
          <div className={`relative w-full max-w-lg p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'} border max-h-[90vh] overflow-y-auto`}>
            <button 
              onClick={handleClosePopup} 
              className={`absolute top-3 right-4 text-xl font-bold hover:opacity-70 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}
              type="button"
            >
              ×
            </button>
            <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Request Consultation</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Full Name" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required 
              />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required 
              />
              <input 
                type="text" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                placeholder="Company Name" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
              />
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your project" 
                rows={3}
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
              />
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
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