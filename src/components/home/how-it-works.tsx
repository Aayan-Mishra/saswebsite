import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import {
  Compass,
  ClipboardCheck,
  Users,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Choose Your Goal",
    description: "Select your year level and program",
    color: "from-primary-500 to-secondary-500",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Complete Enrolment",
    description: "Quick online enrolment in minutes",
    color: "from-secondary-500 to-primary-500",
  },
  {
    number: "03",
    icon: Users,
    title: "Get Matched",
    description: "Paired with the perfect tutor for you",
    color: "from-primary-500 to-gold-400",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor growth through your portal",
    color: "from-gold-400 to-primary-500",
  },
];

export function HowItWorks() {
  return (
    <Section background="muted">
      <div className="text-center mb-14">
        <SectionTitle>How It Works</SectionTitle>
        <SectionSubtitle className="mx-auto">
          Getting started is simple. Four steps to academic acceleration.
        </SectionSubtitle>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          return (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {!isLast && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(80%)] h-0.5 bg-gradient-to-r from-primary-200 to-primary-300" />
              )}
              <div
                className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} p-0.5 shadow-lg`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <Icon className="h-7 w-7 text-navy-900" />
                </div>
              </div>
              <span className="mb-2 inline-flex items-center justify-center rounded-full bg-primary-100 px-3 py-0.5 text-xs font-bold text-primary-700">
                Step {step.number}
              </span>
              <h3 className="text-lg font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
