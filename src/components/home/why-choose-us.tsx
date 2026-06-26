import { Section, SectionTitle } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  HeartHandshake,
  TrendingUp,
  Target,
  Users,
  Eye,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description:
      "Research-backed curriculum aligned with the Australian syllabus",
  },
  {
    icon: HeartHandshake,
    title: "Personalised Support",
    description:
      "Tailored programs adapted to each student's unique learning style",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Real-time insights into your child's academic growth",
  },
  {
    icon: Target,
    title: "Exam Strategy",
    description:
      "Proven techniques for OC, NAPLAN, and Selective success",
  },
  {
    icon: Users,
    title: "Small Groups & 1-on-1",
    description:
      "Flexible formats to suit every learner",
  },
  {
    icon: Eye,
    title: "Parent Visibility",
    description:
      "Full access to session notes, reports, and tutor communication",
  },
];

export function WhyChooseUs() {
  return (
    <Section background="navy">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <SectionTitle className="text-white !text-3xl md:!text-4xl">
            Why Families Choose Success at School
          </SectionTitle>
          <div className="mt-10 space-y-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-5 w-5 text-primary-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-navy-200 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <Card padding="lg" className="relative overflow-hidden bg-white/5 border-white/10 backdrop-blur">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-gold-400" />
                  <div className="h-3 w-3 rounded-full bg-primary-400" />
                </div>
                <span className="text-xs text-navy-300">Student Dashboard</span>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">Maths Progress</span>
                    <span className="text-sm text-primary-300">+24%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">English Progress</span>
                    <span className="text-sm text-primary-300">+18%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="text-2xl font-bold text-white">95%</p>
                    <p className="text-xs text-navy-300">Avg. Attendance</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="text-2xl font-bold text-white">4.9</p>
                    <p className="text-xs text-navy-300">Tutor Rating</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Reading", "Writing", "Numeracy"].map((subject) => (
                    <div
                      key={subject}
                      className="rounded-lg bg-white/5 p-2 text-center"
                    >
                      <p className="text-xs text-navy-300">{subject}</p>
                      <p className="text-sm font-semibold text-white">A</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs text-navy-400">Mock dashboard representation</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
