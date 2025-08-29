import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const tips = [
  {
    q: "How to structure STAR answers?",
    a: "Describe Situation, Task, Action, and Result clearly. Keep it concise and focus on measurable outcomes.",
  },
  {
    q: "How to handle gaps in employment?",
    a: "Be honest, emphasize learning or projects, and connect experiences to the role's requirements.",
  },
  {
    q: "What to do when you don't know an answer?",
    a: "Explain your thought process, outline how you'd find the solution, and relate similar experiences.",
  },
];

const InterviewTips: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Interview Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {tips.map((t, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger>{t.q}</AccordionTrigger>
                  <AccordionContent>{t.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewTips;


