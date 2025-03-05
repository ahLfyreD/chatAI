"use client";

import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ChatBot from "./components/ChatBot";

export default function Home() {
  const [displayView, setDisplayView] = useState(true);

  const toggleView = () => {
    setDisplayView(!displayView);
  };

  return (
    <div className="relative h-screen">
      {displayView ? (
        <LandingPage toggleView={toggleView} />
      ) : (
        <ChatBot toggleView={toggleView} />
      )}
      <div className="absolute bottom-4 right-2">
        <p className="text-sm">
          Powered by{" "}
          <a href="http://" target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
            {" "}
            CUDOS INTERCLOUD
          </a>
        </p>
      </div>
    </div>
  );
}
