
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
  Download,
  Upload,
  Star,
  Calendar,
  Award,
  Languages,
  Code,
  Target
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CandidateLayout from '@/components/layout/CandidateLayout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
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
  portfolio: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  languages: string[];
  certifications: string[];
  careerGoals: string;
  preferredRoles: string[];
  salaryExpectation: string;
  remotePreference: 'Remote' | 'Hybrid' | 'On-site';
  relocationWillingness: boolean;
}

const mockProfileData: ProfileData = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  timezone: 'PST',
  linkedin: 'linkedin.com/in/sarahjohnson',
  github: 'github.com/sarahjohnson',
  portfolio: 'sarahjohnson.dev',
  summary: 'Experienced Frontend Developer with 5+ years of experience building modern web applications using React, TypeScript, and Node.js. Passionate about creating intuitive user experiences and writing clean, maintainable code.',
  skills: [
    { id: '1', name: 'React', category: 'Frontend', proficiency: 'Expert' },
    { id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced' },
    { id: '3', name: 'Node.js', category: 'Backend', proficiency: 'Advanced' },
    { id: '4', name: 'Python', category: 'Backend', proficiency: 'Intermediate' },
    { id: '5', name: 'PostgreSQL', category: 'Database', proficiency: 'Intermediate' }
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      endDate: '2024-01',
      current: false,
      description: 'Led frontend development for multiple client projects, mentored junior developers, and implemented best practices for code quality and performance.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: 'Built responsive web applications using React and modern CSS frameworks. Collaborated with design and backend teams to deliver high-quality products.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8'
    }
  ],
  languages: ['English (Native)', 'Spanish (Conversational)'],
  certifications: ['AWS Certified Developer', 'Google Cloud Professional Developer'],
  careerGoals: 'To become a technical leader and contribute to building innovative products that solve real-world problems.',
  preferredRoles: ['Senior Frontend Developer', 'Full Stack Developer', 'Frontend Team Lead'],
  salaryExpectation: '$120,000 - $150,000',
  remotePreference: 'Hybrid',
  relocationWillingness: true
};

const CandidateProfile = () => {
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

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'Frontend',
      proficiency: 'Intermediate'
    };
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    setEditingSection('skills');
  };

  const removeSkill = (skillId: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== skillId)
    }));
  };

  const updateSkill = (skillId: string, field: keyof Skill, value: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === skillId ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
    setEditingSection('experience');
  };

  const removeExperience = (expId: string) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== expId)
    }));
  };

  const updateExperience = (expId: string, field: keyof Experience, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const getProficiencyColor = (proficiency: string) => {
    const colors = {
      'Beginner': 'bg-gray-100 text-gray-800',
      'Intermediate': 'bg-blue-100 text-blue-800',
      'Advanced': 'bg-green-100 text-green-800',
      'Expert': 'bg-purple-100 text-purple-800'
    };
    return colors[proficiency] || 'bg-gray-100 text-gray-800';
  };

  const getProficiencyIcon = (proficiency: string) => {
    const icons = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4
    };
    return icons[proficiency] || 1;
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
    <CandidateLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
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
                    <Target className="mr-2 h-3 w-3" />
                    {profileData.preferredRoles[0]}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground max-w-2xl">{profileData.summary}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {profileData.timezone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {profileData.remotePreference}
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio</label>
                  {isEditing ? (
                    <Input
                      value={profileData.portfolio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, portfolio: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {profileData.portfolio}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Career Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Career Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Roles</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {profileData.preferredRoles.map((role, index) => (
                        <Input
                          key={index}
                          value={role}
                          onChange={(e) => {
                            const newRoles = [...profileData.preferredRoles];
                            newRoles[index] = e.target.value;
                            setProfileData(prev => ({ ...prev, preferredRoles: newRoles }));
                          }}
                        />
                      ))}
                      <Button variant="outline" size="sm" onClick={() => setProfileData(prev => ({ ...prev, preferredRoles: [...prev.preferredRoles, ''] }))}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Role
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.preferredRoles.map((role, index) => (
                        <Badge key={index} variant="outline">{role}</Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary Expectation</label>
                  {isEditing ? (
                    <Input
                      value={profileData.salaryExpectation}
                      onChange={(e) => setProfileData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">{profileData.salaryExpectation}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remote Preference</label>
                  {isEditing ? (
                    <Select value={profileData.remotePreference} onValueChange={(value) => setProfileData(prev => ({ ...prev, remotePreference: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm">{profileData.remotePreference}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Willing to Relocate</label>
                  {isEditing ? (
                    <Select value={profileData.relocationWillingness.toString()} onValueChange={(value) => setProfileData(prev => ({ ...prev, relocationWillingness: value === 'true' }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm">{profileData.relocationWillingness ? 'Yes' : 'No'}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Skills
                  </CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={addSkill}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Skill
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              placeholder="Skill name"
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            />
                            <Select value={skill.category} onValueChange={(value) => updateSkill(skill.id, 'category', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Frontend">Frontend</SelectItem>
                                <SelectItem value="Backend">Backend</SelectItem>
                                <SelectItem value="Database">Database</SelectItem>
                                <SelectItem value="DevOps">DevOps</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select value={skill.proficiency} onValueChange={(value) => updateSkill(skill.id, 'proficiency', value as any)}>
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
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{skill.name}</div>
                              <div className="text-sm text-muted-foreground">{skill.category}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {renderStars(getProficiencyIcon(skill.proficiency))}
                              </div>
                              <Badge className={getProficiencyColor(skill.proficiency)}>
                                {skill.proficiency}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
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

            {/* Experience */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Work Experience
                  </CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={addExperience}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.experience.map((exp) => (
                    <div key={exp.id} className="p-3 border rounded-lg">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            />
                            <Input
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            />
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            />
                            <label className="text-sm">Current Position</label>
                          </div>
                          <Textarea
                            placeholder="Description"
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{exp.position}</h4>
                            <Badge variant="outline">{exp.current ? 'Current' : 'Past'}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-4" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.education.map((edu) => (
                    <div key={edu.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
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

            {/* Career Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-4" />
                  Career Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.careerGoals}
                    onChange={(e) => setProfileData(prev => ({ ...prev, careerGoals: e.target.value }))}
                    placeholder="Describe your career goals and aspirations..."
                  />
                ) : (
                  <p className="text-sm">{profileData.careerGoals}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateProfile;
