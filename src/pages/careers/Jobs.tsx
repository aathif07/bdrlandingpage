import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';

const Jobs = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Job Openings | Big Data Rhino";
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Expanded job descriptions
  const positions = [
    {
      title: "Data Scientist",
      level: "Senior/Junior",
      description: "As a Data Scientist, you will be instrumental in extracting insights from complex datasets. Junior Data Scientists will focus on data cleaning, exploratory data analysis, building initial models under guidance, and implementing existing algorithms. They will gain experience in various tools and techniques. Senior Data Scientists will lead the design and development of advanced machine learning models and algorithms, identify new opportunities for data-driven solutions, mentor junior team members, communicate complex findings to stakeholders, and contribute to the overall data strategy and architecture."
    },
    {
      title: "Data Analyst",
      level: "Senior/Junior",
      description: "Data Analysts transform raw data into actionable business intelligence. Junior Data Analysts will be responsible for collecting, cleaning, and organizing data, creating standard reports and dashboards using visualization tools, and performing basic statistical analysis. Senior Data Analysts will design and implement complex analytics frameworks, identify key performance indicators, conduct in-depth investigations into business trends, present findings and recommendations to leadership, and potentially manage data pipelines and reporting infrastructure."
    },
    {
      title: "Machine Learning Engineer",
      level: "Senior/Junior",
      description: "Machine Learning Engineers build, deploy, and maintain scalable ML systems. Junior ML Engineers will focus on implementing machine learning models developed by data scientists, writing clean and efficient code for model training and inference, and assisting with deployment pipelines. Senior ML Engineers will design and build robust and scalable ML pipelines, optimize models for performance and efficiency in production, evaluate and integrate new ML technologies, collaborate with data scientists and software engineers, and lead the deployment and monitoring of ML systems."
    },
    {
      title: "AI Research Scientist",
      level: "Senior/Junior",
      description: "AI Research Scientists push the boundaries of artificial intelligence within the company. Junior AI Research Scientists will assist senior researchers in conducting experiments, implementing research prototypes, and analyzing results. They will stay updated on the latest AI advancements. Senior AI Research Scientists will lead novel AI research initiatives, design and develop cutting-edge AI architectures and algorithms, publish findings, provide technical leadership, and drive the integration of research outcomes into product development."
    },
    {
      title: "Solutions Architect",
      level: "Senior/Junior",
      description: "Solutions Architects bridge the gap between business needs and technical implementations. Junior Solutions Architects will support senior architects in documenting requirements, evaluating technologies, and assisting with the design of solution components. They will learn to translate business problems into technical specifications. Senior Solutions Architects will take the lead in understanding complex business requirements, designing comprehensive and scalable technical solutions, evaluating and recommending technology stacks, creating architectural documentation, and guiding development teams through the implementation process."
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Career Opportunities</h1>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-1">{position.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-3">
                      {position.level} Level
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {position.description}
                    </p>
                  </div>
                  <div className="md:self-center">
                    <Link
                      to="/careers/apply"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 whitespace-nowrap"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md mt-12 text-center border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-4">Don't See Your Level?</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              We're growing fast and may have unlisted opportunities. Send us your details.
            </p>
            <Link
              to="/careers/apply"
              className="inline-block bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Apply
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
