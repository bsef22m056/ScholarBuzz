import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Database, 
  Users, 
  GraduationCap, 
  Activity,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Server
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { scholarships } = useAppStore();
  const [isAddingScholarship, setIsAddingScholarship] = useState(false);

  const systemHealth = {
    database: { status: 'healthy', latency: '12ms' },
    matching: { status: 'healthy', latency: '45ms' },
    scraper: { status: 'warning', message: '2 sources offline' },
    ai: { status: 'healthy', latency: '230ms' },
  };

  const recentActivity = [
    { action: 'Scholarship Added', target: 'Commonwealth Scholarship', time: '2 hours ago', user: 'Admin' },
    { action: 'User Registered', target: 'john.doe@example.com', time: '5 hours ago', user: 'System' },
    { action: 'Scraper Run', target: '15 new scholarships', time: '1 day ago', user: 'System' },
    { action: 'Scholarship Expired', target: 'XYZ Fellowship', time: '2 days ago', user: 'System' },
  ];

  const handleRefreshScraper = () => {
    toast({
      title: 'Scraper Started',
      description: 'Data ingestion process has been initiated.',
    });
  };

  return (
    <MainLayout title="Admin Dashboard" subtitle="Manage scholarships and system settings">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="scholarships" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Scholarships
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{scholarships.length}</p>
                    <p className="text-sm text-muted-foreground">Total Scholarships</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Database className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">89%</p>
                    <p className="text-sm text-muted-foreground">Match Accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">342</p>
                    <p className="text-sm text-muted-foreground">Applications Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(systemHealth).map(([key, value]) => (
                  <div
                    key={key}
                    className={cn(
                      'rounded-lg border p-4',
                      value.status === 'healthy' ? 'border-success/30 bg-success/5' :
                      value.status === 'warning' ? 'border-warning/30 bg-warning/5' :
                      'border-destructive/30 bg-destructive/5'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{key}</span>
                      {value.status === 'healthy' ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-warning" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {'latency' in value ? `Latency: ${value.latency}` : value.message}
                    </p>
                  </div>
                ))}
              </div>
              <Button onClick={handleRefreshScraper} variant="outline" className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Data Ingestion
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{activity.action}</TableCell>
                      <TableCell>{activity.target}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{activity.user}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scholarships Tab */}
        <TabsContent value="scholarships" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Scholarship Management</h3>
              <p className="text-sm text-muted-foreground">Add, edit, or remove scholarships</p>
            </div>
            <Dialog open={isAddingScholarship} onOpenChange={setIsAddingScholarship}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Scholarship
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Scholarship</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Scholarship Name</Label>
                      <Input placeholder="e.g., Rhodes Scholarship" />
                    </div>
                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <Input placeholder="e.g., Rhodes Trust" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input placeholder="e.g., $50,000/year" />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="e.g., UK" />
                    </div>
                    <div className="space-y-2">
                      <Label>Deadline</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe the scholarship..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma-separated)</Label>
                    <Input placeholder="e.g., STEM, Graduate, Full Tuition" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingScholarship(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      toast({ title: 'Scholarship Added', description: 'New scholarship has been created.' });
                      setIsAddingScholarship(false);
                    }}>
                      Add Scholarship
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scholarships.map((scholarship) => (
                  <TableRow key={scholarship.id}>
                    <TableCell className="font-medium">{scholarship.name}</TableCell>
                    <TableCell>{scholarship.provider}</TableCell>
                    <TableCell>{scholarship.amount}</TableCell>
                    <TableCell>{scholarship.deadline}</TableCell>
                    <TableCell>
                      <Badge className={scholarship.daysLeft > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}>
                        {scholarship.daysLeft > 0 ? 'Active' : 'Expired'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">User Management</h3>
                <p className="text-muted-foreground max-w-md mt-2">
                  This feature allows you to view registered users, manage permissions, and monitor user activity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Matching Algorithm Settings</CardTitle>
              <CardDescription>Configure the hybrid matching parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rule-based Matching Weight</Label>
                    <p className="text-sm text-muted-foreground">Percentage weight for rule-based matching</p>
                  </div>
                  <Input type="number" className="w-24" defaultValue={60} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI-based Matching Weight</Label>
                    <p className="text-sm text-muted-foreground">Percentage weight for AI-based matching</p>
                  </div>
                  <Input type="number" className="w-24" defaultValue={40} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Real-time Matching</Label>
                    <p className="text-sm text-muted-foreground">Update matches when profile changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Deadline Reminder Days</Label>
                    <p className="text-sm text-muted-foreground">Days before deadline to send reminders</p>
                  </div>
                  <Input type="text" className="w-24" defaultValue="7,3,1" />
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AdminDashboard;
