
import React from "react";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";

interface ChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatDialog: React.FC<ChatDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = React.useState([
    { sender: 'bot', text: 'Hi there! I\'m here to help you with your career growth. How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = React.useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() && inputMessage.trim() !== 'Hi there! I\'m here to help you with your career growth. How can I assist you today?') {
      setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
      setInputMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'I\'m here to help you with your career growth. How can I assist you today?' }]);
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[500px] border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-l from-blue-50 via-blue-100 to-white  border-b border-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Career Support Chat</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Get instant help with your career questions, resume tips, and interview preparation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                      ? 'bg-blue-600 text-white border-2 border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700'
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 hover:border-blue-700"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
