import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Upload,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  Phone,
  Mail,
  ExternalLink
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
import { Candidate, CandidateStatus } from '../../types';
import AdminLayout from '@/components/layout/AdminLayout';
import { useToast } from '@/components/ui/use-toast';

const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    status: 'Technical',
    position: 'Frontend Developer',
    department: 'Engineering',
    source: 'LinkedIn',
    appliedDate: '2024-01-15',
    skills: [
      { id: '1', name: 'React', category: 'Frontend' },
      { id: '2', name: 'TypeScript', category: 'Frontend' },
      { id: '3', name: 'Node.js', category: 'Backend' }
    ],
    resumeUrl: '/resumes/sarah-johnson.pdf'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    status: 'Screening',
    position: 'Backend Developer',
    department: 'Engineering',
    source: 'Indeed',
    appliedDate: '2024-01-14',
    skills: [
      { id: '4', name: 'Python', category: 'Backend' },
      { id: '5', name: 'Django', category: 'Backend' },
      { id: '6', name: 'PostgreSQL', category: 'Database' }
    ],
    resumeUrl: '/resumes/michael-chen.pdf'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 345-6789',
    status: 'Cultural',
    position: 'UX Designer',
    department: 'Design',
    source: 'Company Website',
    appliedDate: '2024-01-13',
    skills: [
      { id: '7', name: 'Figma', category: 'Design' },
      { id: '8', name: 'Sketch', category: 'Design' },
      { id: '9', name: 'User Research', category: 'Research' }
    ],
    resumeUrl: '/resumes/emily-davis.pdf'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@email.com',
    phone: '+1 (555) 456-7890',
    status: 'Offer',
    position: 'Product Manager',
    department: 'Product',
    source: 'Referral',
    appliedDate: '2024-01-10',
    skills: [
      { id: '10', name: 'Product Strategy', category: 'Product' },
      { id: '11', name: 'Agile', category: 'Methodology' },
      { id: '12', name: 'Data Analysis', category: 'Analytics' }
    ],
    resumeUrl: '/resumes/david-wilson.pdf'
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Brown',
    email: 'lisa.brown@email.com',
    phone: '+1 (555) 567-8901',
    status: 'Hired',
    position: 'Data Scientist',
    department: 'Analytics',
    source: 'LinkedIn',
    appliedDate: '2024-01-08',
    skills: [
      { id: '13', name: 'Python', category: 'Programming' },
      { id: '14', name: 'Machine Learning', category: 'AI/ML' },
      { id: '15', name: 'SQL', category: 'Database' }
    ],
    resumeUrl: '/resumes/lisa-brown.pdf'
  }
];

const AdminCandidates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  useEffect(() => {
    filterCandidates();
  }, [searchQuery, statusFilter, departmentFilter, sourceFilter, candidates]);

  const filterCandidates = () => {
    let filtered = candidates;

    if (searchQuery) {
      filtered = filtered.filter(candidate =>
        candidate.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.status === statusFilter);
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.department === departmentFilter);
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.source === sourceFilter);
    }

    setFilteredCandidates(filtered);
  };

  const handleStatusChange = (candidateId: string, newStatus: CandidateStatus) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );

    toast({
      title: "Status Updated",
      description: `Candidate status changed to ${newStatus}`,
    });
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== candidateId));
    
    toast({
      title: "Candidate Deleted",
      description: "Candidate has been removed from the system",
    });
  };

  const getStatusColor = (status: CandidateStatus) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Screening': 'bg-yellow-100 text-yellow-800',
      'Technical': 'bg-purple-100 text-purple-800',
      'Cultural': 'bg-indigo-100 text-indigo-800',
      'Offer': 'bg-green-100 text-green-800',
      'Hired': 'bg-emerald-100 text-emerald-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDepartments = () => {
    const departments = Array.from(new Set(candidates.map(c => c.department).filter(Boolean)));
    return departments;
  };

  const getSources = () => {
    const sources = Array.from(new Set(candidates.map(c => c.source).filter(Boolean)));
    return sources;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Candidates</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Manage and track all candidate applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button size="sm" onClick={() => navigate('/admin/candidates/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
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
                    placeholder="Search candidates..."
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
                    {Object.values(CandidateStatus).map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {getDepartments().map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {getSources().map(source => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
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
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{candidates.length}</div>
              <p className="text-xs text-muted-foreground">
                {filteredCandidates.length} filtered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidates.filter(c => ['Applied', 'Screening', 'Technical', 'Cultural'].includes(c.status)).length}
              </div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidates.filter(c => c.status === 'Hired').length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Time to Hire</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 days</div>
              <p className="text-xs text-muted-foreground">Industry avg: 24 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Candidates List */}
        <Card>
          <CardHeader>
            <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
            <CardDescription>
              Manage candidate applications and track their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${candidate.firstName}+${candidate.lastName}`} />
                      <AvatarFallback>{candidate.firstName[0]}{candidate.lastName[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {candidate.position}
                        </span>
                        {candidate.department && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.department}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {candidate.email}
                        </span>
                        {candidate.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {candidate.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {candidate.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/candidates/${candidate.id}`)}
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
                        <DropdownMenuItem onClick={() => navigate(`/admin/candidates/${candidate.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/candidates/${candidate.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {candidate.resumeUrl && (
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Resume
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        {Object.values(CandidateStatus).map(status => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleStatusChange(candidate.id, status)}
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteCandidate(candidate.id)}
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

export default AdminCandidates;
