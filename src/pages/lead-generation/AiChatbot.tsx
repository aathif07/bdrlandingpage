
import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import InteractiveBackground from '../../components/effects/InteractiveBackground';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/button';
import { SendHorizonal } from 'lucide-react';

const AiChatbot = () => {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I\'m DataRhino AI, your virtual assistant. How can I help you today?' }
  ]);

  useEffect(() => {
    document.title = "AI Chatbot | Big Data Rhino";
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help with that. Could you provide more details?",
        "That's an interesting question about our services. Let me provide some information...",
        "Thanks for your interest! Would you like to schedule a consultation with one of our experts?",
        "I can connect you with our team who specializes in that area. Would you like me to arrange that?",
        "Let me check our resources on that topic. We have several case studies that might be helpful."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setChatHistory(prev => [...prev, { sender: 'bot', text: randomResponse }]);
    }, 1000);
    
    // Clear input field
    setMessage('');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <InteractiveBackground />
      <Header />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">AI Chatbot Assistant</h1>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              Get instant answers to your questions and discover how Big Data Rhino can help your business with our AI assistant.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Type your message..."
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  <SendHorizonal size={18} />
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Popular Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => setMessage("What services do you offer?")}>
                What services do you offer?
              </Button>
              <Button variant="outline" onClick={() => setMessage("How can AI help my business?")}>
                How can AI help my business?
              </Button>
              <Button variant="outline" onClick={() => setMessage("I'd like to schedule a consultation")}>
                I'd like to schedule a consultation
              </Button>
              <Button variant="outline" onClick={() => setMessage("What industries do you work with?")}>
                What industries do you work with?
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiChatbot;
