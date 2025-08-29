import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MockInterviews: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">AI Mock Interviews</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">Practice with adaptive AI interviewers and receive instant feedback with actionable insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Choose an interview track</CardTitle>
              <CardDescription>Select role and difficulty to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Frontend Engineer", level: "Intermediate" },
                  { title: "Backend Engineer", level: "Intermediate" },
                  { title: "Data Analyst", level: "Beginner" },
                  { title: "Product Manager", level: "Advanced" },
                ].map((t) => (
                  <div key={t.title} className="border rounded-md p-4 hover:bg-slate-50 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs text-muted-foreground">{t.level}</div>
                      </div>
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Weekly improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Communication</span><span>72%</span></div>
                  <Progress value={72} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Problem Solving</span><span>64%</span></div>
                  <Progress value={64} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Technical Depth</span><span>58%</span></div>
                  <Progress value={58} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MockInterviews;


