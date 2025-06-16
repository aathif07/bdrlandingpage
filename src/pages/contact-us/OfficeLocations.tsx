
import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { MapPin } from 'lucide-react';

const OfficeLocations = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Office Locations | Big Data Rhino";
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const offices = [
    {
      name: "Silicon Valley Headquarters",
      address: "123 Tech Boulevard, Silicon Valley, CA 94025",
      phone: "+1 (555) 123-4567",
      email: "sv@bigdatarhino.com",
      coordinates: "37.4419° N, 122.1430° W",
      type: "Headquarters",
      departments: ["Executive Offices", "Research & Development", "Product Engineering"],
    },
    {
      name: "New York Office",
      address: "456 Data Avenue, New York, NY 10001",
      phone: "+1 (555) 987-6543",
      email: "ny@bigdatarhino.com",
      coordinates: "40.7128° N, 74.0060° W",
      type: "Regional Office",
      departments: ["Sales & Marketing", "Client Services", "Finance"],
    },
    {
      name: "London Office",
      address: "789 Innovation Street, London, EC2A 4PF, UK",
      phone: "+44 20 1234 5678",
      email: "london@bigdatarhino.com",
      coordinates: "51.5074° N, 0.1278° W",
      type: "International Office",
      departments: ["European Operations", "International Sales", "Client Support"],
    },
    {
      name: "Singapore Office",
      address: "10 Technology Park, Singapore 486123",
      phone: "+65 8765 4321",
      email: "singapore@bigdatarhino.com",
      coordinates: "1.3521° N, 103.8198° E",
      type: "Asia-Pacific HQ",
      departments: ["APAC Operations", "Regional Development", "Support"],
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Our Office Locations</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Big Data Rhino has a global presence with offices strategically located to serve our international client base.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {offices.map((office, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <MapPin className="text-blue-500" size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{office.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{office.type}</p>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-medium">Address:</p>
                            <p>{office.address}</p>
                          </div>
                          <div>
                            <p className="font-medium">Contact:</p>
                            <p>Phone: {office.phone}</p>
                            <p>Email: {office.email}</p>
                          </div>
                          <div>
                            <p className="font-medium">Coordinates:</p>
                            <p>{office.coordinates}</p>
                          </div>
                          <div>
                            <p className="font-medium">Departments:</p>
                            <ul className="list-disc list-inside">
                              {office.departments.map((dept, i) => (
                                <li key={i}>{dept}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Planning Your Visit</h2>
              <p>
                We welcome visitors to our offices. If you'd like to schedule a visit, please contact the specific office location 
                using the information provided above or use our <a href="/contact-us/contact-form" className="text-blue-500 hover:underline">contact form</a> to 
                arrange an appointment. Our team will be happy to assist you with directions and visitor information.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfficeLocations;
