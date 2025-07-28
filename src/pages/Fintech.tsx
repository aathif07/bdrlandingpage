import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
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
  // Initialize Apollo tracking
  useApolloTracking();
  
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

  // Image URLs using public links
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
    setDownloadText('Downloading...');
    
    try {
      const link = document.createElement('a');
      link.href = imageUrls.fintechBrochure;
      link.download = 'Fintech_Solutions_Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Fintech brochure download initiated');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or contact support@bigdatarhino.com');
    } finally {
      setTimeout(() => setDownloadText('Download Brochure'), 2000);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-green-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Innovative <br />
                Fintech Solutions <br />
                <span className="text-green-600">for Your Business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empower your financial operations with cutting-edge technology, ensuring efficiency, security, and scalability.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2">
                <span>Explore Solutions</span>
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
                  <img 
                    src="/fintechdashboard.png" 
                    alt="Fintech Dashboard"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-gray-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">About Big Data Rhino</h2>
            <p className="text-lg mt-4 text-gray-600">
              Transforming Complex Data into Strategic Solutions with AI, Analytics, and Veteran Precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in February 2022 by Patrick Parks, a Reconnaissance Marine veteran, Big Data Rhino fuses military discipline with advanced data science. We deliver clarity, speed, and actionable intelligence to businesses through precision analytics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From a veteran-owned startup to an industry ally, our journey is about trust, transformation, and excellence.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200">
              <img
                src={imageUrls.workflow}
                alt="Big Data Rhino Workflow"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {/* Approach */}
            <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl border">
              <h3 className="text-xl font-bold mb-5 text-blue-600">Our Approach</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start"><span className="text-blue-500 mr-3">🛡️</span> Military-grade data precision</li>
                <li className="flex items-start"><span className="text-blue-500 mr-3">🧠</span> AI + Machine Learning expertise</li>
                <li className="flex items-start"><span className="text-blue-500 mr-3">🌐</span> Deep industry knowledge</li>
                <li className="flex items-start"><span className="text-blue-500 mr-3">📈</span> Real-time actionable insights</li>
              </ul>
            </div>

            {/* Capabilities */}
            <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl border">
              <h3 className="text-xl font-bold mb-5 text-blue-600">Our Capabilities</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🤖", text: "AI Solutions" },
                  { icon: "📊", text: "Data Visualization" },
                  { icon: "🔮", text: "Predictive Analytics" },
                  { icon: "☁️", text: "Cloud Integration" },
                  { icon: "🔌", text: "API Engineering" },
                  { icon: "🛡️", text: "Security Compliance" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-100 rounded-xl">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl border">
              <h3 className="text-xl font-bold mb-5 text-blue-600">Industry Impact</h3>
              {[
                {
                  industry: "Energy Sector",
                  description: "Cutting emissions with smarter data workflows",
                  stat: "↑ 30% Efficiency",
                },
                {
                  industry: "Healthcare",
                  description: "Predictive insights for proactive care",
                  stat: "Improved Diagnostics",
                },
                {
                  industry: "Government",
                  description: "DVBE-certified data protection & intelligence",
                  stat: "Trusted Compliance",
                },
              ].map((item, index) => (
                <div key={index} className="mb-5">
                  <h4 className="font-semibold text-lg text-gray-800">{item.industry}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-blue-500 font-medium">{item.stat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl border mb-20">
            <h3 className="text-xl font-bold mb-6 text-center text-blue-600">Our Team Culture</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-700 mb-4">
                  We combine elite talent, discipline, and innovation:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔️</span> PhD-level data scientists</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔️</span> Military veterans with discipline</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔️</span> Industry domain experts</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔️</span> Creative problem-solvers</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-gray-100 italic border-l-4 border-blue-600">
                <p className="mb-4 text-gray-700">
                  "The best solutions emerge when unique perspectives merge with deep technical understanding."
                </p>
                <p className="text-gray-500">
                  We value learning, collaboration, and long-term vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Financial Operations</h2>
              <div className="space-y-4 text-lg">
                <p className="text-gray-600">
                  Our fintech solutions are designed to help financial institutions navigate the digital transformation landscape with confidence. We combine cutting-edge technology with deep financial expertise to deliver solutions that drive growth and efficiency.
                </p>
                <p className="text-gray-600">
                  From digital banking platforms to risk management systems, our solutions are scalable, secure, and tailored to meet the unique needs of your organization.
                </p>
                <p className="text-gray-600">
                  With over a decade of experience in financial technology, we've helped hundreds of institutions modernize their operations and stay competitive in an increasingly digital world.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">How Our Fintech Solutions Work</h2>
            <p className="text-lg md:text-xl mt-4 text-gray-700 max-w-3xl mx-auto">
              A simple three-step process to transform your financial services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Assessment & Planning",
                description: "We analyze your current systems and identify areas for improvement and digital transformation.",
                icon: "1",
                bgColor: 'bg-green-600'
              },
              {
                title: "Solution Implementation",
                description: "Our team deploys customized fintech solutions tailored to your specific needs.",
                icon: "2",
                bgColor: 'bg-orange-500'
              },
              {
                title: "Ongoing Support",
                description: "We provide continuous support and updates to ensure your systems remain cutting-edge.",
                icon: "3",
                bgColor: 'bg-green-600'
              }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl shadow-lg bg-white text-gray-800">
                <div className={`w-14 h-14 rounded-full ${item.bgColor} flex items-center justify-center mb-6 text-white font-bold text-2xl`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Fintech Solutions</h2>
            <p className="text-lg md:text-xl mt-4 text-gray-700 max-w-3xl mx-auto">
              Comprehensive solutions designed to address every aspect of modern financial services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Digital Payments",
                description: "Secure and scalable digital payment solutions for any business",
                icon: <FiCreditCard className="text-3xl text-white" />,
                bgColor: 'bg-green-600'
              },
              {
                title: "Risk Analytics",
                description: "Advanced analytics for fraud detection and risk assessment",
                icon: <FiShield className="text-3xl text-white" />,
                bgColor: 'bg-orange-500'
              },
              {
                title: "Wealth Management",
                description: "AI-driven investment and wealth management platforms",
                icon: <FiTrendingUp className="text-3xl text-white" />,
                bgColor: 'bg-green-600'
              },
              {
                title: "RegTech",
                description: "Compliance solutions for financial regulations",
                icon: <FiCheck className="text-3xl text-white" />,
                bgColor: 'bg-orange-500'
              }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl shadow-lg bg-white text-gray-800">
                <div className={`w-14 h-14 rounded-full ${item.bgColor} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Started with Your Fintech Solution
            </h2>
            <p className="text-xl text-gray-600">
              Contact us today to explore tailored fintech services and receive a personalized consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Services?</h2>
              <p className="text-lg mb-6 text-gray-600">
                Fill out the form to schedule a consultation with our fintech experts. We'll discuss your needs and show you how our solutions can help your business grow.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2 text-xl" />
                  <span className="text-gray-700">No obligation consultation</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2 text-xl" />
                  <span className="text-gray-700">Customized solutions</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2 text-xl" />
                  <span className="text-gray-700">24/7 support</span>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-xl shadow-lg bg-white border border-gray-200">
              <h3 className="text-2xl font-semibold mb-6">Request Information</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                />
                <select 
                  className="w-full p-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full p-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
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
          <div className="relative w-full max-w-lg p-8 rounded-2xl shadow-lg bg-white text-gray-900 max-h-[90vh] overflow-y-auto border border-gray-200">
            <button 
              onClick={handleClosePopup} 
              className="absolute top-3 right-4 text-xl font-bold hover:opacity-70 text-yellow-500"
              type="button"
            >
              ×
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
                className="w-full p-3 rounded border border-gray-300 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full p-3 rounded border border-gray-300 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required
              />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className="w-full p-3 rounded border border-gray-300 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required 
              />
              <input 
                type="datetime-local" 
                name="datetime" 
                value={formData.datetime} 
                onChange={handleChange} 
                className="w-full p-3 rounded border border-gray-300 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                required 
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={3}
                className="w-full p-3 rounded border border-gray-300 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
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