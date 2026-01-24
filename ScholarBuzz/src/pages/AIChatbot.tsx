import { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Sparkles, 
  User,
  Lightbulb,
  HelpCircle,
  Target,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const quickSuggestions = [
  { icon: HelpCircle, text: "Why didn't I get more matches?" },
  { icon: Lightbulb, text: 'How can I improve my profile?' },
  { icon: Target, text: 'Which scholarships should I prioritize?' },
  { icon: Clock, text: 'What deadlines are coming up?' },
];

const mockResponses: Record<string, string> = {
  "Why didn't I get more matches?": 
    "Based on your profile analysis, here are the main factors affecting your matches:\n\n1. **Nationality Requirement**: Several high-value scholarships like Gates Millennium require US citizenship, which you don't meet.\n\n2. **Missing Sections**: Your profile is 75% complete. Adding Experience and Achievements could unlock 3-5 more scholarships.\n\n3. **German Language**: You have A2 level, but DAAD requires B1. Consider language certification to access more European opportunities.\n\nWould you like specific recommendations for improving your match rate?",
  
  'How can I improve my profile?':
    "Great question! Here are actionable steps to boost your profile strength from 75% to 95%:\n\n📝 **Complete Experience Section** (+10%)\nAdd your work/research experience, even if part-time or volunteer.\n\n🏆 **Add Achievements** (+8%)\nInclude any awards, certifications, or notable projects.\n\n📄 **Update Resume** (+7%)\nYour current resume was uploaded 3 months ago. Refresh it with recent activities.\n\nImplementing these changes could increase your average match score by approximately 15%!",
  
  'Which scholarships should I prioritize?':
    "Based on your profile and deadlines, here's my recommended priority order:\n\n🥇 **Fulbright Program** (88% match, 14 days left)\nStrong fit for your research background. Focus on preparing your research proposal.\n\n🥈 **Chevening Scholarship** (82% match, 28 days left)\nGood leadership indicators in your profile. Emphasize your career goals.\n\n🥉 **PEEF Scholarship** (78% match, 52 days left)\nNationality advantage! This should be a relatively easy application.\n\nWould you like help with any specific application?",
  
  'What deadlines are coming up?':
    "Here are your upcoming deadlines:\n\n🔴 **Gates Millennium** - 7 days (Oct 15)\nNote: Nationality requirement not met\n\n🟡 **Fulbright Program** - 14 days (Oct 22)\n✅ Good match, prioritize this!\n\n🟡 **Chevening** - 28 days (Nov 5)\n✅ Solid match, start preparing\n\n🟢 **PEEF** - 52 days (Nov 30)\nPlenty of time, but don't delay\n\n🟢 **DAAD** - 68 days (Dec 15)\nWork on German language requirements\n\nI recommend setting calendar reminders for 7, 3, and 1 day before each deadline.",
};

const AIChatbot = () => {
  const { chatMessages, addChatMessage, user } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async (message?: string) => {
    const text = message || input;
    if (!text.trim()) return;

    addChatMessage({ role: 'user', content: text });
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[text] || 
        `I understand you're asking about "${text}". Based on your profile (${user.field} at ${user.institution}, GPA: ${user.gpa}), I'd recommend focusing on scholarships that match your STEM background and research experience. Would you like me to suggest specific opportunities?`;
      
      addChatMessage({ role: 'assistant', content: response });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <MainLayout title="AI Assistant" subtitle="Get personalized scholarship guidance">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Area */}
        <div className="flex-1 rounded-xl border bg-card shadow-card overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Hi {user.name.split(' ')[0]}! How can I help?</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  I can help you find scholarships, improve your profile, and answer questions about your applications.
                </p>
                
                {/* Quick Suggestions */}
                <div className="grid gap-3 sm:grid-cols-2 max-w-lg">
                  {quickSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => handleSend(suggestion.text)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border p-4 text-left transition-all',
                        'hover:border-primary hover:bg-primary/5 hover:shadow-md'
                      )}
                    >
                      <suggestion.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-4 animate-slide-up',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full gradient-primary">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-4 py-3',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <div className={cn(
                        'text-sm whitespace-pre-wrap',
                        message.role === 'assistant' && 'prose prose-sm max-w-none dark:prose-invert'
                      )}>
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                            {line.replace(/\*\*/g, '')}
                          </p>
                        ))}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-4 animate-slide-up">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full gradient-primary">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t bg-card p-4">
            <div className="flex gap-3">
              <Input
                placeholder="Ask me anything about scholarships..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                className="flex-1"
              />
              <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Powered by AI
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIChatbot;
