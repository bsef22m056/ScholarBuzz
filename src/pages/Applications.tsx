import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-muted text-muted-foreground', icon: FileText },
  submitted: { label: 'Submitted', color: 'bg-primary/10 text-primary', icon: CheckCircle2 },
  under_review: { label: 'Under Review', color: 'bg-warning/10 text-warning', icon: AlertCircle },
  accepted: { label: 'Accepted', color: 'bg-success/10 text-success', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-destructive/10 text-destructive', icon: XCircle },
};

const Applications = () => {
  const { applications, scholarships, updateApplication } = useAppStore();
  const [filter, setFilter] = useState<string>('all');

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getScholarship = (id: string) => scholarships.find((s) => s.id === id);

  const getProgressSteps = (status: string) => {
    const steps = ['draft', 'submitted', 'under_review', 'accepted'];
    const currentIndex = steps.indexOf(status);
    return { current: currentIndex + 1, total: steps.length };
  };

  const stats = {
    total: applications.length,
    draft: applications.filter((a) => a.status === 'draft').length,
    submitted: applications.filter((a) => a.status === 'submitted').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
  };

  return (
    <MainLayout title="Applications" subtitle="Track your scholarship applications">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">{stats.draft}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stats.submitted}</div>
              <p className="text-sm text-muted-foreground">Submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{stats.accepted}</div>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Actions */}
        <div className="flex items-center justify-between">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => {
            const scholarship = getScholarship(application.scholarshipId);
            const config = statusConfig[application.status];
            const progress = getProgressSteps(application.status);
            const daysUntilDeadline = Math.ceil(
              (application.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );

            return (
              <Card key={application.id} className="overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {application.scholarshipName}
                        </h3>
                        {scholarship && (
                          <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                        )}
                      </div>
                      <Badge className={cn('gap-1.5', config.color)}>
                        <config.icon className="h-3.5 w-3.5" />
                        {config.label}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          Step {progress.current} of {progress.total}
                        </span>
                      </div>
                      <Progress value={(progress.current / progress.total) * 100} />
                      <div className="flex justify-between mt-2">
                        {['Draft', 'Submitted', 'Review', 'Decision'].map((step, i) => (
                          <span
                            key={step}
                            className={cn(
                              'text-xs',
                              i < progress.current ? 'text-primary font-medium' : 'text-muted-foreground'
                            )}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {application.notes && (
                      <div className="mt-4 p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">{application.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {application.status === 'draft' && (
                        <Button size="sm">
                          Continue Application
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="border-t lg:border-t-0 lg:border-l bg-muted/30 p-6 lg:w-64">
                    <div className="space-y-4">
                      {/* Deadline */}
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Clock className="h-4 w-4" />
                          Deadline
                        </div>
                        <p className={cn(
                          'font-medium',
                          daysUntilDeadline <= 7 ? 'text-destructive' :
                          daysUntilDeadline <= 14 ? 'text-warning' :
                          'text-foreground'
                        )}>
                          {daysUntilDeadline} days left
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.deadline.toLocaleDateString()}
                        </p>
                      </div>

                      {/* Applied Date */}
                      {application.appliedDate && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            Applied
                          </div>
                          <p className="text-sm">
                            {formatDistanceToNow(application.appliedDate, { addSuffix: true })}
                          </p>
                        </div>
                      )}

                      {/* Match Score */}
                      {scholarship && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Match Score</div>
                          <div className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium',
                            scholarship.matchPercentage >= 80 ? 'bg-success/10 text-success' :
                            'bg-primary/10 text-primary'
                          )}>
                            {scholarship.matchPercentage}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">No applications found</h3>
              <p className="text-muted-foreground text-center mt-1">
                {filter === 'all'
                  ? 'Start applying to scholarships to track your progress here.'
                  : `No applications with status "${filter}".`}
              </p>
              <Button className="mt-4">Browse Scholarships</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Applications;
