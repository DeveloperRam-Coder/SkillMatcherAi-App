import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScroll, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Users,
  BarChart2,
  Briefcase,
  Database,
  Shield,
  Layers,
  Brain,
  Clock,
  DollarSign,
  Target,
  Gauge,
  Handshake,
  FileCheck2,
  Megaphone,
  PieChart,
  BriefcaseBusiness,
  Globe,
  Rocket,
  ChevronDown,
  BarChart,
  Bot,
  CheckCircle,
  ClipboardList,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { NavigationBar } from "@/components/landing/NavigationBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { Footer } from "@/components/landing/Footer";
import { ChatDialog } from "@/components/landing/ChatDialog";
import { ChatButton, ScrollButton } from "@/components/ui/floating-action-buttons";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // References to sections for scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  
  // Animation controls
  const controlsFeatures = useAnimation();
  const controlsBenefits = useAnimation();
  
  // Parallax effect for hero section
  const { scrollYProgress } = useScroll();

  // Handle scroll for sticky navbar effect and animation triggers
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Check if features are in view
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          controlsFeatures.start("visible");
        }
      }
      
      // Check if benefits are in view
      if (benefitsRef.current) {
        const rect = benefitsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          controlsBenefits.start("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleMotionPreferenceChange = () => {
      setReduceMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [scrolled, controlsFeatures, controlsBenefits]);

  // If already authenticated, redirect to the appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "candidate":
          navigate("/candidate/dashboard");
          break;
        case "interviewer":
          navigate("/interviewer/dashboard");
          break;
        default:
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

  const scrollToSection = (refKey: string) => {
    const refMap = {
      features: featuresRef,
      benefits: benefitsRef,
      pricing: pricingRef,
      testimonials: testimonialsRef,
      newsletter: newsletterRef,
    };
    refMap[refKey as keyof typeof refMap]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Features data
  const extendedFeatures = [
    // {
    //   icon: <Calendar />,
    //   title: "Smart Scheduling",
    //   description: "AI-powered interview scheduling that works for everyone",
    //   features: [
    //     "Calendar integration with Google, Outlook & iCal",
    //     "Automated timezone detection & adjustment",
    //     "Conflict resolution & smart suggestions",
    //     "Customizable availability templates"
    //   ],
    //   color: "blue" as const,
    //   customIndex: 0,
    // },
    // {
    //   icon: <User />,
    //   title: "Candidate Management",
    //   description: "Comprehensive candidate tracking system",
    //   features: [
    //     "Unified candidate profiles with history",
    //     "Document management & version control",
    //     "Stage tracking with visual pipeline",
    //     "Custom fields & data organization"
    //   ],
    //   color: "purple" as const,
    //   customIndex: 1,
    // },
    // {
    //   icon: <Users />,
    //   title: "Team Collaboration",
    //   description: "Seamless teamwork for better hiring decisions",
    //   features: [
    //     "Real-time collaboration on evaluations",
    //     "Role-based permissions & access control",
    //     "Comment threads & @mentions",
    //     "Decision-making tools & consensus tracking"
    //   ],
    //   color: "green" as const,
    //   customIndex: 2,
    // },
    // {
    //   icon: <Briefcase />,
    //   title: "Feedback System",
    //   description: "Structured feedback collection and analysis",
    //   features: [
    //     "Customizable scorecards & evaluation forms",
    //     "Comparative candidate analysis",
    //     "Bias detection & fair hiring tools",
    //     "Historical performance metrics"
    //   ],
    //   color: "orange" as const,
    //   customIndex: 3,
    // },
    // {
    //   icon: <BarChart2 />,
    //   title: "Advanced Analytics",
    //   description: "Data-driven insights for hiring optimization",
    //   features: [
    //     "Custom dashboards & reporting",
    //     "Hiring funnel visualization & metrics",
    //     "Interviewer performance analytics",
    //     "Prediction models for time-to-hire"
    //   ],
    //   color: "pink" as const,
    //   customIndex: 4,
    // },
    // {
    //   icon: <Database />,
    //   title: "Talent Pool",
    //   description: "Build your pipeline of future employees",
    //   features: [
    //     "AI-powered candidate matching",
    //     "Automated talent nurturing campaigns",
    //     "Skills database & competency mapping",
    //     "Talent rediscovery algorithms"
    //   ],
    //   color: "indigo" as const,
    //   customIndex: 5,
    // },
    // {
    //   icon: <Shield />,
    //   title: "Compliance & Security",
    //   description: "Enterprise-grade security and compliance",
    //   features: [
    //     "GDPR, CCPA & global compliance tools",
    //     "Data retention policies & enforcement",
    //     "Audit logs & compliance reporting",
    //     "SOC 2 Type II & ISO 27001 certified"
    //   ],
    //   color: "blue" as const,
    //   customIndex: 6,
    // },
    // {
    //   icon: <Layers />,
    //   title: "Seamless Integration",
    //   description: "Connect with your existing tech stack",
    //   features: [
    //     "Native integrations with 50+ ATS/HRIS systems",
    //     "Open API for custom integrations",
    //     "Zapier, Make & workflow automation",
    //     "SSO & identity management"
    //   ],
    //   color: "green" as const,
    //   customIndex: 7,
    // },
    // {
    //   icon: <Brain />,
    //   title: "AI Assistant",
    //   description: "Intelligent support throughout your hiring process",
    //   features: [
    //     "Interview question suggestions",
    //     "Automated interview summaries",
    //     "Candidate engagement predictions",
    //     "Smart follow-up recommendations"
    //   ],
    //   color: "purple" as const,
    //   customIndex: 8,
    // }

     {
    icon: <Bot />,
    title: "AI-Powered Mock Interviews",
    description: "Practice with realistic AI interviewers that adapt to your responses and provide instant feedback",
    features: ["Real-time feedback", "Industry-specific questions", "Performance analytics", "Confidence building"],
    color: "blue" as const,
    customIndex: 9,
  },
  {
    icon: <ClipboardList />,
    title: "Comprehensive Skill Testing",
    description: "Practice with industry-standard tests covering technical, aptitude, and domain-specific skills",
    features: ["Multiple test types", "Performance tracking", "Detailed analytics", "Progress monitoring"],
    color: "green" as const,
    customIndex: 10,
  },
  {
    icon: <FileText />,
    title: "ATS-Optimized Resume Builder",
    description: "Create resumes that pass Applicant Tracking Systems and get you noticed by recruiters",
    features: ["Keyword optimization", "ATS compatibility", "Professional templates", "AI suggestions"],
    color: "purple" as const,
    customIndex: 11,
  },
  {
    icon: <Rocket />,
    title: "Intelligent Job Matching",
    description: "AI-powered job recommendations based on your skills, experience, and career goals",
    features: ["Personalized matches", "Skill gap analysis", "Company insights", "One-click applications"],
    color: "orange" as const,
    customIndex: 12,
  },
  {
    icon: <ClipboardList />,
    title: "Smart Application Management",
    description: "Track every application, interview, and follow-up in one organized dashboard",
    features: ["Status tracking", "Reminder system", "Interview scheduling", "Follow-up automation"],
    color: "pink" as const,
    customIndex: 13,
  },
  {
    icon: <CheckCircle />,
    title: "Success Probability Score",
    description: "Get AI-powered predictions on your chances of landing each job based on your profile and skills",
    features: ["Match percentage", "Skill gap analysis", "Improvement suggestions", "Success predictions"],
    color: "indigo" as const,
    customIndex: 14,
  },
  {
    icon: <BarChart />,
    title: "Career Growth Insights",
    description: "Data-driven insights to improve your job search strategy and interview performance",
    features: ["Success probability", "Performance trends", "Skill development", "Goal tracking"],
    color: "blue" as const,
    customIndex: 15,
  }
  ];

  // Benefits data
  const enhancedBenefits = [
    { 
      icon: <Clock className="h-12 w-12 text-blue-500" />, 
      title: "Land Jobs 3x Faster", 
      description: "Accelerate your job search with AI-powered tools that optimize your resume, prepare you for interviews, and match you with the right opportunities",
      delay: 0
    },
    { 
      icon: <DollarSign className="h-12 w-12 text-green-500" />, 
      title: "Increase Salary by 25%", 
      description: "Improve your negotiation power and salary potential with better interview skills, optimized resumes, and strategic job targeting",
      delay: 0.1
    },
    { 
      icon: <Target className="h-12 w-12 text-purple-500" />, 
      title: "95% ATS Success Rate", 
      description: "Get past Applicant Tracking Systems with our AI-optimized resume builder that ensures your application reaches human recruiters",
      delay: 0.2
    },
    { 
      icon: <Gauge className="h-12 w-12 text-orange-500" />, 
      title: "10x Interview Confidence", 
      description: "Build unshakeable confidence through realistic AI mock interviews, comprehensive feedback, and targeted skill improvement",
      delay: 0.3
    },
    { 
      icon: <Handshake className="h-12 w-12 text-indigo-500" />, 
      title: "Professional Brand Building", 
      description: "Create a compelling professional presence with optimized profiles, consistent messaging, and strategic networking tools",
      delay: 0.4
    },
    { 
      icon: <FileCheck2 className="h-12 w-12 text-pink-500" />, 
      title: "Track Every Application", 
      description: "Never lose track of your job applications with our comprehensive tracking system that keeps you organized and proactive",
      delay: 0.5
    },
    { 
      icon: <Megaphone className="h-12 w-12 text-blue-500" />, 
      title: "Smart Job Matching", 
      description: "Get personalized job recommendations based on your skills, experience, and career goals using advanced AI algorithms",
      delay: 0.6
    },
    { 
      icon: <PieChart className="h-12 w-12 text-green-500" />, 
      title: "Data-Driven Career Growth", 
      description: "Make informed career decisions with comprehensive analytics, performance insights, and success probability scoring",
      delay: 0.7
    }
  ];
  
  // Pricing options
  const pricingPlans = [
    {
      title: "Free Trial",
      price: 0,
      description: "Perfect for job seekers getting started",
      features: [
        "3 AI mock interviews",
        "Basic resume builder",
        "5 mock tests",
        "Email support",
        "Basic analytics"
      ],
      cta: "Start Free Trial",
      highlight: false,
      color: "blue" as const
    },
    {
      title: "Career Pro",
      price: 29,
      description: "Everything you need for serious job seekers",
      features: [
        "Unlimited AI mock interviews",
        "Advanced ATS resume builder",
        "Unlimited mock tests",
        "Priority support",
        "Advanced analytics & insights",
        "Job matching & auto-apply"
      ],
      cta: "Get Career Pro",
      highlight: true,
      color: "green" as const
    },
    {
      title: "Premium Career",
      price: 79,
      description: "For professionals serious about career advancement",
      features: [
        "Everything in Career Pro",
        "1-on-1 career coaching",
        "Resume review by experts",
        "Interview preparation workshops",
        "LinkedIn profile optimization",
        "Salary negotiation guidance"
      ],
      cta: "Get Premium",
      highlight: false,
      color: "purple" as const
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden" >
      <NavigationBar 
        scrolled={scrolled} 
        scrollToSection={scrollToSection}
        extendedFeatures={extendedFeatures}
      />
      
      <HeroSection reduceMotion={reduceMotion} />
      
      <div ref={featuresRef}>
        <FeaturesSection features={extendedFeatures} />
      </div>
      
      <div ref={benefitsRef}>
        <BenefitsSection benefits={enhancedBenefits} />
      </div>
      
      <div ref={testimonialsRef}>
        <TestimonialCarousel />
      </div>
      
      <div ref={pricingRef}>
        <PricingSection pricingPlans={pricingPlans} />
      </div>
      
      <div ref={newsletterRef}>
        <NewsletterSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating action buttons */}
      <ScrollButton onClick={() => scrollToSection('features')} />
      <ChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chat Dialog */}
      <ChatDialog 
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
      />
    </div>
  );
};

export default Index;
