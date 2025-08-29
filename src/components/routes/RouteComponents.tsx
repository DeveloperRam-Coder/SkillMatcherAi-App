
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCandidates from '@/pages/admin/AdminCandidates';
import AdminInterviews from '@/pages/admin/AdminInterviews';
import AdminFeedback from '@/pages/admin/AdminFeedback';
import CandidateDashboard from '@/pages/candidate/CandidateDashboard';
import CandidateProfile from '@/pages/candidate/CandidateProfile';
import CandidateApplications from '@/pages/candidate/CandidateApplications';
import InterviewerDashboard from '@/pages/interviewer/InterviewerDashboard';
import InterviewerProfile from '@/pages/interviewer/InterviewerProfile';
import InterviewerFeedback from '@/pages/interviewer/InterviewerFeedback';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UserSettings from '@/pages/settings/UserSettings';
import AdminReports from '@/pages/admin/AdminReports';
import { useAuth } from '@/context/AuthContext';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Interviews from '@/pages/Interviews';
import AdvancedInterviews from '@/pages/AdvancedInterviews';
import Candidates from '@/pages/Candidates';
import CandidateDetail from '@/pages/CandidateDetail';
import InterviewDetail from '@/pages/InterviewDetail';
import Feedback from '@/pages/Feedback';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Blog from '@/pages/resources/Blog';
import InterviewTips from '@/pages/resources/InterviewTips';
import ResumeGuide from '@/pages/resources/ResumeGuide';
import SuccessStories from '@/pages/resources/SuccessStories';
import MockInterviews from '@/pages/tools/MockInterviews';
import ResumeBuilder from '@/pages/tools/ResumeBuilder';
import SkillAssessments from '@/pages/tools/SkillAssessments';
import JobMatching from '@/pages/tools/JobMatching';

const RouteComponents = () => {
  const { user, isAuthenticated } = useAuth();

  console.log("RouteComponents rendering with user:", user);

  // Function to redirect to the appropriate dashboard based on user role
  const redirectToDashboard = () => {
    if (!isAuthenticated || !user) {
      console.log("User not authenticated, showing Index page");
      return <Index />;
    }
    
    console.log("Redirecting to dashboard for role:", user.role);
    
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      case 'candidate':
        return <Navigate to="/candidate/dashboard" />;
      case 'interviewer':
        return <Navigate to="/interviewer/dashboard" />;
      default:
        console.log("Unknown role:", user.role);
        return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/resources/blog" element={<Blog />} />
      <Route path="/resources/interview-tips" element={<InterviewTips />} />
      <Route path="/resources/resume-guide" element={<ResumeGuide />} />
      <Route path="/resources/success-stories" element={<SuccessStories />} />
      <Route path="/tools/mock-interviews" element={<MockInterviews />} />
      <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
      <Route path="/tools/skill-assessments" element={<SkillAssessments />} />
      <Route path="/tools/job-matching" element={<JobMatching />} />
      
      {/* Dashboard redirect */}
      <Route path="/" element={redirectToDashboard()} />
      
      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidates"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminCandidates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidates/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CandidateDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidates/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CandidateDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/interviews"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminInterviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/interviews/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <InterviewDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/interviews/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <InterviewDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedback"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedback/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedback/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Candidate routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/profile"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/applications"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/applications/:id"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/applications/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/settings"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Interviewer routes */}
      <Route
        path="/interviewer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <InterviewerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/profile"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <InterviewerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/feedback"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <InterviewerFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/feedback/:id"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <InterviewerFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/settings"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Generic routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      
      {/* Interview routes */}
      <Route
        path="/interviews"
        element={
          <ProtectedRoute>
            <Interviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviews/:id"
        element={
          <ProtectedRoute>
            <InterviewDetail />
          </ProtectedRoute>
        }
      />
      
      {/* Advanced Interview routes */}
      <Route
        path="/advanced-interviews"
        element={
          <ProtectedRoute>
            <AdvancedInterviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/advanced-interviews/:id"
        element={
          <ProtectedRoute>
            <AdvancedInterviews />
          </ProtectedRoute>
        }
      />
      
      {/* Candidate routes */}
      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidates/:id"
        element={
          <ProtectedRoute>
            <CandidateDetail />
          </ProtectedRoute>
        }
      />
      
      {/* Feedback routes */}
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback/:id"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />
      
      {/* Reports routes */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      
      {/* Catch-all redirect to login */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteComponents;
