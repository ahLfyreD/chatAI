import React from "react";

interface LandingPageProps {
  toggleView: () => void; // Function to toggle between chat and landing page views.
}

const LandingPage: React.FC<LandingPageProps> = ({ toggleView }) => {
  return (
    <div className="relative bg-[#111827] flex flex-col items-center justify-center min-h-screen p-5 text-white">
      {/* Centered Content */}
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-6xl font-extrabold tracking-wide text-blue-300">
          DOS.AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          DOS.AI Chat is an AI-powered chatbot designed to provide structured,
          reliable, and insightful blockchain responses for users.
        </p>

        {/* Call-to-Action Button */}
        <button
          className="bg-[#232b3a] cursor-pointer hover:opacity-50 text-white px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={toggleView}
        >
          Start Chatting
        </button>
      </div>

      {/* Floating Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827] opacity-60 pointer-events-none"></div>
    </div>
  );
};

export default LandingPage;
