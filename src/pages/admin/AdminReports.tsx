
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  Download,
  Filter,
  Calendar as CalendarIcon,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import AdminLayout from '@/components/layout/AdminLayout';

const mockHiringData = [
  { month: 'Jan', applications: 45, interviews: 28, offers: 8, hires: 6 },
  { month: 'Feb', applications: 52, interviews: 35, offers: 12, hires: 9 },
  { month: 'Mar', applications: 48, interviews: 32, offers: 10, hires: 8 },
  { month: 'Apr', applications: 61, interviews: 38, offers: 15, hires: 12 },
  { month: 'May', applications: 55, interviews: 42, offers: 18, hires: 14 },
  { month: 'Jun', applications: 67, interviews: 45, offers: 22, hires: 18 }
];

const mockDepartmentData = [
  { name: 'Engineering', applications: 120, interviews: 85, hires: 25, fillRate: 85 },
  { name: 'Design', applications: 45, interviews: 32, hires: 12, fillRate: 78 },
  { name: 'Product', applications: 38, interviews: 28, hires: 10, fillRate: 82 },
  { name: 'Marketing', applications: 52, interviews: 35, hires: 15, fillRate: 88 },
  { name: 'Sales', applications: 41, interviews: 29, hires: 8, fillRate: 72 }
];

const mockSourceData = [
  { name: 'LinkedIn', value: 35, color: '#0077B5' },
  { name: 'Indeed', value: 25, color: '#003A9B' },
  { name: 'Company Website', value: 20, color: '#6B7280' },
  { name: 'Referrals', value: 15, color: '#10B981' },
  { name: 'Other', value: 5, color: '#F59E0B' }
];

const mockTimeToHireData = [
  { department: 'Engineering', avgDays: 18, target: 21 },
  { department: 'Design', avgDays: 15, target: 18 },
  { department: 'Product', avgDays: 22, target: 25 },
  { department: 'Marketing', avgDays: 12, target: 15 },
  { department: 'Sales', avgDays: 20, target: 23 }
];

const AdminReports = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('6months');
  const [department, setDepartment] = useState('all');

  const getOverallStats = () => {
    const totalApplications = mockHiringData.reduce((sum, item) => sum + item.applications, 0);
    const totalInterviews = mockHiringData.reduce((sum, item) => sum + item.interviews, 0);
    const totalOffers = mockHiringData.reduce((sum, item) => sum + item.offers, 0);
    const totalHires = mockHiringData.reduce((sum, item) => sum + item.hires, 0);
    
    const applicationToInterviewRate = ((totalInterviews / totalApplications) * 100).toFixed(1);
    const interviewToOfferRate = ((totalOffers / totalInterviews) * 100).toFixed(1);
    const offerToHireRate = ((totalHires / totalOffers) * 100).toFixed(1);
    const overallHireRate = ((totalHires / totalApplications) * 100).toFixed(1);

    return {
      totalApplications,
      totalInterviews,
      totalOffers,
      totalHires,
      applicationToInterviewRate,
      interviewToOfferRate,
      offerToHireRate,
      overallHireRate
    };
  };

  const stats = getOverallStats();

  const getFilteredData = () => {
    if (department === 'all') return mockHiringData;
    // In a real app, you would filter by department
    return mockHiringData;
  };

  const filteredData = getFilteredData();

  const exportReport = () => {
    // In a real app, this would generate and download a PDF/Excel report
    console.log('Exporting report...');
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Hiring Reports</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Analytics and insights for your hiring process
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Timeframe</label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select defaultValue="comprehensive">
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="hiring-funnel">Hiring Funnel</SelectItem>
                    <SelectItem value="department">Department Analysis</SelectItem>
                    <SelectItem value="source">Source Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hires</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHires}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Hire Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.overallHireRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Time to Hire</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 days</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-2 days</span> from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hiring Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
            <CardDescription>Conversion rates through the hiring process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Applications to Interviews</span>
                    <Badge variant="outline">{stats.applicationToInterviewRate}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${stats.applicationToInterviewRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Interviews to Offers</span>
                    <Badge variant="outline">{stats.interviewToOfferRate}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${stats.interviewToOfferRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Offers to Hires</span>
                    <Badge variant="outline">{stats.offerToHireRate}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${stats.offerToHireRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Success Rate</span>
                    <Badge variant="outline">{stats.overallHireRate}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${stats.overallHireRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="offers" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="hires" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Hiring metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockDepartmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hires" fill="#10B981" />
                    <Bar dataKey="interviews" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Source Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Sources</CardTitle>
              <CardDescription>Distribution of candidates by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time to Hire Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Time to Hire Analysis</CardTitle>
            <CardDescription>Average days to hire by department vs. targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTimeToHireData.map((item) => {
                const isOnTarget = item.avgDays <= item.target;
                const efficiency = ((item.target - item.avgDays) / item.target * 100).toFixed(1);
                
                return (
                  <div key={item.department} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-24 font-medium">{item.department}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Target:</span>
                        <Badge variant="outline">{item.target} days</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{item.avgDays} days</div>
                        <div className="text-xs text-muted-foreground">Average</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-sm font-medium ${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                          {isOnTarget ? '+' : '-'}{Math.abs(parseFloat(efficiency))}%
                        </div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                      
                      <Badge className={isOnTarget ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {isOnTarget ? 'On Target' : 'Over Target'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights & Recommendations</CardTitle>
            <CardDescription>AI-powered analysis of your hiring data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Strengths</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• High conversion rate from interviews to offers (32%)</li>
                  <li>• Engineering department consistently meets hiring targets</li>
                  <li>• Referral candidates show highest quality and retention</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Areas for Improvement</h4>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Sales department struggling with time-to-hire targets</li>
                  <li>• Low application-to-interview conversion rate (15%)</li>
                  <li>• High candidate drop-off between offer and acceptance</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Recommendations</h4>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Implement automated screening for high-volume roles</li>
                  <li>• Focus on improving candidate experience in sales pipeline</li>
                  <li>• Increase referral program incentives</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-800">Predictions</h4>
                </div>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Expected 15% increase in applications next quarter</li>
                  <li>• Time-to-hire likely to improve by 2-3 days</li>
                  <li>• Engineering roles will remain competitive</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
