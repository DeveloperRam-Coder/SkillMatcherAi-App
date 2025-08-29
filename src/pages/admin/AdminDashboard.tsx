import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  BarChart3,
  Plus,
  MessageSquare,
  Briefcase,
  Settings,
  FileText
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("week");

  const stats = [
    { label: "Total Candidates", value: "156", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Active Interviews", value: "23", change: "+8%", icon: Calendar, color: "text-green-600" },
    { label: "Hire Rate", value: "24%", change: "+3%", icon: TrendingUp, color: "text-purple-600" },
    { label: "Avg Time to Hire", value: "18 days", change: "-2 days", icon: Clock, color: "text-orange-600" },
  ];

  const quickActions = [
    {
      title: "Manage Candidates",
      description: "View and manage candidate applications",
      icon: Users,
      action: () => navigate("/admin/candidates"),
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      title: "Schedule Interviews",
      description: "Create and manage interview schedules",
      icon: Calendar,
      action: () => navigate("/admin/interviews"),
      color: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      title: "Review Feedback",
      description: "Evaluate interview feedback and ratings",
      icon: MessageSquare,
      action: () => navigate("/admin/feedback"),
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    },
    {
      title: "Generate Reports",
      description: "Create hiring analytics and insights",
      icon: BarChart3,
      action: () => navigate("/admin/reports"),
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200"
    },
    {
      title: "Add Candidate",
      description: "Manually add new candidate to system",
      icon: Plus,
      action: () => navigate("/admin/candidates/new"),
      color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
    },
    {
      title: "System Settings",
      description: "Configure application settings",
      icon: Settings,
      action: () => navigate("/admin/settings"),
      color: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New candidate applied",
      candidate: "Sarah Johnson",
      position: "Frontend Developer",
      time: "2 hours ago",
      type: "application"
    },
    {
      id: 2,
      action: "Interview scheduled",
      candidate: "Michael Chen",
      position: "Backend Developer",
      time: "4 hours ago",
      type: "interview"
    },
    {
      id: 3,
      action: "Feedback submitted",
      candidate: "Emily Davis",
      position: "UX Designer",
      time: "6 hours ago",
      type: "feedback"
    },
    {
      id: 4,
      action: "Offer sent",
      candidate: "David Wilson",
      position: "Product Manager",
      time: "1 day ago",
      type: "offer"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'interview':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'feedback':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'offer':
        return <Briefcase className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'application':
        return 'bg-blue-50 border-blue-200';
      case 'interview':
        return 'bg-green-50 border-green-200';
      case 'feedback':
        return 'bg-purple-50 border-purple-200';
      case 'offer':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Hiring overview and team management
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate("/admin/candidates/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate("/admin/reports")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from last {timeframe}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Essential administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-24 flex-col gap-2 ${action.color} hover:scale-105 transition-transform`}
                      onClick={action.action}
                    >
                      <Icon className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from the hiring process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${getActivityColor(activity.type)}`}
                  >
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.candidate} - {activity.position}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hiring Pipeline Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Pipeline Overview</CardTitle>
            <CardDescription>Current status of candidates in the hiring process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm font-medium">Applied</div>
                <div className="text-xs text-muted-foreground">New applications</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">28</div>
                <div className="text-sm font-medium">Screening</div>
                <div className="text-xs text-muted-foreground">Under review</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">23</div>
                <div className="text-sm font-medium">Interview</div>
                <div className="text-xs text-muted-foreground">In progress</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm font-medium">Offer</div>
                <div className="text-xs text-muted-foreground">Pending decision</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">8</div>
                <div className="text-sm font-medium">Hired</div>
                <div className="text-xs text-muted-foreground">This month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
