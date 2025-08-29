import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const JobMatching: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Intelligent Job Matching</CardTitle>
            <CardDescription>Get AI-powered recommendations based on your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input placeholder="Preferred title (e.g., Frontend Developer)" className="sm:col-span-2" />
              <Input placeholder="Location (optional)" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Top skills (comma separated)" />
              <Input placeholder="Experience (years)" />
            </div>
            <Button>Find Matches</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatching;


