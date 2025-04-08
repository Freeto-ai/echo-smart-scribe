
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';
import ConversationItem from './ConversationItem';
import { Menu, PanelLeftClose, PanelLeft, PlusCircle } from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const { conversations, currentConversationId, createNewConversation, selectConversation } = useChat();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="fixed top-4 left-4 z-30"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full bg-secondary z-20
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
          ${isMobile ? 'shadow-lg' : ''}
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Conversations</h2>
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <PanelLeftClose className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* New chat button */}
        <div className="p-3">
          <Button 
            onClick={createNewConversation} 
            variant="outline" 
            className="w-full justify-start gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            New conversation
          </Button>
        </div>
        
        {/* Conversation list */}
        <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100%-8rem)]">
          {conversations.map(conversation => (
            <ConversationItem 
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === currentConversationId}
              onClick={() => selectConversation(conversation.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Collapsed sidebar button (desktop) */}
      {!isMobile && !isSidebarOpen && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="fixed top-4 left-4 z-10"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      )}
      
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
