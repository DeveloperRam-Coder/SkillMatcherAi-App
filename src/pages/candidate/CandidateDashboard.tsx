
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Video, Clock, User, FileText, Briefcase, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import CandidateLayout from "@/components/layout/CandidateLayout";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const mockInterviews = [
  {
    id: "1",
    position: "Frontend Developer",
    company: "TechCorp Solutions",
    type: "Technical",
    date: "2024-01-25",
    time: "10:00 AM - 11:00 AM",
    interviewers: ["Alex Chen"],
    status: "upcoming",
    videoLink: "https://zoom.us/j/123456789"
  },
  {
    id: "2",
    position: "React Developer",
    company: "Digital Innovations",
    type: "Behavioral",
    date: "2024-01-28",
    time: "2:00 PM - 3:00 PM",
    interviewers: ["Lisa Wong", "David Kim"],
    status: "upcoming",
    videoLink: "https://meet.google.com/abc-defg-hij"
  },
];

const mockApplications = [
  {
    id: "1",
    company: "TechCorp Solutions",
    position: "Frontend Developer",
    status: "Interview",
    appliedDate: "2024-01-10",
    lastUpdated: "2024-01-18"
  },
  {
    id: "2",
    company: "InnovateLab",
    position: "Full Stack Developer",
    status: "Screening",
    appliedDate: "2024-01-12",
    lastUpdated: "2024-01-16"
  },
  {
    id: "3",
    company: "DataFlow Systems",
    position: "Frontend Engineer",
    status: "Applied",
    appliedDate: "2024-01-15",
    lastUpdated: "2024-01-15"
  }
];

const CandidateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Screening': 'bg-yellow-100 text-yellow-800',
      'Interview': 'bg-purple-100 text-purple-800',
      'Offer': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'Applied': Clock,
      'Screening': AlertCircle,
      'Interview': Calendar,
      'Offer': CheckCircle,
      'Rejected': AlertCircle
    };
    return icons[status] || Clock;
  };

  const upcomingInterviews = mockInterviews.filter(interview => interview.status === 'upcoming');
  const activeApplications = mockApplications.filter(app => ['Applied', 'Screening', 'Interview'].includes(app.status));
  const offers = mockApplications.filter(app => app.status === 'Offer').length;
  
  return (
    <CandidateLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Candidate Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/candidate/applications')}>
              <FileText className="mr-2 h-4 w-4" />
              My Applications
            </Button>
            <Button onClick={() => navigate('/candidate/profile')}>
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full">
            <User className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-green-700">Welcome back, {user?.firstName || user?.name || 'Candidate'}! You have {upcomingInterviews.length} upcoming interview{upcomingInterviews.length !== 1 ? 's' : ''}.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Interviews
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingInterviews.length > 0 ? `Next interview in ${Math.ceil((new Date(upcomingInterviews[0].date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` : 'No upcoming interviews'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeApplications.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {activeApplications.length} different companies
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Offers Received
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offers}</div>
              <p className="text-xs text-muted-foreground">
                {offers > 0 ? 'Congratulations!' : 'Keep applying'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Completion
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Complete your profile to improve chances
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Your scheduled interviews</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/candidate/applications')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{interview.position}</h4>
                          <Badge variant="outline">{interview.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(interview.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {interview.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {interview.videoLink && (
                          <Button size="sm" variant="outline" onClick={() => window.open(interview.videoLink, '_blank')}>
                            <Video className="mr-2 h-3 w-3" />
                            Join
                          </Button>
                        )}
                        <Button size="sm" onClick={() => navigate(`/candidate/applications/${interview.id}`)}>
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No upcoming interviews</p>
                  <Button className="mt-2" onClick={() => navigate('/candidate/applications')}>
                    Browse Jobs
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Your latest job applications</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/candidate/applications')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockApplications.slice(0, 3).map((application) => {
                  const StatusIcon = getStatusIcon(application.status);
                  return (
                    <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{application.position}</h4>
                          <Badge className={getStatusColor(application.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                          <span>Updated {new Date(application.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/candidate/applications/${application.id}`)}>
                        View
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/candidate/applications/new')}>
                <Briefcase className="h-6 w-6" />
                <span>Apply to Jobs</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/candidate/profile')}>
                <User className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/candidate/applications')}>
                <FileText className="h-6 w-6" />
                <span>Track Applications</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/candidate/settings')}>
                <TrendingUp className="h-6 w-6" />
                <span>Career Goals</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CandidateLayout>
  );
};

export default CandidateDashboard;
