import React, { useState } from 'react';
import { Database, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { FaSearch, FaClipboardList, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const DataMigrationServices = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const serviceFeatures = [
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Data Assessment",
      description: "Thorough analysis of your data landscape to identify risks and migration needs."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Secure Migration",
      description: "Implement robust encryption and security protocols during data transfer."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: "Compliance Assurance",
      description: "Ensure adherence to GDPR, CCPA, HIPAA, and other regulations."
    }
  ];
  
  const migrationFlow = [
    {
      title: "Discovery Phase",
      description: "We analyze your current data landscape and define migration goals and scope.",
      icon: <FaSearch />,
      color: "bg-orange-100 border-orange-300"
    },
    {
      title: "Planning Strategy",
      description: "Developing a detailed migration roadmap with timelines and resource allocation.",
      icon: <FaClipboardList />,
      color: "bg-green-100 border-green-300"
    },
    {
      title: "Secure Migration",
      description: "Implementing security protocols and encryption during data transfer.",
      icon: <FaShieldAlt />,
      color: "bg-orange-100 border-orange-300"
    },
    {
      title: "Validation & Testing",
      description: "Ensuring data integrity and functionality after migration is complete.",
      icon: <FaCheckCircle />,
      color: "bg-green-100 border-green-300"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Secure <br />
                Data Migration <br />
                <span className="text-blue-600">Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Seamlessly migrate your data with confidence, ensuring compliance, security, and minimal disruption.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2">
                <span>Start Migration</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
           <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"> 
        {/* Image container - replace with your actual public URL */}
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
          <img 
            src="/datamitigation.png" 
            alt="Migration Dashboard"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
        </div>
    </div>
        </div>
      </section>

      {/* Service Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Streamline Your Data Migration with <br />
              Expert Services
            </h2>
            <p className="text-xl text-gray-600">
              Our comprehensive approach ensures secure, compliant, and efficient data migration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-8">
                  <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-orange-600 bg-orange-100 rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Data Migration Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured, secure, and efficient approach to migrating your data with minimal disruption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {migrationFlow.map((feature, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-8 border-l-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${feature.color}`}
              >
                <div className="flex items-start">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl mr-6 ${
                    feature.color.includes('orange') ? 'bg-orange-200 text-orange-700' : 'bg-green-200 text-green-700'
                  }`}>
                    {React.cloneElement(feature.icon, { className: "text-xl" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center"></div>
                  <div className="text-sm font-medium px-3 py-1 rounded-full bg-white shadow">
                    Step {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Started with Your Data Migration
            </h2>
            <p className="text-xl text-gray-600">
              Contact us today to discuss your data migration needs and get a personalized quote.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input 
                  type="text" 
                  name="company" 
                  id="company" 
                  value={formData.company} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <button type="submit" className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default DataMigrationServices;