
import React from 'react';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import { Conversation } from '@/context/ChatContext';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-md text-left transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-chat-hover text-foreground"
      )}
    >
      <MessageSquare className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-medium truncate flex-1">
        {conversation.title}
      </span>
    </button>
  );
};

export default ConversationItem;
