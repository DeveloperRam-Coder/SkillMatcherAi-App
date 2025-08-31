import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, LogIn, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Individual menu item component
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface NavigationBarProps {
  scrolled: boolean;
  scrollToSection: (refKey: string) => void;
  extendedFeatures: Array<{
    icon: React.ReactElement;
    title: string;
    description: string;
    color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
  }>;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  scrolled,
  scrollToSection,
  extendedFeatures
}) => {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-sm"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-3">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-xl sm:text-2xl font-bold text-blue-700 cursor-pointer tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SkillMatcherAi
            </motion.span>
          </motion.div>

          {/* Desktop Navigation - Advanced with dropdowns */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    {extendedFeatures.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="row-span-1">
                        <NavigationMenuLink asChild>
                          <a href="#features"
                            className="flex p-2 hover:bg-slate-100 rounded-md transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection('features');
                            }}
                          >
                            <div className={`mr-2 h-8 w-8 rounded-md flex items-center justify-center ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                              feature.color === 'green' ? 'bg-green-100 text-green-600' :
                                feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                  feature.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                    feature.color === 'pink' ? 'bg-pink-100 text-pink-600' :
                                      'bg-indigo-100 text-indigo-600'
                              }`}>
                              {React.cloneElement(feature.icon as React.ReactElement, { className: "h-4 w-4" })}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{feature.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 pt-0 bg-slate-50">
                    <Button variant="link" className="w-full justify-between" asChild>
                      <a href="#features" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('features');
                      }}>
                        View all features
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Career Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-1">
                    {[
                      {
                        title: "AI Mock Interviews",
                        description: "Practice with realistic AI interviewers",
                        color: "bg-blue-100 text-blue-600"
                      },
                      {
                        title: "ATS Resume Builder",
                        description: "Create resumes that pass ATS systems",
                        color: "bg-green-100 text-green-600"
                      },
                      {
                        title: "Skill Assessments",
                        description: "Test and improve your technical skills",
                        color: "bg-purple-100 text-purple-600"
                      },
                      {
                        title: "Job Matching",
                        description: "AI-powered job recommendations",
                        color: "bg-orange-100 text-orange-600"
                      },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild>
                          <a href="#" className="flex items-center p-2 hover:bg-slate-100 rounded-md transition-colors">
                            <div className={`mr-2 h-8 w-8 rounded-md flex items-center justify-center ${item.color}`}>
                              <div className="h-4 w-4"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <ListItem title="Career Blog" href="/resources/blog">
                      Expert insights on job searching and career growth
                    </ListItem>
                    <ListItem title="Interview Tips" href="/resources/interview-tips">
                      Comprehensive guides for interview success
                    </ListItem>
                    <ListItem title="Resume Guide" href="/resources/resume-guide">
                      Learn how to create ATS-optimized resumes
                    </ListItem>
                    <ListItem title="Success Stories" href="/resources/success-stories">
                      See how others landed their dream jobs
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button variant="link" className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('benefits')}>
                  Why Choose Us
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button variant="link" className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('pricing')}>
                  Pricing
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-blue-600">SkillMatcherAi</SheetTitle>
                  <SheetDescription>AI-Powered Career Growth Platform</SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Features</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {extendedFeatures.slice(0, 4).map((feature, idx) => (
                        <SheetClose key={idx} asChild>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('features')}>
                            <div className={`mr-2 h-6 w-6 rounded-md flex items-center justify-center ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                              feature.color === 'green' ? 'bg-green-100 text-green-600' :
                                feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                  feature.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                    'bg-pink-100 text-pink-600'
                              }`}>
                              {React.cloneElement(feature.icon as React.ReactElement, { className: "h-3 w-3" })}
                            </div>
                            {feature.title}
                          </Button>
                        </SheetClose>
                      ))}
                      <SheetClose asChild>
                        <Button variant="link" className="w-full justify-start text-blue-600" onClick={() => scrollToSection('features')}>
                          View all features
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </SheetClose>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Pages</h3>
                    <div className="flex flex-col space-y-1">
                      {[
                        { name: "Benefits", key: 'benefits' },
                        { name: "Pricing", key: 'pricing' },
                        { name: "Testimonials", key: 'testimonials' },
                        { name: "Contact", href: "/contact" }
                      ].map((item, idx) => (
                        <SheetClose key={idx} asChild>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => item.key ? scrollToSection(item.key) : item.href ? navigate(item.href) : null}>
                            {item.name}
                          </Button>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={() => navigate("/login", { state: { isRegistering: true } })}>
                        Get Started Free
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Sign In */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="text-blue-600 border-blue-200 flex items-center gap-2" onClick={() => navigate("/login")}>
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </motion.div>

            {/* Continue with Google */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log("Google Login")}>
                <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-5 w-5" />
                Continue with Google
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
