import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Star, 
  Save, 
  Send, 
  ArrowLeft,
  User,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Trash2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import InterviewerLayout from '@/components/layout/InterviewerLayout';
import { useToast } from '@/components/ui/use-toast';
import { Feedback, Recommendation, Interview } from '../../types';

interface FeedbackFormData {
  overallRating: number;
  recommendation: Recommendation;
  strengths: string;
  weaknesses: string;
  notes: string;
  categories: {
    name: string;
    rating: number;
    comments: string;
  }[];
}

const defaultCategories = [
  'Technical Skills',
  'Problem Solving',
  'Communication',
  'Culture Fit',
  'Experience',
  'Leadership'
];

const mockInterview: Interview = {
  id: '1',
  candidateId: '1',
  candidateName: 'Sarah Johnson',
  position: 'Frontend Developer',
  type: 'Technical',
  status: 'Completed',
  date: '2024-01-20',
  startTime: '10:00',
  endTime: '11:00',
  interviewers: ['Alex Chen', 'Lisa Wong'],
  location: 'Conference Room A',
  videoLink: 'https://zoom.us/j/123456789',
  notes: 'Focus on React and TypeScript skills',
  timeZone: 'EST'
};

const InterviewerFeedback = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [interview] = useState<Interview>(mockInterview);
  const [formData, setFormData] = useState<FeedbackFormData>({
    overallRating: 0,
    recommendation: 'Neutral',
    strengths: '',
    weaknesses: '',
    notes: '',
    categories: defaultCategories.map(cat => ({
      name: cat,
      rating: 0,
      comments: ''
    }))
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, overallRating: rating }));
  };

  const handleRecommendationChange = (recommendation: Recommendation) => {
    setFormData(prev => ({ ...prev, recommendation }));
  };

  const handleCategoryRatingChange = (categoryIndex: number, rating: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, index) =>
        index === categoryIndex ? { ...cat, rating } : cat
      )
    }));
  };

  const handleCategoryCommentChange = (categoryIndex: number, comments: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, index) =>
        index === categoryIndex ? { ...cat, comments } : cat
      )
    }));
  };

  const addCustomCategory = () => {
    const newCategory = prompt('Enter category name:');
    if (newCategory && newCategory.trim()) {
      setFormData(prev => ({
        ...prev,
        categories: [
          ...prev.categories,
          {
            name: newCategory.trim(),
            rating: 0,
            comments: ''
          }
        ]
      }));
    }
  };

  const removeCategory = (categoryIndex: number) => {
    if (defaultCategories.includes(formData.categories[categoryIndex].name)) {
      toast({
        title: "Cannot Remove",
        description: "Default categories cannot be removed",
      });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, index) => index !== categoryIndex)
    }));
  };

  const validateForm = (): boolean => {
    if (formData.overallRating === 0) {
      toast({
        title: "Missing Rating",
        description: "Please provide an overall rating",
      });
      return false;
    }

    if (!formData.strengths.trim()) {
      toast({
        title: "Missing Strengths",
        description: "Please describe the candidate's strengths",
      });
      return false;
    }

    if (!formData.weaknesses.trim()) {
      toast({
        title: "Missing Areas for Improvement",
        description: "Please describe areas where the candidate can improve",
      });
      return false;
    }

    if (!formData.notes.trim()) {
      toast({
        title: "Missing Notes",
        description: "Please provide additional notes or comments",
      });
      return false;
    }

    const incompleteCategories = formData.categories.filter(cat => cat.rating === 0);
    if (incompleteCategories.length > 0) {
      toast({
        title: "Incomplete Categories",
        description: `Please rate all categories: ${incompleteCategories.map(c => c.name).join(', ')}`,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Feedback Submitted",
        description: "Your interview feedback has been successfully submitted",
      });
      
      navigate('/interviewer/dashboard');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // Save to localStorage or send to backend as draft
    localStorage.setItem(`feedback-draft-${interview.id}`, JSON.stringify(formData));
    
    toast({
      title: "Draft Saved",
      description: "Your feedback draft has been saved",
    });
  };

  const renderStars = (rating: number, onChange: (rating: number) => void, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
        >
          <Star
            className={`${sizeClasses[size]} ${
              i <= rating
                ? 'fill-current text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            } transition-colors`}
          />
        </button>
      );
    }
    return stars;
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

  return (
    <InterviewerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/interviewer/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Interview Feedback</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Submit your evaluation for {interview.candidateName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </div>

        {/* Interview Details */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Details</CardTitle>
            <CardDescription>Information about the interview and candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${interview.candidateName}`} />
                  <AvatarFallback>{interview.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{interview.candidateName}</h3>
                  <p className="text-sm text-muted-foreground">{interview.position}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(interview.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{interview.startTime} - {interview.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{interview.interviewers.join(', ')}</span>
                </div>
                {interview.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4" />
                    <span>{interview.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            {interview.notes && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-1">Interview Notes:</p>
                <p className="text-sm text-blue-700">{interview.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overall Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
            <CardDescription>Rate the candidate's overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Overall Rating</Label>
                <div className="flex items-center gap-2 mt-2">
                  {renderStars(formData.overallRating, handleRatingChange, 'lg')}
                  <span className="ml-2 text-lg font-medium">
                    {formData.overallRating > 0 ? `${formData.overallRating}/5` : 'Not rated'}
                  </span>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Recommendation</Label>
                <RadioGroup
                  value={formData.recommendation}
                  onValueChange={(value) => handleRecommendationChange(value as Recommendation)}
                  className="mt-2"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {Object.values(Recommendation).map((rec) => (
                      <div key={rec} className="flex items-center space-x-2">
                        <RadioGroupItem value={rec} id={rec} />
                        <Label htmlFor={rec} className="flex items-center gap-2">
                          <Badge className={getRecommendationColor(rec)}>
                            {rec}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Ratings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Category Ratings</CardTitle>
                <CardDescription>Rate the candidate in specific areas</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addCustomCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.categories.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">{category.name}</Label>
                    {!defaultCategories.includes(category.name) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCategory(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(category.rating, (rating) => handleCategoryRatingChange(index, rating))}
                    <span className="ml-2 text-sm">
                      {category.rating > 0 ? `${category.rating}/5` : 'Not rated'}
                    </span>
                  </div>
                  
                  <Textarea
                    placeholder={`Comments about ${category.name.toLowerCase()}...`}
                    value={category.comments}
                    onChange={(e) => handleCategoryCommentChange(index, e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle>Strengths & Areas for Improvement</CardTitle>
            <CardDescription>Provide detailed feedback on what went well and what could be improved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="strengths" className="text-base font-medium">
                  <CheckCircle className="inline mr-2 h-4 w-4 text-green-600" />
                  Strengths
                </Label>
                <Textarea
                  id="strengths"
                  placeholder="What did the candidate do well? What are their key strengths?"
                  value={formData.strengths}
                  onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weaknesses" className="text-base font-medium">
                  <AlertCircle className="inline mr-2 h-4 w-4 text-orange-600" />
                  Areas for Improvement
                </Label>
                <Textarea
                  id="weaknesses"
                  placeholder="What could the candidate improve? What are their development areas?"
                  value={formData.weaknesses}
                  onChange={(e) => setFormData(prev => ({ ...prev, weaknesses: e.target.value }))}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Any other observations, recommendations, or comments</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Additional notes, specific examples, or recommendations..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3 pb-6">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>
      </div>
    </InterviewerLayout>
  );
};

export default InterviewerFeedback;
