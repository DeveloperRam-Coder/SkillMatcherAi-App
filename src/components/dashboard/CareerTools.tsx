import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, FileText, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    id: "resume",
    title: "ATS Resume Builder",
    description: "Create ATS-optimized resumes that pass tracking systems.",
    icon: FileText,
    cta: { label: "Build Resume", to: "/resume-builder" },
    tags: ["ATS", "AI"],
  },
  {
    id: "interviews",
    title: "AI Mock Interviews",
    description: "Practice with realistic AI interviewers and get instant feedback.",
    icon: ClipboardList,
    cta: { label: "Start Practice", to: "/ai-interviews" },
    tags: ["AI", "Practice"],
  },
  {
    id: "skills",
    title: "Skill Assessments",
    description: "Comprehensive testing for technical and soft skills.",
    icon: Brain,
    cta: { label: "Take Tests", to: "/skill-tests" },
    tags: ["Testing", "Analytics"],
  },
  {
    id: "match",
    title: "Smart Job Matching",
    description: "AI-powered job recommendations based on your profile.",
    icon: Sparkles,
    cta: { label: "Find Jobs", to: "/job-matching" },
    tags: ["AI", "Matching"],
  },
];

const CareerTools = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Card key={tool.id} className="h-full">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <CardTitle className="text-base">{tool.title}</CardTitle>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tool.tags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto" onClick={() => navigate(tool.cta.to)}>
                {tool.cta.label}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default CareerTools;


