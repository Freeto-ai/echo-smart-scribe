
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatArea: React.FC = () => {
  const { conversations, currentConversationId, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const currentConversation = conversations.find(
    conv => conv.id === currentConversationId
  );
  
  const messages = currentConversation?.messages || [];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3 max-w-sm mx-auto px-4">
              <h2 className="text-2xl font-semibold">How can I help you today?</h2>
              <p className="text-muted-foreground">
                Ask me anything, from creative writing to in-depth research questions.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="px-4 py-2 text-sm text-muted-foreground animate-pulse">
                Assistant is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatArea;
