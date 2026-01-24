import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppStore } from '@/stores/useAppStore';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Target, Clock, User, Settings, CheckCheck, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Notifications = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useAppStore();
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const countByType = {
    match: notifications.filter((n) => n.type === 'match' && !n.read).length,
    deadline: notifications.filter((n) => n.type === 'deadline' && !n.read).length,
    profile: notifications.filter((n) => n.type === 'profile' && !n.read).length,
    system: notifications.filter((n) => n.type === 'system' && !n.read).length,
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    markNotificationRead(notification.id);
  };

  const tabs = [
    { value: 'all', label: 'All', count: unreadCount, icon: Bell },
    { value: 'match', label: 'Matches', count: countByType.match, icon: Target },
    { value: 'deadline', label: 'Deadlines', count: countByType.deadline, icon: Clock },
    { value: 'profile', label: 'Profile', count: countByType.profile, icon: User },
    { value: 'system', label: 'System', count: countByType.system, icon: Settings },
  ];

  return (
    <MainLayout title="Notifications" subtitle="Stay updated on your scholarship journey">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 p-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-2 data-[state=active]:bg-background"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.count > 0 && (
                  <Badge variant="secondary" className="h-5 min-w-5 p-0 flex items-center justify-center text-xs">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={handleNotificationClick}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
                <p className="mt-2 text-muted-foreground">
                  {activeTab === 'all'
                    ? "You're all caught up! We'll notify you when there's something new."
                    : `No ${activeTab} notifications at the moment.`}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings Hint */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Notification Preferences</h4>
              <p className="text-sm text-muted-foreground">
                Configure when and how you receive notifications for matches and deadlines.
              </p>
            </div>
            <Button variant="outline">
              Configure
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
