import { MainLayout } from '@/components/layout/MainLayout';
import { useAppStore } from '@/stores/useAppStore';
import { StatCard } from '@/components/cards/StatCard';
import { ProgressRing } from '@/components/ui/progress-ring';
import { ScholarshipCard } from '@/components/cards/ScholarshipCard';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  FileText, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  GraduationCap,
  MessageSquare,
  User,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user, scholarships, notifications, applications } = useAppStore();
  
  const topScholarships = scholarships.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);
  const upcomingDeadlines = scholarships
    .filter((s) => s.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  const pendingApplications = applications.filter((a) => a.status === 'draft' || a.status === 'submitted').length;
  const submittedApplications = applications.filter((a) => a.status === 'submitted').length;

  return (
    <MainLayout title={`Welcome back, ${user.name.split(' ')[0]}!`} subtitle="Here's your scholarship dashboard">
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Matches"
            value={scholarships.length}
            trend={{ value: 12, label: 'this week' }}
            icon={<Target className="h-6 w-6 text-primary" />}
            variant="primary"
          />
          <StatCard
            title="Applications"
            value={`${submittedApplications}/${pendingApplications}`}
            subtitle="Submitted / Total"
            icon={<FileText className="h-6 w-6 text-secondary" />}
            variant="success"
          />
          <StatCard
            title="Average Match Score"
            value="87%"
            trend={{ value: 5, label: 'improvement' }}
            icon={<TrendingUp className="h-6 w-6 text-accent" />}
          />
          <StatCard
            title="Deadline Soon"
            value={upcomingDeadlines.length}
            subtitle="Within 30 days"
            icon={<Clock className="h-6 w-6 text-warning" />}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Top Matches */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Scholarships */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Top Matches</h2>
                  <p className="text-sm text-muted-foreground">Your best scholarship opportunities</p>
                </div>
                <Link to="/scholarships">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {topScholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    onViewDetails={() => {}}
                  />
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h2>
                  <p className="text-sm text-muted-foreground">Don't miss these opportunities</p>
                </div>
              </div>
              <div className="space-y-3">
                {upcomingDeadlines.map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className={cn(
                      'flex items-center justify-between rounded-lg border p-4 transition-colors',
                      scholarship.daysLeft <= 7 ? 'border-destructive/30 bg-destructive/5' :
                      scholarship.daysLeft <= 14 ? 'border-warning/30 bg-warning/5' :
                      'border-border'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold',
                        scholarship.daysLeft <= 7 ? 'bg-destructive text-destructive-foreground' :
                        scholarship.daysLeft <= 14 ? 'bg-warning text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      )}>
                        {scholarship.daysLeft}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{scholarship.name}</h4>
                        <p className="text-sm text-muted-foreground">{scholarship.deadline}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Strength */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Profile Strength</h2>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-primary">
                    Edit
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center">
                <ProgressRing value={user.profileStrength} size={140} label="Complete" />
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Complete your profile to get better matches
                </p>
              </div>
              <div className="mt-4 space-y-2">
                {user.completedSections.map((section) => (
                  <div key={section} className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{section}</span>
                  </div>
                ))}
                {user.pendingSections.map((section) => (
                  <div key={section} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Circle className="h-4 w-4" />
                    <span>{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                <Link to="/notifications">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/scholarships" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Explore Scholarships
                  </Button>
                </Link>
                <Link to="/chat" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    Ask AI Assistant
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <User className="h-5 w-5 text-secondary" />
                    Update Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
