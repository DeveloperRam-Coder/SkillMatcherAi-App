import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Video,
  Clock,
  Users,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  Square
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Interview, InterviewStatus, InterviewType } from '../../types';
import AdminLayout from '@/components/layout/AdminLayout';
import { useToast } from '@/components/ui/use-toast';

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Sarah Johnson',
    position: 'Frontend Developer',
    type: 'Technical',
    status: 'Scheduled',
    date: '2024-01-20',
    startTime: '10:00',
    endTime: '11:00',
    interviewers: ['Alex Chen', 'Lisa Wong'],
    location: 'Conference Room A',
    videoLink: 'https://zoom.us/j/123456789',
    notes: 'Focus on React and TypeScript skills',
    timeZone: 'EST',
    conferencing: {
      platform: 'Zoom',
      link: 'https://zoom.us/j/123456789',
      meetingId: '123456789',
      password: '123456'
    }
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Michael Chen',
    position: 'Backend Developer',
    type: 'Behavioral',
    status: 'Confirmed',
    date: '2024-01-20',
    startTime: '14:00',
    endTime: '15:00',
    interviewers: ['David Kim'],
    location: 'Conference Room B',
    videoLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Cultural fit assessment',
    timeZone: 'EST',
    conferencing: {
      platform: 'Google Meet',
      link: 'https://meet.google.com/abc-defg-hij',
      meetingId: 'abc-defg-hij'
    }
  },
  {
    id: '3',
    candidateId: '3',
    candidateName: 'Emily Davis',
    position: 'UX Designer',
    type: 'Portfolio Review',
    status: 'Completed',
    date: '2024-01-19',
    startTime: '11:00',
    endTime: '12:00',
    interviewers: ['Sarah Wilson', 'Mike Johnson'],
    location: 'Design Studio',
    videoLink: 'https://teams.microsoft.com/l/meetup-join/123',
    notes: 'Portfolio presentation and design thinking',
    timeZone: 'EST',
    conferencing: {
      platform: 'Microsoft Teams',
      link: 'https://teams.microsoft.com/l/meetup-join/123',
      meetingId: '123'
    }
  },
  {
    id: '4',
    candidateId: '4',
    candidateName: 'David Wilson',
    position: 'Product Manager',
    type: 'Final',
    status: 'In Progress',
    date: '2024-01-20',
    startTime: '16:00',
    endTime: '17:00',
    interviewers: ['CEO', 'CTO', 'HR Director'],
    location: 'Board Room',
    videoLink: 'https://zoom.us/j/987654321',
    notes: 'Final round with executive team',
    timeZone: 'EST',
    conferencing: {
      platform: 'Zoom',
      link: 'https://zoom.us/j/987654321',
      meetingId: '987654321',
      password: '654321'
    }
  },
  {
    id: '5',
    candidateId: '5',
    candidateName: 'Lisa Brown',
    position: 'Data Scientist',
    type: 'Technical',
    status: 'Canceled',
    date: '2024-01-18',
    startTime: '13:00',
    endTime: '14:00',
    interviewers: ['Data Team Lead'],
    location: 'Conference Room C',
    videoLink: 'https://meet.google.com/xyz-uvwx-yz',
    notes: 'Cancelled due to candidate illness',
    timeZone: 'EST',
    conferencing: {
      platform: 'Google Meet',
      link: 'https://meet.google.com/xyz-uvwx-yz',
      meetingId: 'xyz-uvwx-yz'
    }
  }
];

const AdminInterviews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>(mockInterviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  useEffect(() => {
    filterInterviews();
  }, [searchQuery, statusFilter, typeFilter, dateFilter, interviews]);

  const filterInterviews = () => {
    let filtered = interviews;

    if (searchQuery) {
      filtered = filtered.filter(interview =>
        interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.interviewers.some(interviewer => 
          interviewer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(interview => interview.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(interview => interview.type === typeFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      filtered = filtered.filter(interview => {
        const interviewDate = new Date(interview.date);
        switch (dateFilter) {
          case 'today':
            return interviewDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return interviewDate.toDateString() === tomorrow.toDateString();
          case 'this-week':
            return interviewDate >= today && interviewDate <= nextWeek;
          default:
            return true;
        }
      });
    }

    setFilteredInterviews(filtered);
  };

  const handleStatusChange = (interviewId: string, newStatus: InterviewStatus) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === interviewId 
          ? { ...interview, status: newStatus }
          : interview
      )
    );

    toast({
      title: "Status Updated",
      description: `Interview status changed to ${newStatus}`,
    });
  };

  const handleDeleteInterview = (interviewId: string) => {
    setInterviews(prev => prev.filter(interview => interview.id !== interviewId));
    
    toast({
      title: "Interview Deleted",
      description: "Interview has been removed from the system",
    });
  };

  const getStatusColor = (status: InterviewStatus) => {
    const colors = {
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Confirmed': 'bg-green-100 text-green-800',
      'Completed': 'bg-emerald-100 text-emerald-800',
      'Canceled': 'bg-red-100 text-red-800',
      'Rescheduled': 'bg-yellow-100 text-yellow-800',
      'No Show': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      'Pending Feedback': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: InterviewStatus) => {
    const icons = {
      'Scheduled': Clock,
      'Confirmed': CheckCircle,
      'Completed': CheckCircle,
      'Canceled': XCircle,
      'Rescheduled': AlertCircle,
      'No Show': XCircle,
      'In Progress': Play,
      'Pending Feedback': AlertCircle
    };
    return icons[status] || Clock;
  };

  const getTypeColor = (type: InterviewType) => {
    const colors = {
      'Screening': 'bg-blue-100 text-blue-800',
      'Technical': 'bg-purple-100 text-purple-800',
      'Behavioral': 'bg-green-100 text-green-800',
      'Cultural': 'bg-indigo-100 text-indigo-800',
      'Final': 'bg-orange-100 text-orange-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Panel': 'bg-yellow-100 text-yellow-800',
      'Group': 'bg-teal-100 text-teal-800',
      'One-on-One': 'bg-gray-100 text-gray-800',
      'Coding Assessment': 'bg-red-100 text-red-800',
      'Case Study': 'bg-emerald-100 text-emerald-800',
      'Portfolio Review': 'bg-violet-100 text-violet-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getUpcomingInterviews = () => {
    const today = new Date();
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate >= today && ['Scheduled', 'Confirmed'].includes(interview.status);
    }).length;
  };

  const getCompletedInterviews = () => {
    return interviews.filter(interview => interview.status === 'Completed').length;
  };

  const getCanceledInterviews = () => {
    return interviews.filter(interview => interview.status === 'Canceled').length;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Interviews</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Schedule and manage all candidate interviews
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate('/admin/interviews/schedule')}>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search interviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {Object.values(InterviewStatus).map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.values(InterviewType).map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviews.length}</div>
              <p className="text-xs text-muted-foreground">
                {filteredInterviews.length} filtered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUpcomingInterviews()}</div>
              <p className="text-xs text-muted-foreground">Scheduled & confirmed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCompletedInterviews()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canceled</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCanceledInterviews()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Interviews List */}
        <Card>
          <CardHeader>
            <CardTitle>Interviews ({filteredInterviews.length})</CardTitle>
            <CardDescription>
              Manage interview schedules and track progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInterviews.map((interview) => {
                const StatusIcon = getStatusIcon(interview.status);
                return (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">
                          {new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {interview.startTime} - {interview.endTime}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {interview.candidateName}
                          </h3>
                          <Badge className={getStatusColor(interview.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {interview.status}
                          </Badge>
                          <Badge variant="outline" className={getTypeColor(interview.type)}>
                            {interview.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {interview.position}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {interview.interviewers.join(', ')}
                          </span>
                          {interview.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {interview.location}
                            </span>
                          )}
                        </div>
                        
                        {interview.notes && (
                          <p className="text-sm text-muted-foreground max-w-md">
                            {interview.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {interview.videoLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(interview.videoLink, '_blank')}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/interviews/${interview.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/admin/interviews/${interview.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/interviews/${interview.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {interview.videoLink && (
                            <DropdownMenuItem onClick={() => window.open(interview.videoLink, '_blank')}>
                              <Video className="mr-2 h-4 w-4" />
                              Join Meeting
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          {Object.values(InterviewStatus).map(status => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() => handleStatusChange(interview.id, status)}
                            >
                              {status}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteInterview(interview.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminInterviews;
