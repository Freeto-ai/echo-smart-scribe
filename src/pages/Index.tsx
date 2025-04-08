
import React, { useEffect, useState } from 'react';
import { ChatProvider } from '@/context/ChatContext';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';

const Index: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar isMobile={isMobile} />
        
        <main className={`flex-1 flex flex-col relative ${!isMobile ? 'ml-0 md:ml-64' : ''}`}>
          <ChatArea />
        </main>
      </div>
    </ChatProvider>
  );
};

export default Index;
