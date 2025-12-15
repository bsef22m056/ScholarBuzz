import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  User, 
  Bell, 
  MessageSquare, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useAppStore';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/scholarships', icon: GraduationCap, label: 'Scholarships' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/applications', icon: FileText, label: 'Applications' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/chat', icon: MessageSquare, label: 'AI Assistant' },
];

const adminItems = [
  { path: '/admin', icon: Settings, label: 'Admin Panel' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, notifications } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
        'bg-sidebar border-r border-sidebar-border',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold text-sidebar-foreground animate-fade-in">
                ScholarBuzz
              </span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <div className="mb-2">
            {sidebarOpen && (
              <span className="px-3 text-xs font-medium uppercase text-sidebar-foreground/50">
                Main Menu
              </span>
            )}
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            const showBadge = item.path === '/notifications' && unreadCount > 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200',
                  'hover:bg-sidebar-accent',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-glow'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="flex-1 animate-fade-in">{item.label}</span>
                )}
                {showBadge && sidebarOpen && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5">
                    {unreadCount}
                  </Badge>
                )}
                {showBadge && !sidebarOpen && (
                  <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-destructive" />
                )}
              </Link>
            );
          })}

          <div className="my-4 border-t border-sidebar-border" />

          <div className="mb-2">
            {sidebarOpen && (
              <span className="px-3 text-xs font-medium uppercase text-sidebar-foreground/50">
                Admin
              </span>
            )}
          </div>
          {adminItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200',
                  'hover:bg-sidebar-accent',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="flex-1 animate-fade-in">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground font-medium">
              AD
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <p className="text-sm font-medium text-sidebar-foreground">Alex Doe</p>
                <p className="text-xs text-sidebar-foreground/60">Student</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
