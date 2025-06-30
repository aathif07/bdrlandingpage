import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Sarvice = () => {
  const [activeTab, setActiveTab] = useState('dataMigration');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: 'Data Mitigation'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you shortly.');
  };

  const downloadBrochure = () => {
    // Brochure download logic
    alert('Brochure download started!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <h1 className="text-2xl font-bold text-gray-800">BigData Solutions</h1>
          </div>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </header>

      {/* Banner */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Data into Actionable Insights</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Cutting-edge solutions for data management, financial technology, and environmental sustainability
          </p>
          <div className="mt-10">
            <Button className="mr-4 bg-blue-500 hover:bg-blue-600">Get Started</Button>
            <Button variant="outline" className="text-white border-white">
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Our Comprehensive Data Solutions</h2>
          <p className="text-lg text-gray-700 mb-6">
            At BigData Solutions, we specialize in transforming complex data challenges into strategic advantages. 
            Our innovative approaches help organizations harness the full potential of their data assets while ensuring 
            compliance, security, and sustainability.
          </p>
          <p className="text-lg text-gray-700">
            With expertise across multiple industries and domains, we deliver tailored solutions that drive measurable 
            results and create long-term value for your business.
          </p>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-3 gap-4 mb-8">
              <TabsTrigger 
                value="dataMigration" 
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Data Migration
              </TabsTrigger>
              <TabsTrigger 
                value="fintech" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Fintech Solutions
              </TabsTrigger>
              <TabsTrigger 
                value="methaneMitigation" 
                className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
              >
                Methane Mitigation
              </TabsTrigger>
            </TabsList>

            {/* Data Migration Tab */}
            <TabsContent value="dataMigration" className="bg-white p-8 rounded-xl shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Data Migration Services</h3>
                  <p className="text-gray-700 mb-6">
                    Seamlessly transition your data infrastructure with our comprehensive migration solutions. 
                    We ensure zero downtime, complete data integrity, and optimized performance for your new environment.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Automated schema conversion and validation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Real-time data synchronization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Compliance with global data regulations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Post-migration optimization and support</span>
                    </li>
                  </ul>
                  <Button onClick={downloadBrochure} className="bg-blue-600 hover:bg-blue-700">
                    Download Brochure
                  </Button>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Request Data Migration Consultation</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      name="name"
                      placeholder="Full Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      name="message"
                      placeholder="Describe your migration needs" 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    <input type="hidden" name="service" value="Data Migration" />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Get Expert Consultation
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            {/* Fintech Tab */}
            <TabsContent value="fintech" className="bg-white p-8 rounded-xl shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Fintech Solutions</h3>
                  <p className="text-gray-700 mb-6">
                    Transform your financial operations with our cutting-edge technology solutions. 
                    From real-time analytics to fraud detection, we provide the tools for financial innovation.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>AI-powered risk assessment models</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Blockchain integration for secure transactions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Real-time financial dashboards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Regulatory compliance automation</span>
                    </li>
                  </ul>
                  <Button onClick={downloadBrochure} className="bg-green-600 hover:bg-green-700">
                    Download Brochure
                  </Button>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Fintech Solution Inquiry</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      name="name"
                      placeholder="Full Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Work Email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      name="message"
                      placeholder="Describe your financial technology needs" 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    <input type="hidden" name="service" value="Fintech" />
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Request Solution Demo
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            {/* Methane Mitigation Tab */}
            <TabsContent value="methaneMitigation" className="bg-white p-8 rounded-xl shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Methane Mitigation</h3>
                  <p className="text-gray-700 mb-6">
                    Reduce your environmental impact with our data-driven methane reduction solutions. 
                    Our technology helps energy companies monitor, measure, and minimize methane emissions.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Satellite-based emission detection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Predictive leak prevention systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Regulatory compliance reporting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Sustainability impact analytics</span>
                    </li>
                  </ul>
                  <Button onClick={downloadBrochure} className="bg-teal-600 hover:bg-teal-700">
                    Download Brochure
                  </Button>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Methane Reduction Consultation</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      name="name"
                      placeholder="Full Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your sustainability goals" 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    <input type="hidden" name="service" value="Methane Mitigation" />
                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                      Schedule Assessment
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Solutions Work</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {title: 'Assessment', desc: 'We analyze your current systems and requirements'},
              {title: 'Solution Design', desc: 'Custom architecture tailored to your needs'},
              {title: 'Implementation', desc: 'Seamless integration with minimal disruption'},
              {title: 'Optimization', desc: 'Continuous monitoring and improvement'}
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-bold mb-4">BigData Solutions</h4>
              <p className="text-gray-400">
                Transforming data into sustainable value through innovative technology solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Data Migration</li>
                <li>Fintech Solutions</li>
                <li>Methane Mitigation</li>
                <li>Data Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Case Studies</li>
                <li>Whitepapers</li>
                <li>Industry Reports</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Careers</li>
                <li>Newsletter</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2025 BigData Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="/data-policy" className="text-gray-400 hover:text-white text-sm">Data Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sarvice;