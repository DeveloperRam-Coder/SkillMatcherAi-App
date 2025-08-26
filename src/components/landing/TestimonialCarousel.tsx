
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, UserCheck } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  color: string;
}

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      name: "Alex Chen",
      title: "Software Engineer",
      company: "TechCorp",
      content: "SkillMatcherAi helped me land my dream job at a top tech company. The AI mock interviews were incredibly realistic and the ATS resume optimization got me past the initial screening.",
      rating: 5,
      avatar: "blue",
      color: "blue"
    },
    {
      name: "Sarah Rodriguez",
      title: "Marketing Manager",
      company: "Global Solutions",
      content: "After 6 months of job searching, I used SkillMatcherAi and got 3 interviews in 2 weeks. The platform's insights helped me understand exactly what employers were looking for.",
      rating: 5,
      avatar: "green",
      color: "green"
    },
    {
      name: "Michael Thompson",
      title: "Data Analyst",
      company: "Analytics Inc.",
      content: "The mock tests and skill assessments helped me identify my weak areas. I focused on improving those skills and saw my interview success rate jump from 20% to 80%.",
      rating: 5,
      avatar: "purple",
      color: "purple"
    },
    {
      name: "Emily Johnson",
      title: "UX Designer",
      company: "Creative Co.",
      content: "The ATS resume builder is a game-changer! I went from getting 0 responses to landing interviews at top companies. The keyword optimization really works.",
      rating: 5,
      avatar: "orange",
      color: "orange"
    }
  ];
  
  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };
  
  const colorClasses = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100"
  };
  
  const colorTextClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600"
  };

  return (
    <div className="relative">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {/* Trusted by Job Seekers Worldwide */}
          </h2>
          <p className="text-xl text-gray-600">
            {/* See how our platform has transformed careers and accelerated job success */}
          </p>
        </div>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Card className="bg-white dark:bg-gray-800 shadow-soft border-2 border-gray-200 dark:border-gray-700 md:px-8 py-4">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-[1fr,3fr] gap-8">
                  <div className="flex items-center justify-center">
                    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${colorClasses[testimonials[currentIndex].color]} flex items-center justify-center border-2 border-current/20`}>
                      <UserCheck className={`h-8 w-8 md:h-12 md:w-12 ${colorTextClasses[testimonials[currentIndex].color]}`} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].title}, {testimonials[currentIndex].company}</p>
                      </div>
                    </div>
                    
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic">"{testimonials[currentIndex].content}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center mt-8 gap-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prev}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={next}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
