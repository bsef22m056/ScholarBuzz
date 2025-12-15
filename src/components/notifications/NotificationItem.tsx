import { Notification } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { Bell, Clock, Target, User, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
}

export const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'match':
        return <Target className="h-5 w-5 text-primary" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'profile':
        return <User className="h-5 w-5 text-accent" />;
      case 'system':
        return <Settings className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'match':
        return 'bg-primary/10 border-primary/20';
      case 'deadline':
        return 'bg-warning/10 border-warning/20';
      case 'profile':
        return 'bg-accent/10 border-accent/20';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-lg border p-4 transition-all duration-200 cursor-pointer',
        'hover:shadow-md hover:-translate-y-0.5',
        notification.read ? 'bg-card' : getTypeColor(),
        !notification.read && 'animate-slide-up'
      )}
      onClick={() => onClick?.(notification)}
    >
      <div className={cn(
        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
        notification.read ? 'bg-muted' : 'bg-card'
      )}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn(
            'text-sm font-medium',
            notification.read ? 'text-muted-foreground' : 'text-foreground'
          )}>
            {notification.title}
          </h4>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};
