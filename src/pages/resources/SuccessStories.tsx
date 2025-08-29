import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stories = [
  {
    name: "Aisha Khan",
    role: "Data Analyst @ FinTech Co",
    quote: "AI mock interviews helped me reduce anxiety and improve my answers.",
  },
  {
    name: "Marco Silva",
    role: "Full-Stack Engineer @ SaaS Startup",
    quote: "The resume optimizer got me 3x more callbacks in two weeks.",
  },
  {
    name: "Emily Chen",
    role: "Product Manager @ HealthTech",
    quote: "Skill assessments highlighted my strengths—huge confidence boost for interviews.",
  },
];

const SuccessStories: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Success Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((s) => (
            <Card key={s.name} className="hover:shadow-md transition">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}`} />
                    <AvatarFallback>{s.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{s.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">“{s.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;


