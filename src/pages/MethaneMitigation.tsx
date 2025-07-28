import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApolloTracking } from '../hooks/useApolloTracking';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { 
  FiZap, 
  FiArrowRight, 
  FiCheck, 
  FiDownload, 
  FiPlay, 
  FiBarChart2, 
  FiShield, 
  FiTrendingDown, 
  FiDatabase, 
  FiGlobe, 
  FiX 
} from 'react-icons/fi';
import { FaSatellite, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Achievement {
  icon: string;
  title: string;
  desc: string;
}

const MethaneMitigation = () => {
  // Initialize Apollo tracking
  useApolloTracking();

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Methane Mitigation',
  });

  // Image URLs
  const imageUrls = {
    logo: 'https://via.placeholder.com/150x50?text=Your+Logo',
    banner: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    videoThumbnail: 'https://images.unsplash.com/photo-1574717024453-354a7d62faf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    mitigation: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    workflow: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
  };

  // Define methaneMitigation object
  const methaneMitigation = {
    title: 'Methane Mitigation',
    icon: <FaSatellite className="text-4xl text-yellow-500" />,
    highlights: [
      'Real-time emission tracking',
      'Automated leak detection',
      'Advanced sensor networks',
      'Satellite data integration',
      'Leak repair prioritization',
      'Operational optimization',
    ],
    image: imageUrls.mitigation,
  };

  const processSteps: ProcessStep[] = [
    {
      title: 'Initial Assessment',
      description: 'We conduct a comprehensive analysis of your current methane emissions using advanced detection technologies.',
      icon: <FaChartLine className="text-3xl text-yellow-500" />,
    },
    {
      title: 'Solution Deployment',
      description: 'Our team implements tailored monitoring systems and reduction strategies specific to your operations.',
      icon: <FiBarChart2 className="text-3xl text-yellow-500" />,
    },
    {
      title: 'Continuous Optimization',
      description: 'Ongoing data analysis and system adjustments ensure maximum efficiency and compliance.',
      icon: <FiShield className="text-3xl text-yellow-500" />,
    },
  ];

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const handleVideoOpen = () => setShowVideo(true);
  const handleVideoClose = () => setShowVideo(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Your request has been submitted!');
      setShowPopup(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Methane Mitigation',
      });
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Brochure download handler
  const handleDownloadBrochure = () => {
    toast.success('Brochure download started!');
  };

  // Particles init function to match expected type
  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
  };

  const achievements = [
    'Successfully reduced methane emissions for over 50 clients.',
    'Recognized by the Environmental Protection Agency for innovation in methane monitoring.',
    'Contributed to a 30% average reduction in methane leaks for our clients.',
  ];

  const coreValues: Achievement[] = [
    { icon: '💡', title: 'Innovation', desc: 'Pioneering advanced detection and mitigation technologies.' },
    { icon: '🛡', title: 'Integrity', desc: 'Committed to transparent and ethical environmental practices.' },
    { icon: '🏆', title: 'Excellence', desc: 'Delivering measurable and impactful emission reductions.' },
    { icon: '🤝', title: 'Collaboration', desc: 'Working hand-in-hand with clients for tailored solutions.' },
    { icon: '🌱', title: 'Sustainability', desc: 'Dedicated to creating long-term environmental benefits.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Methane Mitigation Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Advanced Methane <br />
                Mitigation Solutions <br />
                <span className="text-orange-600">for a Sustainable Future</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Reduce emissions with cutting-edge detection and capture technologies, ensuring regulatory compliance and environmental stewardship.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleOpenPopup}
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg text-lg transition-colors"
                >
                  Request Demo
                </button>
                <button
                  onClick={handleVideoOpen}
                  className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-lg border border-gray-300 text-lg transition-colors"
                >
                  <FiPlay className="text-yellow-500" />
                  Watch Video
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
                  <img
                    src={imageUrls.mitigation}
                    alt="Methane mitigation technology"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="absolute inset-0 -z-10 opacity-50">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 20, density: { enable: true, value_area: 1000 } },
                color: { value: ['#F59E0B', '#059669', '#B91C1C'] },
                shape: { type: 'circle' },
                opacity: { value: 0.2, random: true },
                size: { value: 4, random: true },
                move: {
                  enable: true,
                  speed: 0.8,
                  direction: 'none',
                  random: true,
                  out_mode: 'out',
                },
              },
              interactivity: {
                events: { onhover: { enable: false }, onclick: { enable: false } },
              },
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900">
              About Our Big Data Rhino
            </h2>
            <p className="w-full text-xl leading-relaxed text-balance text-gray-700">
              Big Data Rhino, founded in February 2022 by Patrick Parks, a Reconnaissance Marine veteran, is a veteran-owned company focused on delivering precision data solutions for strategic decision-making. We combine military discipline with advanced data science to provide actionable business insights.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="p-6 rounded-2xl shadow-lg bg-white border border-yellow-400">
                  <span
                    className={`text-4xl mb-4 inline-block ${
                      index % 3 === 0 ? 'text-yellow-400' : index % 3 === 1 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {value.icon}
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h4>
                  <p className="text-base leading-relaxed text-balance text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Achievements</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-yellow-400"
                >
                  <div className="mt-1 flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        index % 3 === 0 ? 'bg-yellow-500/20' : index % 3 === 1 ? 'bg-green-500/20' : 'bg-red-500/20'
                      } flex items-center justify-center`}
                    >
                      <FiCheck
                        className={`${
                          index % 3 === 0 ? 'text-yellow-500' : index % 3 === 1 ? 'text-green-500' : 'text-red-500'
                        } text-lg`}
                      />
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-balance text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methane Mitigation Solutions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800 tracking-tight">
              Methane Mitigation Solutions
            </h2>
            <p className="text-lg md:text-xl text-blue-600 max-w-3xl mx-auto">
              Comprehensive services to detect, measure, and mitigate methane emissions with cutting-edge technology.
            </p>
          </div>

          <div className="bg-violet-500 rounded-2xl shadow-lg p-8 md:p-10 border border-blue-100 transition-all duration-300">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <FiZap className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Methane Mitigation Services</h3>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {methaneMitigation.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <FiCheck className="text-blue-600 text-sm" />
                      </div>
                    </div>
                    <span className="text-base text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Proven Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A systematic approach to effective methane management</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

            <div className="space-y-16 lg:space-y-0">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative lg:flex items-center gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="p-8 rounded-2xl shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-blue-500/10">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-16 h-16 rounded-full bg-blue-500 text-white items-center justify-center text-2xl font-bold z-10">
                    {index + 1}
                  </div>
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Reduce Your Methane Emissions?</h2>
              <p className="text-xl text-gray-600">Our experts will help you implement the most effective solutions for your operations.</p>

              <div className="space-y-4">
                {[
                  'Customized monitoring solutions',
                  'Regulatory compliance assurance',
                  'Proven reduction strategies',
                  '24/7 technical support',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <FiCheck className="text-yellow-500 text-xs" />
                      </div>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Request Information</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-gray-600">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-600">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-gray-600">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-600">Company*</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-600">Service Interest*</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="Methane Mitigation">Methane Mitigation</option>
                    <option value="Emission Monitoring">Emission Monitoring</option>
                    <option value="Compliance Consulting">Compliance Consulting</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg text-lg transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Get Expert Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 text-white text-2xl hover:opacity-70 transition-opacity z-10"
            >
              <FiX className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-xl">Video Player Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Request Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white border border-gray-200">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-2xl hover:opacity-70 transition-opacity text-gray-500"
            >
              <FiX />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <FiDownload className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Schedule a Consultation</h3>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 font-medium text-gray-600">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Service Interest*</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="Methane Mitigation">Methane Mitigation</option>
                  <option value="Emission Monitoring">Emission Monitoring</option>
                  <option value="Compliance Consulting">Compliance Consulting</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg text-lg transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Now'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethaneMitigation;