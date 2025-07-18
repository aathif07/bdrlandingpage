import React, { useState } from 'react';
import { Mail, Users, BarChart3, Shield, Database, Calendar, Target, CheckCircle, ArrowRight, Play, Star } from 'lucide-react';

const ZixflowInboundPlatform = () => {
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

  const companies = [
    "STAR+",
    "Sharekhan",
    "Blackstone",
    "IndiaBuilt",
    "Business Standard",
    "Axis Bank"
  ];

  const features = [
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Data collection forms",
      description: "Capture contact details and pre-qualified questions, and save them in your CRM."
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Run inbound campaigns",
      description: "Run multi-channel outreach campaigns via SMS, Email, or WhatsApp messages."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      title: "Real-time reports",
      description: "Get comprehensive analytics and track multiple metrics via reports."
    }
  ];

  const discoveryFeatures = [
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: "Outbound sales",
      description: "Reach out to prospects with our outbound sales software",
      link: "Get outbound sales →"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      title: "Automation",
      description: "Save time and grow with our automation platform",
      link: "Automate activities →"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Engagement",
      description: "Build relationships to automate business to each participant",
      link: "Boost engagement →"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Quality data security",
      description: "Keep your data secure with our privacy measures",
      link: "Protect your data →"
    },
    {
      icon: <Calendar className="w-8 h-8 text-indigo-500" />,
      title: "Landing privacy measures",
      description: "Achieve faster and more streamlined personalization online in right way",
      link: "Start securing privacy →"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-pink-500" />,
      title: "Peak performance",
      description: "Use Sales AI and business intelligence campaigns to improve AR and reach metrics",
      link: "Boost performance →"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                AI-powered <br />
                inbound <br />
                <span className="text-blue-600">platform</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Everything you need for converting leads, engaging with prospects, and converting them into customers. All in one platform.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2">
                <span>Start selling</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="bg-gray-900 rounded-t-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="text-white font-semibold text-lg">Inbox</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "Marketing qualified", status: "New lead", color: "bg-green-100 text-green-800" },
                    { name: "Product Demo", status: "Scheduled", color: "bg-blue-100 text-blue-800" },
                    { name: "Website Inquiry", status: "In Progress", color: "bg-yellow-100 text-yellow-800" },
                    { name: "Pricing Inquiry", status: "Follow-up", color: "bg-purple-100 text-purple-800" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">2 mins ago</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white text-lg mb-12">
            Trusted by 3500+ companies around the world
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div key={index} className="text-center">
                <span className="text-white text-xl font-bold opacity-70">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Make people love the sales process with <br />
              inbound sales software
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-8">
                  <div className="bg-yellow-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Gather data
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Discovery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Discover more about Zixflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {discoveryFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center space-x-2">
                  <span>{feature.link}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to transform your sales process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies using Zixflow to boost their inbound sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZixflowInboundPlatform;