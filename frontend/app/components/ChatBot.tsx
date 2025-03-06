"use client";

import { useState } from "react";
import axios from "axios";

interface ChatBotProps {
  toggleView: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ toggleView }) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for UX

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { user: userMessage, bot: "..." }]);
    setLoading(true);

    try {
      const response = await axios.post("https://45.45.163.144/chat", {
        message: userMessage,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: response.data.reply || "No response" },
      ]);
    } catch (error) {
      console.error("ChatBot API Error:", error); // Logs error
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: "Error processing request" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111827] text-white items-center justify-center p-5">
      {/* Header */}
      <button
        className="text-3xl font-bold mb-5 transition-all cursor-pointer hover:scale-105"
        onClick={toggleView}
      >
        DOS.AI Chat
      </button>

      <div className="w-full max-w-2xl bg-[#1f2937] p-6 rounded-lg shadow-lg">
        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto p-3 space-y-4 border border-gray-700 rounded-lg bg-[#111827]">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">Start a conversation...</p>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="space-y-1">
              <p
                className={`${
                  msg.bot === "..."
                    ? "text-gray-500 animate-pulse"
                    : "text-gray-300"
                }`}
              >
                {msg.bot}
              </p>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="mt-4 flex items-center gap-3">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-lg bg-[#232b3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter blockchain network..."
          />
          <button
            className="bg-[#232b3a] hover:opacity-50 cursor-pointer text-white font-medium px-5 py-3 rounded-lg shadow-md transition-all disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
