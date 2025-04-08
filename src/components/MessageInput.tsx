
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/context/ChatContext';
import { SendHorizonal } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
      <div className="relative max-w-3xl mx-auto">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT..."
          disabled={isLoading}
          className="pr-12 resize-none min-h-[56px] max-h-[200px] py-3 rounded-xl"
          rows={1}
        />
        <Button 
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading}
          className="absolute right-2 bottom-2 h-8 w-8"
        >
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-xs text-center text-muted-foreground mt-2">
        ChatGPT can make mistakes. Consider checking important information.
      </div>
    </form>
  );
};

export default MessageInput;
