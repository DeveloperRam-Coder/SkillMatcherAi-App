import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Star,
  Clock,
  User,
  Briefcase,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
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
import { Feedback, Recommendation, Interview } from '../../types';
import AdminLayout from '@/components/layout/AdminLayout';
import { useToast } from '@/components/ui/use-toast';

const mockFeedback: Feedback[] = [
  {
    id: '1',
    interviewId: '1',
    evaluatorId: '1',
    evaluatorName: 'Alex Chen',
    overallRating: 4.5,
    recommendation: 'Hire',
    strengths: 'Strong technical skills in React and TypeScript. Excellent problem-solving approach and communication.',
    weaknesses: 'Could improve on system design questions. Limited experience with backend technologies.',
    notes: 'Great candidate for frontend role. Would recommend moving to next round.',
    submittedAt: '2024-01-19T15:30:00Z',
    categories: [
      { name: 'Technical Skills', rating: 5, comments: 'Excellent React knowledge' },
      { name: 'Problem Solving', rating: 4, comments: 'Good analytical thinking' },
      { name: 'Communication', rating: 4, comments: 'Clear and articulate' },
      { name: 'Culture Fit', rating: 5, comments: 'Great team player' }
    ]
  },
  {
    id: '2',
    interviewId: '2',
    evaluatorId: '2',
    evaluatorName: 'David Kim',
    overallRating: 3.8,
    recommendation: 'Neutral',
    strengths: 'Good behavioral responses. Shows leadership potential and team collaboration skills.',
    weaknesses: 'Some answers felt rehearsed. Could provide more specific examples.',
    notes: 'Candidate shows potential but needs more authentic responses. Consider second interview.',
    submittedAt: '2024-01-19T16:45:00Z',
    categories: [
      { name: 'Leadership', rating: 4, comments: 'Shows initiative' },
      { name: 'Teamwork', rating: 4, comments: 'Collaborative approach' },
      { name: 'Communication', rating: 3, comments: 'Could be more specific' },
      { name: 'Culture Fit', rating: 4, comments: 'Good alignment with values' }
    ]
  },
  {
    id: '3',
    interviewId: '3',
    evaluatorId: '3',
    evaluatorName: 'Sarah Wilson',
    overallRating: 4.8,
    recommendation: 'Strong Hire',
    strengths: 'Outstanding portfolio with innovative designs. Strong user research methodology and presentation skills.',
    weaknesses: 'Could improve on technical implementation details.',
    notes: 'Exceptional designer with strong strategic thinking. Highly recommend for hire.',
    submittedAt: '2024-01-18T14:20:00Z',
    categories: [
      { name: 'Design Skills', rating: 5, comments: 'Exceptional portfolio' },
      { name: 'User Research', rating: 5, comments: 'Strong methodology' },
      { name: 'Presentation', rating: 5, comments: 'Excellent communication' },
      { name: 'Strategic Thinking', rating: 4, comments: 'Good business sense' }
    ]
  },
  {
    id: '4',
    interviewId: '4',
    evaluatorId: '4',
    evaluatorName: 'CEO',
    overallRating: 4.2,
    recommendation: 'Hire',
    strengths: 'Strong strategic thinking and business acumen. Excellent presentation skills and industry knowledge.',
    weaknesses: 'Could improve on technical depth for technical product roles.',
    notes: 'Great candidate for product leadership. Strong business sense and communication.',
    submittedAt: '2024-01-20T17:15:00Z',
    categories: [
      { name: 'Strategic Thinking', rating: 5, comments: 'Excellent business sense' },
      { name: 'Leadership', rating: 4, comments: 'Shows executive potential' },
      { name: 'Communication', rating: 5, comments: 'Clear and persuasive' },
      { name: 'Industry Knowledge', rating: 4, comments: 'Good understanding' }
    ]
  },
  {
    id: '5',
    interviewId: '5',
    evaluatorId: '5',
    evaluatorName: 'Data Team Lead',
    overallRating: 2.5,
    recommendation: 'No Hire',
    strengths: 'Basic understanding of data concepts.',
    weaknesses: 'Poor technical skills, weak problem-solving, limited practical experience.',
    notes: 'Candidate does not meet the technical requirements for the role.',
    submittedAt: '2024-01-17T13:10:00Z',
    categories: [
      { name: 'Technical Skills', rating: 2, comments: 'Below requirements' },
      { name: 'Problem Solving', rating: 2, comments: 'Weak analytical thinking' },
      { name: 'Practical Experience', rating: 3, comments: 'Limited hands-on work' },
      { name: 'Communication', rating: 3, comments: 'Basic communication skills' }
    ]
  }
];

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Sarah Johnson',
    position: 'Frontend Developer',
    type: 'Technical',
    status: 'Completed',
    date: '2024-01-19',
    startTime: '10:00',
    endTime: '11:00',
    interviewers: ['Alex Chen', 'Lisa Wong'],
    location: 'Conference Room A'
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Michael Chen',
    position: 'Backend Developer',
    type: 'Behavioral',
    status: 'Completed',
    date: '2024-01-19',
    startTime: '14:00',
    endTime: '15:00',
    interviewers: ['David Kim'],
    location: 'Conference Room B'
  },
  {
    id: '3',
    candidateId: '3',
    candidateName: 'Emily Davis',
    position: 'UX Designer',
    type: 'Portfolio Review',
    status: 'Completed',
    date: '2024-01-18',
    startTime: '11:00',
    endTime: '12:00',
    interviewers: ['Sarah Wilson', 'Mike Johnson'],
    location: 'Design Studio'
  },
  {
    id: '4',
    candidateId: '4',
    candidateName: 'David Wilson',
    position: 'Product Manager',
    type: 'Final',
    status: 'Completed',
    date: '2024-01-20',
    startTime: '16:00',
    endTime: '17:00',
    interviewers: ['CEO', 'CTO', 'HR Director'],
    location: 'Board Room'
  },
  {
    id: '5',
    candidateId: '5',
    candidateName: 'Lisa Brown',
    position: 'Data Scientist',
    type: 'Technical',
    status: 'Completed',
    date: '2024-01-17',
    startTime: '13:00',
    endTime: '14:00',
    interviewers: ['Data Team Lead'],
    location: 'Conference Room C'
  }
];

const AdminFeedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>(mockFeedback);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendationFilter, setRecommendationFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    filterFeedback();
  }, [searchQuery, recommendationFilter, ratingFilter, statusFilter, feedback]);

  const filterFeedback = () => {
    let filtered = feedback;

    if (searchQuery) {
      filtered = filtered.filter(feedback =>
        feedback.evaluatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCandidateName(feedback.interviewId).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getPosition(feedback.interviewId).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (recommendationFilter !== 'all') {
      filtered = filtered.filter(feedback => feedback.recommendation === recommendationFilter);
    }

    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(feedback => feedback.overallRating >= minRating);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(feedback => {
        const interview = mockInterviews.find(i => i.id === feedback.interviewId);
        return interview?.status === statusFilter;
      });
    }

    setFilteredFeedback(filtered);
  };

  const getCandidateName = (interviewId: string) => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    return interview?.candidateName || 'Unknown';
  };

  const getPosition = (interviewId: string) => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    return interview?.position || 'Unknown';
  };

  const getInterviewDate = (interviewId: string) => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    return interview?.date || '';
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    setFeedback(prev => prev.filter(f => f.id !== feedbackId));
    
    toast({
      title: "Feedback Deleted",
      description: "Feedback has been removed from the system",
    });
  };

  const getRecommendationColor = (recommendation: Recommendation) => {
    const colors = {
      'Strong Hire': 'bg-emerald-100 text-emerald-800',
      'Hire': 'bg-green-100 text-green-800',
      'Neutral': 'bg-yellow-100 text-yellow-800',
      'No Hire': 'bg-red-100 text-red-800',
      'Strong No Hire': 'bg-red-100 text-red-800'
    };
    return colors[recommendation] || 'bg-gray-100 text-gray-800';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getAverageRating = () => {
    if (feedback.length === 0) return 0;
    const total = feedback.reduce((sum, f) => sum + f.overallRating, 0);
    return (total / feedback.length).toFixed(1);
  };

  const getHireRate = () => {
    const hireCount = feedback.filter(f => 
      ['Strong Hire', 'Hire'].includes(f.recommendation)
    ).length;
    return Math.round((hireCount / feedback.length) * 100);
  };

  const getPendingFeedback = () => {
    return mockInterviews.filter(interview => 
      interview.status === 'Completed' && 
      !feedback.some(f => f.interviewId === interview.id)
    ).length;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-current text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-current text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Interview Feedback</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Review and manage interview feedback from evaluators
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
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
                    placeholder="Search feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Recommendation</label>
                <Select value={recommendationFilter} onValueChange={setRecommendationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Recommendations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recommendations</SelectItem>
                    {Object.values(Recommendation).map(rec => (
                      <SelectItem key={rec} value={rec}>{rec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending Feedback">Pending Feedback</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
              <p className="text-xs text-muted-foreground">
                {filteredFeedback.length} filtered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getAverageRating()}</div>
              <p className="text-xs text-muted-foreground">Out of 5 stars</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getHireRate()}%</div>
              <p className="text-xs text-muted-foreground">Positive recommendations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Feedback</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPendingFeedback()}</div>
              <p className="text-xs text-muted-foreground">Awaiting submission</p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback List */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback ({filteredFeedback.length})</CardTitle>
            <CardDescription>
              Review interview feedback and evaluator recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedback.map((feedbackItem) => (
                <div
                  key={feedbackItem.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${feedbackItem.evaluatorName}`} />
                      <AvatarFallback>{feedbackItem.evaluatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {feedbackItem.evaluatorName}
                        </h3>
                        <Badge className={getRecommendationColor(feedbackItem.recommendation)}>
                          {feedbackItem.recommendation}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {renderStars(feedbackItem.overallRating)}
                          <span className={`ml-2 font-medium ${getRatingColor(feedbackItem.overallRating)}`}>
                            {feedbackItem.overallRating}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {getCandidateName(feedbackItem.interviewId)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {getPosition(feedbackItem.interviewId)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(getInterviewDate(feedbackItem.interviewId)).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(feedbackItem.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {feedbackItem.strengths && (
                        <div>
                          <p className="text-sm font-medium text-green-700">Strengths:</p>
                          <p className="text-sm text-muted-foreground">{feedbackItem.strengths}</p>
                        </div>
                      )}
                      
                      {feedbackItem.weaknesses && (
                        <div>
                          <p className="text-sm font-medium text-orange-700">Areas for Improvement:</p>
                          <p className="text-sm text-muted-foreground">{feedbackItem.weaknesses}</p>
                        </div>
                      )}
                      
                      {feedbackItem.notes && (
                        <div>
                          <p className="text-sm font-medium">Notes:</p>
                          <p className="text-sm text-muted-foreground">{feedbackItem.notes}</p>
                        </div>
                      )}
                      
                      {feedbackItem.categories && feedbackItem.categories.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Category Ratings:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {feedbackItem.categories.map((category, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{category.name}:</span>
                                <div className="flex items-center gap-1">
                                  {renderStars(category.rating)}
                                  <span className="text-xs">{category.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/feedback/${feedbackItem.id}`)}
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
                        <DropdownMenuItem onClick={() => navigate(`/admin/feedback/${feedbackItem.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/feedback/${feedbackItem.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/interviews/${feedbackItem.interviewId}`)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Interview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteFeedback(feedbackItem.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;
