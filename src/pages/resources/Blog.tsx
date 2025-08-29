import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "Mastering AI-Powered Interviews",
    description: "How to leverage AI mock interviews to boost confidence and performance.",
    tags: ["AI", "Interviews", "Preparation"],
    readTime: "6 min read",
  },
  {
    title: "Build an ATS-Friendly Resume",
    description: "A practical guide to writing resumes that pass ATS screens.",
    tags: ["Resume", "ATS", "Career"],
    readTime: "8 min read",
  },
  {
    title: "Skill Assessments That Matter",
    description: "Choose, practice, and showcase the right skills for your target roles.",
    tags: ["Skills", "Assessments", "Growth"],
    readTime: "7 min read",
  },
  {
    title: "Job Search Strategy in 2025",
    description: "Tactics to stand out in competitive markets with data-driven insights.",
    tags: ["Strategy", "Job Search", "Insights"],
    readTime: "9 min read",
  },
];

const Blog: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Career Blog</h1>
            <p className="text-muted-foreground mt-1">Expert insights and practical guides to level up your career.</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search articles..." className="w-64" />
            <Button>Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.title} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.readTime}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;


