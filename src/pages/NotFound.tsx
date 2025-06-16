import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import InteractiveBackground from '../components/effects/InteractiveBackground';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <InteractiveBackground />
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-6">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Hi 👋
          <br />
          This page is not available. I think you tried to access an unavailable page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <a
            href="/"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;