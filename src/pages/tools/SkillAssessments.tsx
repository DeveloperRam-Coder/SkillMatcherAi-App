import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Frontend", tests: 12 },
  { name: "Backend", tests: 15 },
  { name: "Data", tests: 9 },
  { name: "Product", tests: 6 },
];

const SkillAssessments: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Skill Assessments</h1>
          <p className="text-muted-foreground mt-1">Validate and improve your skills with curated assessments.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Card key={c.name} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-lg">{c.name}</CardTitle>
                <CardDescription>{c.tests} available tests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="secondary">Browse</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillAssessments;


