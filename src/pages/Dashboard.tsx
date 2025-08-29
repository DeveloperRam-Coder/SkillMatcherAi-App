
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import RecentActivity from "@/components/dashboard/RecentActivity";
import CareerTools from "@/components/dashboard/CareerTools";
import ResourcesHub from "@/components/dashboard/ResourcesHub";
import WhyChooseUs from "@/components/dashboard/WhyChooseUs";
import PricingOverview from "@/components/dashboard/PricingOverview";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">Your career command center powered by SkillMatcherAI.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate("/interviews/new")}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate("/candidates/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates, interviews, or resources"
            className="pl-8"
          />
        </div>

        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Career Tools</h2>
              <p className="text-sm text-muted-foreground">AI-first tools to accelerate your journey.</p>
            </div>
          </div>
          <CareerTools />
        </section>

        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
              <p className="text-sm text-muted-foreground">Stay prepared and on schedule.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/interviews")}>View all</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <UpcomingInterviews />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">Resources</h2>
            <p className="text-sm text-muted-foreground">Guides and playbooks curated for you.</p>
          </div>
          <ResourcesHub />
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">Why Choose Us</h2>
            <p className="text-sm text-muted-foreground">What makes SkillMatcherAI different.</p>
          </div>
          <WhyChooseUs />
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">Pricing</h2>
            <p className="text-sm text-muted-foreground">Start free and scale when ready.</p>
          </div>
          <PricingOverview />
        </section>

        <section className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across candidates and interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">Success Stories</h2>
            <p className="text-sm text-muted-foreground">Real results from our users</p>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
                  <div className="font-medium mb-2">Faster Job Landing</div>
                  <p className="text-sm text-muted-foreground">AI-powered tools accelerate your job search</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
                  <div className="font-medium mb-2">Salary Increase</div>
                  <p className="text-sm text-muted-foreground">Better negotiation with improved skills</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="font-medium mb-2">ATS Success Rate</div>
                  <p className="text-sm text-muted-foreground">Optimized resumes pass tracking systems</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">Testimonial</h2>
            <p className="text-sm text-muted-foreground">What our users say</p>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-lg italic text-muted-foreground mb-4">
                  "The mock tests and skill assessments helped me identify my weak areas. I focused on improving those skills and saw my interview success rate jump from 20% to 80%."
                </div>
                <div className="font-medium">Michael Thompson</div>
                <div className="text-sm text-muted-foreground">Data Analyst, Analytics Inc.</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
