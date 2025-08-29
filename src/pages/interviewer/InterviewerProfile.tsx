
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Plus, 
  Edit, 
  Save, 
  X,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  Target,
  Award,
  Languages,
  Code,
  Users,
  Video,
  Building
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InterviewerLayout from '@/components/layout/InterviewerLayout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ExpertiseArea {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
}

interface InterviewType {
  id: string;
  type: string;
  comfortLevel: 'Low' | 'Medium' | 'High' | 'Expert';
  preferredDuration: number;
}

interface Availability {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  linkedin: string;
  github: string;
  company: string;
  position: string;
  department: string;
  summary: string;
  expertiseAreas: ExpertiseArea[];
  interviewTypes: InterviewType[];
  availability: Availability[];
  languages: string[];
  certifications: string[];
  interviewPreferences: string;
  maxInterviewsPerWeek: number;
  preferredInterviewDuration: number;
  remoteInterviewing: boolean;
  timezoneFlexibility: boolean;
}

const mockProfileData: ProfileData = {
  firstName: 'Alex',
  lastName: 'Chen',
  email: 'alex.chen@company.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  timezone: 'PST',
  linkedin: 'linkedin.com/in/alexchen',
  github: 'github.com/alexchen',
  company: 'TechCorp Solutions',
  position: 'Senior Engineering Manager',
  department: 'Engineering',
  summary: 'Experienced engineering leader with 8+ years of experience in software development and team management. Passionate about technical interviews and helping candidates grow.',
  expertiseAreas: [
    { id: '1', name: 'Frontend Development', category: 'Technical', level: 'Expert', yearsOfExperience: 8 },
    { id: '2', name: 'React & TypeScript', category: 'Technical', level: 'Expert', yearsOfExperience: 6 },
    { id: '3', name: 'Team Leadership', category: 'Leadership', level: 'Advanced', yearsOfExperience: 5 },
    { id: '4', name: 'System Design', category: 'Technical', level: 'Advanced', yearsOfExperience: 7 }
  ],
  interviewTypes: [
    { id: '1', type: 'Technical Coding', comfortLevel: 'Expert', preferredDuration: 60 },
    { id: '2', type: 'System Design', comfortLevel: 'High', preferredDuration: 45 },
    { id: '3', type: 'Behavioral', comfortLevel: 'High', preferredDuration: 30 },
    { id: '4', type: 'Portfolio Review', comfortLevel: 'Medium', preferredDuration: 45 }
  ],
  availability: [
    { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'PST' },
    { id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', timezone: 'PST' },
    { id: '3', day: 'Wednesday', startTime: '09:00', endTime: '17:00', timezone: 'PST' },
    { id: '4', day: 'Thursday', startTime: '09:00', endTime: '17:00', timezone: 'PST' },
    { id: '5', day: 'Friday', startTime: '09:00', endTime: '17:00', timezone: 'PST' }
  ],
  languages: ['English (Native)', 'Mandarin (Conversational)'],
  certifications: ['AWS Certified Developer', 'Google Cloud Professional Developer'],
  interviewPreferences: 'I prefer to focus on practical problem-solving and real-world scenarios. I like to give candidates time to think and ask clarifying questions.',
  maxInterviewsPerWeek: 8,
  preferredInterviewDuration: 60,
  remoteInterviewing: true,
  timezoneFlexibility: true
};

const InterviewerProfile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleSave = () => {
    // In a real app, you would save to the backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setProfileData(mockProfileData); // Reset to original data
    setIsEditing(false);
    setEditingSection(null);
  };

  const addExpertiseArea = () => {
    const newExpertise: ExpertiseArea = {
      id: Date.now().toString(),
      name: '',
      category: 'Technical',
      level: 'Intermediate',
      yearsOfExperience: 1
    };
    setProfileData(prev => ({
      ...prev,
      expertiseAreas: [...prev.expertiseAreas, newExpertise]
    }));
    setEditingSection('expertise');
  };

  const removeExpertiseArea = (expertiseId: string) => {
    setProfileData(prev => ({
      ...prev,
      expertiseAreas: prev.expertiseAreas.filter(exp => exp.id !== expertiseId)
    }));
  };

  const updateExpertiseArea = (expertiseId: string, field: keyof ExpertiseArea, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      expertiseAreas: prev.expertiseAreas.map(exp =>
        exp.id === expertiseId ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addInterviewType = () => {
    const newInterviewType: InterviewType = {
      id: Date.now().toString(),
      type: '',
      comfortLevel: 'Medium',
      preferredDuration: 45
    };
    setProfileData(prev => ({
      ...prev,
      interviewTypes: [...prev.interviewTypes, newInterviewType]
    }));
    setEditingSection('interviewTypes');
  };

  const removeInterviewType = (typeId: string) => {
    setProfileData(prev => ({
      ...prev,
      interviewTypes: prev.interviewTypes.filter(type => type.id !== typeId)
    }));
  };

  const updateInterviewType = (typeId: string, field: keyof InterviewType, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      interviewTypes: prev.interviewTypes.map(type =>
        type.id === typeId ? { ...type, [field]: value } : type
      )
    }));
  };

  const addAvailability = () => {
    const newAvailability: Availability = {
      id: Date.now().toString(),
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      timezone: 'PST'
    };
    setProfileData(prev => ({
      ...prev,
      availability: [...prev.availability, newAvailability]
    }));
    setEditingSection('availability');
  };

  const removeAvailability = (availabilityId: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: prev.availability.filter(avail => avail.id !== availabilityId)
    }));
  };

  const updateAvailability = (availabilityId: string, field: keyof Availability, value: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: prev.availability.map(avail =>
        avail.id === availabilityId ? { ...avail, [field]: value } : avail
      )
    }));
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-gray-100 text-gray-800',
      'Intermediate': 'bg-blue-100 text-blue-800',
      'Advanced': 'bg-green-100 text-green-800',
      'Expert': 'bg-purple-100 text-purple-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getComfortLevelColor = (level: string) => {
    const colors = {
      'Low': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-green-100 text-green-800',
      'Expert': 'bg-purple-100 text-purple-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getLevelIcon = (level: string) => {
    const icons = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4
    };
    return icons[level] || 1;
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <InterviewerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Interviewer Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            {isEditing ? (
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profileData.firstName}+${profileData.lastName}`} />
                <AvatarFallback className="text-2xl">{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                  <Badge variant="outline" className="text-sm">
                    <Building className="mr-2 h-3 w-3" />
                    {profileData.position}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground max-w-2xl">{profileData.summary}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {profileData.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {profileData.timezone}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {profileData.email}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  {isEditing ? (
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {profileData.phone}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  {isEditing ? (
                    <Input
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {profileData.linkedin}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub</label>
                  {isEditing ? (
                    <Input
                      value={profileData.github}
                      onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {profileData.github}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Interview Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Interview Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Interviews Per Week</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={profileData.maxInterviewsPerWeek}
                      onChange={(e) => setProfileData(prev => ({ ...prev, maxInterviewsPerWeek: parseInt(e.target.value) }))}
                    />
                  ) : (
                    <div className="text-sm">{profileData.maxInterviewsPerWeek} interviews</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Interview Duration</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={profileData.preferredInterviewDuration}
                      onChange={(e) => setProfileData(prev => ({ ...prev, preferredInterviewDuration: parseInt(e.target.value) }))}
                    />
                  ) : (
                    <div className="text-sm">{profileData.preferredInterviewDuration} minutes</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remote Interviewing</label>
                  {isEditing ? (
                    <Select value={profileData.remoteInterviewing.toString()} onValueChange={(value) => setProfileData(prev => ({ ...prev, remoteInterviewing: value === 'true' }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm">{profileData.remoteInterviewing ? 'Yes' : 'No'}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone Flexibility</label>
                  {isEditing ? (
                    <Select value={profileData.timezoneFlexibility.toString()} onValueChange={(value) => setProfileData(prev => ({ ...prev, timezoneFlexibility: value === 'true' }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm">{profileData.timezoneFlexibility ? 'Yes' : 'No'}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            {/* Expertise Areas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Expertise Areas
                  </CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={addExpertiseArea}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expertise
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.expertiseAreas.map((expertise) => (
                    <div key={expertise.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="grid grid-cols-4 gap-2">
                            <Input
                              placeholder="Expertise name"
                              value={expertise.name}
                              onChange={(e) => updateExpertiseArea(expertise.id, 'name', e.target.value)}
                            />
                            <Select value={expertise.category} onValueChange={(value) => updateExpertiseArea(expertise.id, 'category', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Technical">Technical</SelectItem>
                                <SelectItem value="Leadership">Leadership</SelectItem>
                                <SelectItem value="Domain">Domain</SelectItem>
                                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select value={expertise.level} onValueChange={(value) => updateExpertiseArea(expertise.id, 'level', value as any)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="number"
                              placeholder="Years"
                              value={expertise.yearsOfExperience}
                              onChange={(e) => updateExpertiseArea(expertise.id, 'yearsOfExperience', parseInt(e.target.value))}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{expertise.name}</div>
                              <div className="text-sm text-muted-foreground">{expertise.category} • {expertise.yearsOfExperience} years</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {renderStars(getLevelIcon(expertise.level))}
                              </div>
                              <Badge className={getLevelColor(expertise.level)}>
                                {expertise.level}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExpertiseArea(expertise.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Types */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Interview Types
                  </CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={addInterviewType}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Type
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.interviewTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              placeholder="Interview type"
                              value={type.type}
                              onChange={(e) => updateInterviewType(type.id, 'type', e.target.value)}
                            />
                            <Select value={type.comfortLevel} onValueChange={(value) => updateInterviewType(type.id, 'comfortLevel', value as any)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="number"
                              placeholder="Duration (min)"
                              value={type.preferredDuration}
                              onChange={(e) => updateInterviewType(type.id, 'preferredDuration', parseInt(e.target.value))}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{type.type}</div>
                              <div className="text-sm text-muted-foreground">{type.preferredDuration} minutes</div>
                            </div>
                            <Badge className={getComfortLevelColor(type.comfortLevel)}>
                              {type.comfortLevel}
                            </Badge>
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInterviewType(type.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Availability */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-4" />
                    Availability
                  </CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={addAvailability}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Time
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.availability.map((avail) => (
                    <div key={avail.id} className="p-3 border rounded-lg">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Select value={avail.day} onValueChange={(value) => updateAvailability(avail.id, 'day', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Monday">Monday</SelectItem>
                              <SelectItem value="Tuesday">Tuesday</SelectItem>
                              <SelectItem value="Wednesday">Wednesday</SelectItem>
                              <SelectItem value="Thursday">Thursday</SelectItem>
                              <SelectItem value="Friday">Friday</SelectItem>
                              <SelectItem value="Saturday">Saturday</SelectItem>
                              <SelectItem value="Sunday">Sunday</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="time"
                              value={avail.startTime}
                              onChange={(e) => updateAvailability(avail.id, 'startTime', e.target.value)}
                            />
                            <Input
                              type="time"
                              value={avail.endTime}
                              onChange={(e) => updateAvailability(avail.id, 'endTime', e.target.value)}
                            />
                          </div>
                          <Select value={avail.timezone} onValueChange={(value) => updateAvailability(avail.id, 'timezone', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PST">PST</SelectItem>
                              <SelectItem value="MST">MST</SelectItem>
                              <SelectItem value="CST">CST</SelectItem>
                              <SelectItem value="EST">EST</SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAvailability(avail.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium">{avail.day}</div>
                          <div className="text-sm text-muted-foreground">
                            {avail.startTime} - {avail.endTime} {avail.timezone}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-4" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profileData.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-4" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-yellow-600" />
                      {cert}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-4" />
                  Interview Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.interviewPreferences}
                    onChange={(e) => setProfileData(prev => ({ ...prev, interviewPreferences: e.target.value }))}
                    placeholder="Describe your interview style and preferences..."
                  />
                ) : (
                  <p className="text-sm">{profileData.interviewPreferences}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </InterviewerLayout>
  );
};

export default InterviewerProfile;
