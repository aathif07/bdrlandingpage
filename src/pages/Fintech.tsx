import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InteractiveBackground from '../components/effects/InteractiveBackground';
import { 
  FiArrowRight, 
  FiCheck, 
  FiDollarSign, 
  FiShield, 
  FiCreditCard, 
  FiPieChart, 
  FiTrendingUp, 
  FiDownload, 
  FiPlay,
  FiDatabase,
  FiGlobe,
  FiBarChart2
} from 'react-icons/fi';
import phoneIcon from '../../public/phone icon.png';

const Fintech = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [isCallbackActive, setIsCallbackActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadText, setDownloadText] = useState('Download Brochure');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: '',
    message: ''
  });

  // Image URLs using public links - Added fintechBrochure PDF
  const imageUrls = {
    logo: 'https://via.placeholder.com/150x50?text=BigDataRhino',
    fintechDashboard: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
    mobilePayments: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    howItWorks: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    team: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    workflow: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    fintechBrochure: '/pdf/Mainframe Application Modernization (6).pdf' 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', datetime: '', message: '' });
      setShowPopup(false);
      setIsCallbackActive(false);
      setIsSubmitting(false);
      alert('Your request has been submitted successfully!');
    }, 1500);
  };

  const downloadBrochure = () => {
    // Change button text to show downloading state
    setDownloadText('Downloading...');
    
    try {
      // Create an invisible anchor element to trigger download
      const link = document.createElement('a');
      link.href = imageUrls.fintechBrochure;
      link.download = '/pdf/Mainframe Application Modernization (6).pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: Track download event
      console.log('Fintech brochure download initiated');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or contact support@bigdatarhino.com');
    } finally {
      // Reset button text after 2 seconds
      setTimeout(() => setDownloadText('Download Brochure'), 2000);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Navbar />
      
      {/* Hero Banner Section */}
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
                  aria-label="Download Fintech Solutions Brochure"
                >
                  <FiDownload className="mr-2" />
                  {downloadText}
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

      {/* Our Solutions Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8">
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
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={3}
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none"
              ></textarea>
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