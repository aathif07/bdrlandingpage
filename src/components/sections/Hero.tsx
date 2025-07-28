import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const tabs = [
    {
      title: "Data Mitigation",
      content: "Comprehensive data solutions to identify, analyze, and mitigate risks in your data infrastructure.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Fintech Solutions",
      content: "Innovative financial technology services to streamline your operations and enhance customer experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Methane Mitigation",
      content: "Cutting-edge environmental solutions to monitor and reduce methane emissions effectively.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "We discuss your needs and challenges to understand your requirements."
    },
    {
      step: 2,
      title: "Solution Design",
      description: "Our experts create a tailored solution blueprint for your business."
    },
    {
      step: 3,
      title: "Implementation",
      description: "We deploy the solution with minimal disruption to your operations."
    },
    {
      step: 4,
      title: "Ongoing Support",
      description: "Continuous monitoring and optimization to ensure peak performance."
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getAnimationClass = (delay: string) =>
    `transition-all duration-700 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-100/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Banner */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/logo.png" 
              alt="Big Data Rhino Logo" 
              className="h-16"
            />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-blue-900 rounded-xl p-8 mb-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Business with Advanced Data Solutions</h1>
            <p className="text-xl mb-6 max-w-3xl">Harness the power of AI and big data to drive growth, efficiency, and innovation across your organization.</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </button>
              <a 
                href="/brochure.pdf" 
                download
                className="flex items-center border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-900 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Brochure
              </a>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl">
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-w-16 aspect-h-9 bg-black">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/your-video-id" 
                  title="Big Data Rhino Demo" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Services Tabs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Services</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all ${activeTab === index ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {tab.icon}
                <span className="font-medium">{tab.title}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{tabs[activeTab].title}</h3>
            <p className="text-lg text-gray-600 mb-6">{tabs[activeTab].content}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map(item => (
                    <li key={item} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Feature {item} description for {tabs[activeTab].title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Request Information</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Service Interest</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      {tabs.map((tab, index) => (
                        <option key={index} value={tab.title}>{tab.title}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Solutions Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${getAnimationClass(`${index * 0.1}s`)}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16 bg-blue-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-lg shadow-sm ${getAnimationClass(`${index * 0.2}s`)}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`} 
                    alt={`Client ${item}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Client Name {item}</h4>
                    <p className="text-gray-500 text-sm">Position, Company</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Working with Big Data Rhino transformed our data infrastructure. Their team delivered exceptional results and provided ongoing support that helped us achieve our business goals."
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-900 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">Contact us today to discuss how our solutions can help you achieve your goals.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#contact" 
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
            >
              Get Started
            </a>
            <a 
              href="tel:+1234567890" 
              className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-900 transition"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Big Data Rhino</h3>
              <p className="text-gray-400">Innovative data solutions for the modern enterprise.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {tabs.map((tab, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition">{tab.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="/team" className="text-gray-400 hover:text-white transition">Our Team</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/data-policy" className="text-gray-400 hover:text-white transition">Data Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="/cookies" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Big Data Rhino. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Hero;