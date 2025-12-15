import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatbotButton = () => {
  return (
    <Link to="/chat" className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 gap-2 animate-float"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">Ask ChatBot</span>
      </Button>
    </Link>
  );
};