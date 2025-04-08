
import React from 'react';
import { cn } from '@/lib/utils';
import { Message as MessageType } from '@/context/ChatContext';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Parse agent information if it exists
  const renderAssistantContent = () => {
    if (!message.agentId || !message.agentName) {
      // Normal rendering for messages without agent info
      return message.content.split('\n').map((paragraph, i) => (
        <p key={i} className={i > 0 ? 'mt-2' : ''}>
          {paragraph}
        </p>
      ));
    }

    try {
      // Parse agent IDs and names
      const agentIds = JSON.parse(message.agentId) as string[];
      const agentNames = JSON.parse(message.agentName) as string[];
      
      // Split content into paragraphs then further split by double newlines
      // which is our separator for different agent responses
      const paragraphs = message.content.split('\n\n');
      
      return agentIds.map((id, index) => {
        const name = agentNames[index];
        const content = paragraphs[index];
        
        if (!content) return null;
        
        return (
          <div key={index} className="mb-4 border-l-2 pl-3" style={{ borderColor: getAgentColor(id) }}>
            <div className="text-xs text-muted-foreground mb-1 flex items-center">
              <Bot className="h-3 w-3 mr-1" />
              <span>{name}</span>
            </div>
            {content.split('\n').map((paragraph, i) => (
              <p key={i} className={i > 0 ? 'mt-2' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        );
      });
    } catch (error) {
      // Fallback to regular rendering if parsing fails
      console.error('Error parsing agent info:', error);
      return message.content.split('\n').map((paragraph, i) => (
        <p key={i} className={i > 0 ? 'mt-2' : ''}>
          {paragraph}
        </p>
      ));
    }
  };
  
  // Helper function to get agent color based on ID
  const getAgentColor = (agentId: string) => {
    switch (agentId) {
      case "1": return "#3b82f6"; // blue
      case "2": return "#10b981"; // green
      case "3": return "#8b5cf6"; // purple
      default: return "#6b7280";  // gray
    }
  };
  
  return (
    <div 
      className={cn(
        "flex w-full items-start gap-4 py-4 animate-fade-in",
        isUser ? "px-4 sm:px-8 md:px-12" : "bg-chat-ai px-4 sm:px-8 md:px-12"
      )}
    >
      <div className={cn(
        "flex-shrink-0 rounded-full p-1.5 w-8 h-8 flex items-center justify-center",
        isUser ? "bg-blue-100" : "bg-blue-600"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-blue-600" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="font-medium">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="prose prose-sm max-w-none">
          {isUser ? (
            message.content.split('\n').map((paragraph, i) => (
              <p key={i} className={i > 0 ? 'mt-2' : ''}>
                {paragraph}
              </p>
            ))
          ) : renderAssistantContent()}
        </div>
      </div>
    </div>
  );
};

export default Message;
