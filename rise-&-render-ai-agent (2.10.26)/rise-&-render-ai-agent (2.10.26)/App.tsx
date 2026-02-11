import React, { useState, useEffect } from 'react';
import { ChatWindow } from './components/ChatWindow';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showBubble) {
      setIsBouncing(true);
      // Stop bouncing after 5 seconds (approx 5 bounces)
      // Tailwind bounce is 1s. We add a tiny buffer to ensure it doesn't cut mid-frame oddly, 
      // although snapping to ground (0) from air (-25%) is the expected stop behavior.
      const stopBounceTimer = setTimeout(() => {
        setIsBouncing(false);
      }, 5000);
      
      return () => clearTimeout(stopBounceTimer);
    }
  }, [showBubble]);

  return (
    <div className="font-sans antialiased text-studio-text">
      {/* Launch Button & Bubble */}
      {!isOpen && (
        <>
          {/* Greeting Bubble */}
          {showBubble && (
            <div className={`fixed bottom-24 right-8 z-50 transition-all duration-300 ${isBouncing ? 'animate-bounce' : ''} opacity-60 hover:opacity-100`}>
               <div className="bg-[#F5EFE6] text-[#131313] px-3 py-2 rounded-xl rounded-br-sm shadow-xl border border-[#131313]/10 relative max-w-[160px]">
                  <p className="text-xs font-semibold leading-snug">Hi, I'm your AI assistant, ask me anything.</p>
               </div>
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#131313] text-[#F5EFE6] rounded-full shadow-lg hover:shadow-xl scale-75 hover:scale-100 transition-all duration-300 flex items-center justify-center z-50 group border border-[#F5EFE6]/10"
            aria-label="Open Rise & Render Assistant"
          >
            <span className="text-3xl font-bold group-hover:rotate-12 transition-transform">
              R
            </span>
            {/* Pulse Effect */}
            <span className="absolute -inset-1 rounded-full bg-[#F5EFE6] opacity-10 animate-pulse-slow"></span>
          </button>
        </>
      )}

      {/* The Chat Widget */}
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default App;