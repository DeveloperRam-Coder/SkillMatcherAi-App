import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  { id: "starter", name: "Free Trial", price: "$0", desc: "Perfect for job seekers getting started", cta: "Start Free Trial", href: "/pricing" },
  { id: "pro", name: "Career Pro", price: "$29/mo", desc: "Everything you need for serious job seekers", cta: "Get Career Pro", href: "/pricing" },
  { id: "team", name: "Premium Career", price: "$79/mo", desc: "For professionals serious about career advancement", cta: "Get Premium", href: "/pricing" },
];

const PricingOverview = () => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
      {tiers.map((t) => (
        <Card key={t.id} className="h-full">
          <CardHeader>
            <CardTitle className="text-base">{t.name}</CardTitle>
            <CardDescription>{t.desc}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <p className="text-2xl font-semibold">{t.price}</p>
            <Button asChild>
              <a href={t.href}>{t.cta}</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PricingOverview;


