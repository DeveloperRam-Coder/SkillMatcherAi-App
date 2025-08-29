import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Share2
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
import CandidateLayout from '@/components/layout/CandidateLayout';
import { useToast } from '@/components/ui/use-toast';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
  appliedDate: string;
  lastUpdated: string;
  jobDescription: string;
  requirements: string[];
  companyLogo?: string;
  interviewDate?: string;
  notes?: string;
  jobUrl?: string;
}

const mockApplications: JobApplication[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    status: 'Interview',
    appliedDate: '2024-01-10',
    lastUpdated: '2024-01-18',
    jobDescription: 'We are looking for a Senior Frontend Developer to join our growing team...',
    requirements: ['React', 'TypeScript', '5+ years experience', 'Team leadership'],
    companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp',
    interviewDate: '2024-01-25',
    notes: 'Technical interview scheduled for next week. Focus on React and system design.',
    jobUrl: 'https://techcorp.com/careers/frontend-developer'
  },
  {
    id: '2',
    company: 'InnovateLab',
    position: 'Full Stack Developer',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    status: 'Screening',
    appliedDate: '2024-01-12',
    lastUpdated: '2024-01-16',
    jobDescription: 'Join our innovative team building cutting-edge web applications...',
    requirements: ['JavaScript', 'Node.js', 'React', '3+ years experience'],
    companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=InnovateLab',
    notes: 'Initial screening call completed. Moving to technical assessment.',
    jobUrl: 'https://innovatelab.com/careers/full-stack'
  },
  {
    id: '3',
    company: 'DataFlow Systems',
    position: 'Frontend Engineer',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    status: 'Applied',
    appliedDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    jobDescription: 'Help us build intuitive data visualization tools...',
    requirements: ['React', 'D3.js', 'TypeScript', '2+ years experience'],
    companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=DataFlow',
    notes: 'Application submitted. Waiting for initial response.',
    jobUrl: 'https://dataflow.com/careers/frontend-engineer'
  },
  {
    id: '4',
    company: 'CloudTech Inc.',
    position: 'React Developer',
    location: 'Austin, TX',
    salary: '$85,000 - $110,000',
    status: 'Offer',
    appliedDate: '2024-01-05',
    lastUpdated: '2024-01-20',
    jobDescription: 'Join our cloud infrastructure team...',
    requirements: ['React', 'JavaScript', 'CSS', '1+ years experience'],
    companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=CloudTech',
    interviewDate: '2024-01-18',
    notes: 'Offer received! $95,000 base + benefits. Considering the opportunity.',
    jobUrl: 'https://cloudtech.com/careers/react-developer'
  },
  {
    id: '5',
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    location: 'Remote',
    salary: '$70,000 - $90,000',
    status: 'Rejected',
    appliedDate: '2024-01-08',
    lastUpdated: '2024-01-17',
    jobDescription: 'Early-stage startup looking for passionate developers...',
    requirements: ['React', 'JavaScript', 'CSS', '1+ years experience'],
    companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=StartupXYZ',
    notes: 'Rejected after technical interview. Need to improve system design skills.',
    jobUrl: 'https://startupxyz.com/careers/frontend'
  },
  {
    id: '6',
    company: 'Enterprise Solutions',
    position: 'Senior UI Developer',
    location: 'Chicago, IL',
    salary: '$110,000 - $140,000',
    status: 'Withdrawn',
    appliedDate: '2024-01-03',
    lastUpdated: '2024-01-14',
    jobDescription: 'Large enterprise company seeking experienced UI developers...',
    requirements: ['React', 'Angular', 'Design systems', '5+ years experience'],
    companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Enterprise',
    notes: 'Withdrew application due to better opportunity elsewhere.',
    jobUrl: 'https://enterprise.com/careers/ui-developer'
  }
];

const CandidateApplications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  useEffect(() => {
    filterApplications();
  }, [searchQuery, statusFilter, locationFilter, applications]);

  const filterApplications = () => {
    let filtered = applications;

    if (searchQuery) {
      filtered = filtered.filter(application =>
        application.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(application => application.status === statusFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(application => application.location === locationFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleStatusChange = (applicationId: string, newStatus: JobApplication['status']) => {
    setApplications(prev => 
      prev.map(application => 
        application.id === applicationId 
          ? { ...application, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : application
      )
    );

    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const handleDeleteApplication = (applicationId: string) => {
    setApplications(prev => prev.filter(application => application.id !== applicationId));
    
    toast({
      title: "Application Deleted",
      description: "Application has been removed from your list",
    });
  };

  const getStatusColor = (status: JobApplication['status']) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Screening': 'bg-yellow-100 text-yellow-800',
      'Interview': 'bg-purple-100 text-purple-800',
      'Offer': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: JobApplication['status']) => {
    const icons = {
      'Applied': Clock,
      'Screening': AlertCircle,
      'Interview': Calendar,
      'Offer': CheckCircle,
      'Rejected': XCircle,
      'Withdrawn': XCircle
    };
    return icons[status] || Clock;
  };

  const getLocations = () => {
    const locations = Array.from(new Set(applications.map(a => a.location)));
    return locations;
  };

  const getStats = () => {
    const total = applications.length;
    const active = applications.filter(a => ['Applied', 'Screening', 'Interview'].includes(a.status)).length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;

    return { total, active, offers, rejected };
  };

  const stats = getStats();

  return (
    <CandidateLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Applications</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Track and manage your job applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => navigate('/candidate/applications/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {filteredApplications.length} filtered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.offers}</div>
              <p className="text-xs text-muted-foreground">Received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
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
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
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
                    {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'].map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {getLocations().map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>
              Track your job applications and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const StatusIcon = getStatusIcon(application.status);
                return (
                  <div
                    key={application.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={application.companyLogo} />
                        <AvatarFallback>{application.company.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">
                            {application.position}
                          </h3>
                          <Badge className={getStatusColor(application.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {application.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {application.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {application.salary}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Applied {new Date(application.appliedDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated {new Date(application.lastUpdated).toLocaleDateString()}
                          </span>
                          {application.interviewDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Interview {new Date(application.interviewDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground max-w-2xl">
                          {application.jobDescription.substring(0, 150)}...
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {application.requirements.slice(0, 4).map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {application.requirements.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{application.requirements.length - 4} more
                            </Badge>
                          )}
                        </div>
                        
                        {application.notes && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-800 mb-1">Notes:</p>
                            <p className="text-sm text-blue-700">{application.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {application.jobUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(application.jobUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Job
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/candidate/applications/${application.id}`)}
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
                          <DropdownMenuItem onClick={() => navigate(`/candidate/applications/${application.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/candidate/applications/${application.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {application.jobUrl && (
                            <DropdownMenuItem onClick={() => window.open(application.jobUrl, '_blank')}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Job Posting
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'].map(status => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() => handleStatusChange(application.id, status as JobApplication['status'])}
                            >
                              {status}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteApplication(application.id)}
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
    </CandidateLayout>
  );
};

export default CandidateApplications;
