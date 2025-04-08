import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  // Add agentId to track which agent sent the message
  agentId?: string;
  agentName?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create a new conversation
  const createNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title: 'New conversation',
      messages: [],
      lastUpdated: new Date(),
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newId);
  };

  // Select a conversation
  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  // Helper function to generate AI response, updated to include agent information
  const generateAIResponse = async (message: string): Promise<{content: string, agentId: string, agentName: string}[]> => {
    // In a real app, this would call an API
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    // Mock responses with agent information
    const responses = [];
    
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      responses.push({
        content: "Hello! How can I assist you today?",
        agentId: "1",
        agentName: "Agent 1"
      });
      responses.push({
        content: "Hi there! I'm here if you need more creative ideas.",
        agentId: "2",
        agentName: "Agent 2"
      });
    } else if (message.toLowerCase().includes('help')) {
      responses.push({
        content: "I'm here to help. What do you need assistance with?",
        agentId: "1",
        agentName: "Agent 1"
      });
    } else if (message.toLowerCase().includes('weather')) {
      responses.push({
        content: "I don't have access to real-time weather data, but I can discuss weather concepts if you'd like.",
        agentId: "3",
        agentName: "Agent 3"
      });
      responses.push({
        content: "While I can't provide current forecasts, I could talk about meteorological patterns and concepts.",
        agentId: "1",
        agentName: "Agent 1"
      });
    } else if (message.toLowerCase().includes('name')) {
      responses.push({
        content: "I'm Agent 1, designed to help answer your questions accurately and concisely.",
        agentId: "1", 
        agentName: "Agent 1"
      });
    } else {
      responses.push({
        content: "I understand your message. How else can I assist you today?",
        agentId: "1",
        agentName: "Agent 1"
      });
    }
    
    return responses;
  };

  // Send a message in the current conversation - updated to handle multiple agent responses
  const sendMessage = async (content: string) => {
    if (!currentConversationId) {
      createNewConversation();
    }
    
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Update conversations with user message
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.id === currentConversationId || (!currentConversationId && prevConversations.indexOf(conv) === 0)) {
          // Update title based on first message if it's still the default
          const updatedTitle = conv.title === 'New conversation' && conv.messages.length === 0 
            ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
            : conv.title;
            
          return {
            ...conv,
            title: updatedTitle,
            messages: [...conv.messages, userMessage],
            lastUpdated: new Date(),
          };
        }
        return conv;
      });
    });
    
    // Generate and add AI responses
    try {
      const aiResponses = await generateAIResponse(content);
      
      // Create one combined message with all agent responses
      const combinedContent = aiResponses.map(response => response.content).join('\n\n');
      
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        content: combinedContent,
        role: 'assistant',
        timestamp: new Date(),
        // Store agent info as JSON for each response
        agentId: JSON.stringify(aiResponses.map(r => r.agentId)),
        agentName: JSON.stringify(aiResponses.map(r => r.agentName)),
      };
      
      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === currentConversationId || (!currentConversationId && prevConversations.indexOf(conv) === 0)) {
            return {
              ...conv,
              messages: [...conv.messages, aiMessage],
              lastUpdated: new Date(),
            };
          }
          return conv;
        });
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  };

  // If there are no conversations, create one
  React.useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations]);

  const value = {
    conversations,
    currentConversationId,
    isLoading,
    createNewConversation,
    selectConversation,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// Custom hook to use the chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
