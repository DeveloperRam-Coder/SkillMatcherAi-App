import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    id: "ai-interviews",
    title: "AI Interview Mastery Guide",
    description: "Complete guide to mastering AI-powered interviews and assessments.",
    href: "/resources/ai-interview-guide",
  },
  {
    id: "resume-optimization",
    title: "Resume Optimization Playbook",
    description: "ATS optimization strategies and professional resume templates.",
    href: "/resources/resume-playbook",
  },
  {
    id: "salary-negotiation",
    title: "Salary Negotiation Strategies",
    description: "Expert tips for maximizing your compensation package.",
    href: "/resources/salary-negotiation",
  },
];

const ResourcesHub = () => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
      {resources.map((r) => (
        <Card key={r.id} className="h-full">
          <CardHeader>
            <CardTitle className="text-base">{r.title}</CardTitle>
            <CardDescription>{r.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <a href={r.href}>
                Read more
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourcesHub;


