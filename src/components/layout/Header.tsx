import { Bell, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { notifications, toggleMobileSidebar } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden rounded-lg p-2 hover:bg-muted transition-colors flex-shrink-0"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-semibold text-foreground truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground truncate hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search scholarships..."
              className="w-48 lg:w-64 pl-10 bg-muted border-0 focus-visible:ring-primary"
            />
          </div>

          {/* Notifications */}
          <Link
            to="/notifications"
            className={cn(
              'relative rounded-lg p-2 transition-colors',
              'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            AD
          </Link>
        </div>
      </div>
    </header>
  );
};