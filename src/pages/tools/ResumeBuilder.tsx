import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ResumeBuilder: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>ATS Resume Builder</CardTitle>
            <CardDescription>Fill in details and generate an ATS-friendly resume.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" placeholder="Software Engineer" />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea id="summary" placeholder="2-3 sentences highlighting your impact." rows={4} />
            </div>
            <div>
              <Label htmlFor="skills">Key Skills (comma separated)</Label>
              <Input id="skills" placeholder="React, Node.js, SQL, Leadership" />
            </div>
            <div>
              <Label htmlFor="experience">Experience (bullets)</Label>
              <Textarea id="experience" placeholder="Start bullets with outcomes and metrics." rows={6} />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Generate Resume</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;


