import React, { useRef, useEffect, useState } from "react";
import Footer from "../layout/Footer";

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fontFamilyClass = "font-sans";

  return (
    <>
      <section ref={sectionRef} id="about" className={`py-20 text-white ${fontFamilyClass}`}>
        <div className="container mx-auto px-6 lg:px-12">
          {/* Main "About Us" heading and intro text - now left-aligned */}
          <div className="mb-12"> {/* Removed text-center */}
            <h2 className="text-4xl font-semibold mb-4 text-gray-800 dark:text-white">About Us</h2>
            <h2
              className={`text-2xl font-bold mt-2 transition-all duration-700 text-gray-900 dark:text-white ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              Precision Data Solutions for Strategic Decision-Making
            </h2>
            <div
              className={`mt-4 text-lg text-gray-400 max-w-3xl ${/* Removed mx-auto here to left-align */''} transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <p>
                Founded in February 2022 by Patrick Parks, a proud Reconnaissance Marine veteran, 
                Big Data Rhino is driven by a mission to bring clarity and actionable insights to 
                complex data challenges. We combine military precision with cutting-edge data science 
                to empower smarter business decisions.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h3>
              <p className="text-lg text-gray-400">
                Born from military discipline and technological innovation, Big Data Rhino brings 
                strategic thinking and relentless execution to data solutions.
              </p>
              <p className="text-lg text-gray-400">
                From veteran-owned startup to trusted industry partner, we help organizations navigate 
                data complexity with confidence.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Our Approach</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-400">
                <li>Military-grade precision in data handling</li>
                <li>Cutting-edge AI and machine learning</li>
                <li>Industry-specific expertise</li>
                <li>Actionable business insights</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Capabilities</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { title: "AI Solutions", icon: "🤖" },
                  { title: "Predictive Analytics", icon: "🔮" },
                  { title: "Data Visualization", icon: "📊" },
                  { title: "Cloud Integration", icon: "☁️" },
                  { title: "API Development", icon: "🔌" },
                  { title: "Security Compliance", icon: "🛡️" },
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-10 bg-white dark:bg-gray-800 rounded-xl px-8 mb-16 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Industry Impact</h3> {/* Removed text-center */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Energy Sector",
                  description: "Optimizing operations and reducing emissions through analytics",
                  stats: "30% efficiency gains"
                },
                {
                  title: "Healthcare",
                  description: "Transforming patient outcomes with predictive analytics",
                  stats: "Improved diagnostics"
                },
                {
                  title: "Government",
                  description: "Secure, actionable intelligence for public agencies",
                  stats: "DVBE-certified"
                }
              ].map((sector, index) => (
                <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"> {/* Removed text-center from cards if individual content needs to be left-aligned */}
                  <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">{sector.title}</h4>
                  <p className="text-gray-400 mb-2">{sector.description}</p>
                  <p className="text-blue-400 font-medium">{sector.stats}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Team Culture</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-400 mb-4">
                  We combine technical excellence with unique perspectives to deliver innovative solutions.
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-400">
                  <li>PhD-level data scientists</li>
                  <li>Veterans with military discipline</li>
                  <li>Industry domain experts</li>
                  <li>Creative problem-solvers</li>
                </ul>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <p className="italic text-gray-500 dark:text-gray-300 mb-4">
                    "The best solutions emerge when unique perspectives meet deep technical expertise."
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our culture emphasizes continuous learning, collaboration, and shared success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white"> {/* Removed text-center */}
              Our Commitment to Clients
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Transparency", icon: "🔍", description: "Clear communication throughout" },
                { title: "Results", icon: "📈", description: "Measurable business outcomes" },
                { title: "Security", icon: "🛡️", description: "Enterprise-grade protection" },
                { title: "Partnership", icon: "🤝", description: "Long-term collaboration" }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"> {/* Removed text-center from cards if individual content needs to be left-aligned */}
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;