import { Code2, Brain, Gauge, Lock, BarChart, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    name: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze resumes with high accuracy.",
    icon: Brain,
  },
  {
    name: "Skill Matching",
    description: "Automatically match candidate skills with job requirements.",
    icon: Code2,
  },
  {
    name: "Performance Metrics",
    description: "Detailed analytics and scoring for each candidate.",
    icon: Gauge,
  },
  {
    name: "Secure Processing",
    description: "Enterprise-grade security for all your sensitive data.",
    icon: Lock,
  },
  {
    name: "Advanced Analytics",
    description: "Comprehensive reports and insights for better decision making.",
    icon: BarChart,
  },
  {
    name: "Team Collaboration",
    description: "Share and collaborate on candidate assessments.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to streamline your hiring
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered platform provides comprehensive tools for efficient resume analysis and candidate evaluation.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name} className="flex flex-col">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-semibold">
                    {feature.name}
                  </CardTitle>
                  <CardDescription className="mt-2 leading-7">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}