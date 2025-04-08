
import React from 'react';
import { cn } from '@/lib/utils';
import { Message as MessageType } from '@/context/ChatContext';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
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
          {message.content.split('\n').map((paragraph, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
