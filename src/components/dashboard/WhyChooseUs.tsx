import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Rocket, BarChart3, Users } from "lucide-react";

const items = [
  { id: "precision", icon: BarChart3, title: "AI-Powered Precision", text: "Advanced algorithms provide personalized insights and recommendations." },
  { id: "speed", icon: Rocket, title: "3x Faster Results", text: "Land jobs faster with AI-optimized tools and strategies." },
  { id: "trust", icon: ShieldCheck, title: "Proven Success", text: "Trusted by 50,000+ job seekers with 95% ATS success rate." },
  { id: "community", icon: Users, title: "Expert + AI", text: "Combine human expertise with cutting-edge AI technology." },
];

const WhyChooseUs = () => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ id, icon: Icon, title, text }) => (
        <Card key={id} className="h-full">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground mt-1">{text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WhyChooseUs;


