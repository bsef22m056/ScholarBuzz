import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChatbotButton } from '@/components/ChatbotButton';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const MainLayout = ({ children, title, subtitle }: MainLayoutProps) => {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300 min-h-screen',
          // Desktop: adjust padding based on sidebar state
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20',
          // Mobile: no left padding (sidebar overlays)
          'pl-0'
        )}
      >
        <Header title={title} subtitle={subtitle} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
      <ChatbotButton />
    </div>
  );
};