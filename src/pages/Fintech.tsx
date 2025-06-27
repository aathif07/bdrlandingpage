import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { FiArrowRight, FiCheck, FiDollarSign, FiShield, FiCreditCard, FiPieChart, FiTrendingUp, FiDownload, FiPlay } from 'react-icons/fi';
import phoneIcon from '../../public/phone icon.png';

const Fintech = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [isCallbackActive, setIsCallbackActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: ''
  });

  // Image URLs using public links
  const imageUrls = {
    logo: 'https://via.placeholder.com/150x50?text=BigDataRhino',
    fintechDashboard: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
    mobilePayments: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    howItWorks: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    team: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
  };

  useEffect(() => {
    document.title = "Fintech Solutions | Big Data Rhino";
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleOpenPopup = () => {
    setShowPopup(true);
    setIsCallbackActive(true);
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
      setFormData({ name: '', email: '', phone: '', datetime: '' });
      setShowPopup(false);
      setIsCallbackActive(false);
      setIsSubmitting(false);
      alert('Your request has been submitted successfully!');
    }, 1500);
  };

  const downloadBrochure = () => {
    // In a real app, this would link to your actual brochure PDF
    alert('Downloading brochure...');
    // window.open('/brochures/fintech-brochure.pdf', '_blank');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      
      {/* Hero Banner Section - Updated with no background color */}
<section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Revolutionize Your Financial Services
        </h1>
        <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Big Data Rhino's fintech solutions leverage AI, blockchain, and big data analytics to transform financial operations, reduce risks, and enhance customer experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/contact" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-center flex items-center justify-center"
          >
            Get Started <FiArrowRight className="ml-2" />
          </Link>
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
            src={imageUrls.fintechDashboard} 
            alt="Fintech Dashboard" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white/90 hover:bg-white text-indigo-600 rounded-full p-4 shadow-lg transform transition hover:scale-110">
              <FiPlay className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Introduction Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Financial Operations</h2>
              <div className="space-y-4 text-lg">
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our fintech solutions are designed to help financial institutions navigate the digital transformation landscape with confidence. We combine cutting-edge technology with deep financial expertise to deliver solutions that drive growth and efficiency.
                </p>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  From digital banking platforms to risk management systems, our solutions are scalable, secure, and tailored to meet the unique needs of your organization.
                </p>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  With over a decade of experience in financial technology, we've helped hundreds of institutions modernize their operations and stay competitive in an increasingly digital world.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className={`rounded-xl overflow-hidden shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <img 
                  src={imageUrls.team} 
                  alt="Financial Team" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Fintech Solutions Work</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              A simple three-step process to transform your financial services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Assessment & Planning",
                description: "We analyze your current systems and identify areas for improvement and digital transformation.",
                icon: "1"
              },
              {
                title: "Solution Implementation",
                description: "Our team deploys customized fintech solutions tailored to your specific needs.",
                icon: "2"
              },
              {
                title: "Ongoing Support",
                description: "We provide continuous support and updates to ensure your systems remain cutting-edge.",
                icon: "3"
              }
            ].map((item, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-300 text-xl font-bold">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* YouTube Video Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Data Migration in Action</h2>
      <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
        Watch how we helped a Fortune 500 company migrate 10TB of data with zero downtime
      </p>
    </div>
    
    {/* YouTube Video Embed */}
    <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video max-w-4xl mx-auto">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=0&rel=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
    
    {/* Video info section */}
    <div className="max-w-4xl mx-auto mt-4">
      <h3 className="text-xl font-bold">How We Migrated 10TB with Zero Downtime</h3>
      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span>1,234 views</span>
        <span className="mx-2">•</span>
        <span>2 weeks ago</span>
      </div>
    </div>
  </div>
</section>

      {/* Our Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fintech Solutions</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Comprehensive solutions designed to address every aspect of modern financial services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Digital Payments",
                description: "Secure and scalable digital payment solutions for any business",
                icon: <FiCreditCard className="text-3xl text-indigo-600" />
              },
              {
                title: "Risk Analytics",
                description: "Advanced analytics for fraud detection and risk assessment",
                icon: <FiShield className="text-3xl text-indigo-600" />
              },
              {
                title: "Wealth Management",
                description: "AI-driven investment and wealth management platforms",
                icon: <FiTrendingUp className="text-3xl text-indigo-600" />
              },
              {
                title: "RegTech",
                description: "Compliance solutions for financial regulations",
                icon: <FiCheck className="text-3xl text-indigo-600" />
              }
            ].map((item, index) => (
              <div key={index} className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Services?</h2>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Fill out the form to schedule a consultation with our fintech experts. We'll discuss your needs and show you how our solutions can help your business grow.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2 text-xl" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No obligation consultation</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2 text-xl" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customized solutions</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2 text-xl" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>24/7 support</span>
                </div>
              </div>
            </div>
            <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-2xl font-semibold mb-6">Request Information</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <select 
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Service of Interest</option>
                  <option value="payments">Digital Payments</option>
                  <option value="risk">Risk Analytics</option>
                  <option value="wealth">Wealth Management</option>
                  <option value="regtech">RegTech Solutions</option>
                </select>
                <textarea 
                  placeholder="Tell us about your needs" 
                 rows={4}
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
                >
                  Request Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Callback Form Popup */}
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
            <div className="flex items-center mb-6">
              <img src={phoneIcon} alt="Phone" className="w-10 h-10 mr-3" />
              <h3 className="text-2xl font-semibold">Set Up Callback</h3>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none" 
                required 
              />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none" 
                required 
              />
              <input 
                type="datetime-local" 
                name="datetime" 
                value={formData.datetime} 
                onChange={handleChange} 
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none" 
                required 
              />
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fintech;