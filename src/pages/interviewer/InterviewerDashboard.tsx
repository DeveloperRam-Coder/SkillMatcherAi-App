
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Video, Clock, ClipboardCheck, Users, BarChart3, FileText, MessageSquare, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import InterviewerLayout from "@/components/layout/InterviewerLayout";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const mockInterviews = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    type: "Technical",
    date: "2024-01-20",
    time: "10:00 AM - 11:00 AM",
    feedbackStatus: "pending",
    videoLink: "https://zoom.us/j/123456789"
  },
  {
    id: "2",
    candidateName: "Michael Chen",
    position: "Product Manager",
    type: "Behavioral",
    date: "2024-01-20",
    time: "2:00 PM - 3:00 PM",
    feedbackStatus: "pending",
    videoLink: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: "3",
    candidateName: "Emily Davis",
    position: "UX Designer",
    type: "Portfolio Review",
    date: "2024-01-21",
    time: "11:30 AM - 12:30 PM",
    feedbackStatus: "completed",
    videoLink: "https://teams.microsoft.com/l/meetup-join/123"
  }
];

const mockFeedback = [
  {
    id: "1",
    candidateName: "Emily Davis",
    position: "UX Designer",
    interviewDate: "2024-01-19",
    status: "completed",
    rating: 4.5,
    recommendation: "Hire"
  },
  {
    id: "2",
    candidateName: "David Wilson",
    position: "Data Scientist",
    interviewDate: "2024-01-18",
    status: "completed",
    rating: 3.8,
    recommendation: "Neutral"
  }
];

const InterviewerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const getFeedbackStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getFeedbackStatusIcon = (status: string) => {
    const icons = {
      'pending': AlertCircle,
      'completed': CheckCircle,
      'overdue': XCircle
    };
    return icons[status] || AlertCircle;
  };

  const getRecommendationColor = (recommendation: string) => {
    const colors = {
      'Strong Hire': 'bg-emerald-100 text-emerald-800',
      'Hire': 'bg-green-100 text-green-800',
      'Neutral': 'bg-yellow-100 text-yellow-800',
      'No Hire': 'bg-red-100 text-red-800',
      'Strong No Hire': 'bg-red-100 text-red-800'
    };
    return colors[recommendation] || 'bg-gray-100 text-gray-800';
  };

  const todayInterviews = mockInterviews.filter(interview => 
    new Date(interview.date).toDateString() === new Date().toDateString()
  );
  const pendingFeedback = mockInterviews.filter(interview => interview.feedbackStatus === 'pending').length;
  const completedInterviews = mockInterviews.filter(interview => interview.feedbackStatus === 'completed').length;
  const totalCandidates = mockInterviews.length;
  
  return (
    <InterviewerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Interviewer Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/interviewer/feedback')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
            <Button onClick={() => navigate('/interviewer/profile')}>
              <Users className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-full">
            <ClipboardCheck className="h-5 w-5 text-purple-700" />
          </div>
          <div>
            <p className="text-purple-700">Welcome back, {user?.firstName || user?.name || 'Interviewer'}! You have {todayInterviews.length} interview{todayInterviews.length !== 1 ? 's' : ''} today and {pendingFeedback} pending feedback form{pendingFeedback !== 1 ? 's' : ''}.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Interviews
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayInterviews.length}</div>
              <p className="text-xs text-muted-foreground">
                {todayInterviews.length > 0 ? `Next interview in ${Math.ceil((new Date(todayInterviews[0].time.split(' - ')[0]).getTime() - new Date().getTime()) / (1000 * 60 * 60))} hours` : 'No interviews today'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Feedback
              </CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingFeedback}</div>
              <p className="text-xs text-muted-foreground">
                {pendingFeedback > 0 ? `${pendingFeedback} due within 24 hours` : 'All caught up'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Interviews
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedInterviews}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Candidates
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCandidates}</div>
              <p className="text-xs text-muted-foreground">Interviewed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Today's Interviews */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Interviews</CardTitle>
                  <CardDescription>Your scheduled interviews for today</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/interviewer/feedback')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {todayInterviews.length > 0 ? (
                <div className="space-y-4">
                  {todayInterviews.map((interview) => {
                    const StatusIcon = getFeedbackStatusIcon(interview.feedbackStatus);
                    return (
                      <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{interview.candidateName}</h4>
                            <Badge className={getFeedbackStatusColor(interview.feedbackStatus)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {interview.feedbackStatus === 'pending' ? 'Pending Feedback' : 'Completed'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
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
                          {interview.feedbackStatus === 'pending' ? (
                            <Button size="sm" onClick={() => navigate(`/interviewer/feedback/${interview.id}`)}>
                              Submit Feedback
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => navigate(`/interviewer/feedback/${interview.id}`)}>
                              View Feedback
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No interviews scheduled for today</p>
                  <Button className="mt-2" onClick={() => navigate('/interviewer/feedback')}>
                    View Schedule
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>Your latest interview evaluations</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/interviewer/feedback')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFeedback.map((feedback) => (
                  <div key={feedback.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{feedback.candidateName}</h4>
                        <Badge className={getRecommendationColor(feedback.recommendation)}>
                          {feedback.recommendation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.position}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Interviewed {new Date(feedback.interviewDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Rating: {feedback.rating}/5
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/interviewer/feedback/${feedback.id}`)}>
                      View
                    </Button>
                  </div>
                ))}
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
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/interviewer/feedback')}>
                <MessageSquare className="h-6 w-6" />
                <span>Submit Feedback</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/interviewer/profile')}>
                <Users className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/interviewer/feedback')}>
                <ClipboardCheck className="h-6 w-6" />
                <span>Review Schedule</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/interviewer/settings')}>
                <BarChart3 className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </InterviewerLayout>
  );
};

export default InterviewerDashboard;
