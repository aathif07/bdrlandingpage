import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/components/ui/use-toast';

const Apply = () => {
  const { theme } = useTheme();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    greatFit: '',
    consent: false
  });

  useEffect(() => {
    document.title = "Apply for a Position | Big Data Rhino";
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for Firebase - FIXED: Now includes consent field
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`, // Keep for backward compatibility
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        yearsExperience: formData.experience,
        coverLetter: formData.coverLetter,
        greatFit: formData.greatFit,
        consent: formData.consent, // FIXED: Added this line
        resumeUrl: '', // We'll need to implement file upload for this
        createdAt: serverTimestamp(),
        status: 'new' // Default status for new applications
      };

      console.log("Submitting application data:", applicationData); // Debug log

      // Add document to Firestore
      await addDoc(collection(db, 'careerApplications'), applicationData);

      // Show success message
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted!",
        variant: "default",
      });

      // Reset form and show success message
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        coverLetter: '',
        greatFit: '',
        consent: false
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "Please Log in to Apply.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Application Form</h1>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
            We are continuously reviewing resumes for roles that make a real impact on people's lives. Apply now—if we see a fit, we'll reach out to you.
          </p>

          {formSubmitted ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-semibold mb-4">Application Submitted Successfully!</h2>
              <p className="mb-6">Thank you for your interest in joining Big Data Rhino. Our HR team will review your application and contact you soon.</p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-1">Position Applying For</label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    <option value="">Select a position</option>
                    <optgroup label="Data Science">
                      <option value="senior-data-scientist">Senior Data Scientist</option>
                      <option value="junior-data-scientist">Junior Data Scientist</option>
                      <option value="ai-scientist">AI Scientist</option>
                    </optgroup>
                    <optgroup label="Data Analysis">
                      <option value="senior-data-analyst">Senior Data Analyst</option>
                      <option value="junior-data-analyst">Junior Data Analyst</option>
                    </optgroup>
                    <optgroup label="Machine Learning">
                      <option value="senior-ml-engineer">Senior ML Engineer</option>
                      <option value="junior-ml-engineer">Junior ML Engineer</option>
                      <option value="senior-ml-scientist">Senior ML Scientist</option>
                      <option value="junior-ml-scientist">Junior ML Scientist</option>
                      <option value="senior-ai-scientist">Senior AI Scientist</option>
                      <option value="junior-ai-scientist">Junior AI Scientist</option>
                    </optgroup>
                    <optgroup label="Technical Leadership">
                      <option value="senior-technical-lead">Senior Technical Lead</option>
                      <option value="technical-architect">Junior Technical Architect</option>
                    </optgroup>
                    <optgroup label="Frontend Development">
                      <option value="senior-frontend-dev">Senior Frontend Developer</option>
                      <option value="junior-frontend-dev">Junior Frontend Developer</option>
                    </optgroup>
                    <optgroup label="Backend Development">
                      <option value="senior-backend-dev">Senior Backend Developer</option>
                      <option value="junior-backend-dev">Junior Backend Developer</option>
                    </optgroup>
                    <optgroup label="Data Engineering">
                      <option value="senior-data-engineer">Senior Data Engineer</option>
                      <option value="junior-data-engineer">Junior Data Engineer</option>
                    </optgroup>
                    <optgroup label="DevOps">
                      <option value="senior-devops-engineer">Senior DevOps Engineer</option>
                      <option value="junior-devops-engineer">Junior DevOps Engineer</option>
                    </optgroup>
                    <optgroup label="Technical Sales">
                      <option value="senior-technical-sales">Senior Technical Sales</option>
                      <option value="junior-technical-sales">Junior Technical Sales</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium mb-1">Years of Experience</label>
                  <input
                    type="number"
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    max="30"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Tell us about yourself and why you're interested in this position..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="greatFit" className="block text-sm font-medium mb-1">Why am I a great fit for this role?</label>
                  <textarea
                    id="greatFit"
                    value={formData.greatFit}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Explain how your skills and experience make you the ideal candidate for this position..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="consent" className="text-sm">
                    I consent to Big Data Rhino processing my personal data for recruitment purposes.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
