import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Contact & Summary",
    points: [
      "Use a professional email and LinkedIn",
      "Write a focused 2-3 sentence summary",
      "Tailor keywords to the job description",
    ],
  },
  {
    title: "Experience",
    points: [
      "Start bullets with strong action verbs",
      "Quantify impact (e.g., 30% faster, saved $50k)",
      "Focus on outcomes, not just tasks",
    ],
  },
  {
    title: "Skills & Projects",
    points: [
      "List relevant technical and soft skills",
      "Add 2-3 impactful projects with outcomes",
      "Highlight tools, frameworks, and methods",
    ],
  },
];

const ResumeGuide: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">ATS-Optimized Resume Guide</CardTitle>
            <CardDescription>Craft a resume that clears ATS and impresses recruiters.</CardDescription>
          </CardHeader>
          <CardContent>
            {sections.map((s) => (
              <div key={s.title} className="mb-6">
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeGuide;


