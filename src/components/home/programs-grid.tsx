import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Baby,
  BookOpen,
  Target,
  BarChart3,
  Award,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const programs = [
  {
    icon: Baby,
    title: "Kindergarten Readiness",
    description:
      "Build early literacy, numeracy, and social skills to give your child a confident head start.",
    color: "text-primary-500",
    bg: "bg-primary-100",
    href: "/marketing/programs",
  },
  {
    icon: BookOpen,
    title: "Primary Excellence",
    description:
      "Strengthen core subjects and develop critical thinking skills across all key learning areas.",
    color: "text-secondary-500",
    bg: "bg-secondary-100",
    href: "/marketing/programs",
  },
  {
    icon: Target,
    title: "OC Preparation",
    description:
      "Targeted strategy and practice for Opportunity Class placement with past paper mastery.",
    color: "text-orange-500",
    bg: "bg-orange-100",
    href: "/marketing/oc-preparation",
  },
  {
    icon: BarChart3,
    title: "NAPLAN Success",
    description:
      "Confidence-building preparation across all NAPLAN domains with proven test-taking strategies.",
    color: "text-navy-500",
    bg: "bg-navy-100",
    href: "/marketing/naplan-preparation",
  },
  {
    icon: Award,
    title: "Selective Preparation",
    description:
      "Comprehensive Selective exam training with mock tests, time management, and targeted feedback.",
    color: "text-gold-500",
    bg: "bg-gold-100",
    href: "/marketing/selective-preparation",
  },
  {
    icon: GraduationCap,
    title: "High School Mastery",
    description:
      "Expert support across Year 7–12 subjects with aligned syllabus content and exam preparation.",
    color: "text-primary-500",
    bg: "bg-primary-100",
    href: "/marketing/programs",
  },
];

export function ProgramsGrid() {
  return (
    <Section id="programs">
      <div className="text-center mb-12">
        <SectionTitle>Find Your Program</SectionTitle>
        <SectionSubtitle className="mx-auto">
          From Kindergarten foundations to OC, NAPLAN, and Selective exam
          mastery — we have the right program for every student.
        </SectionSubtitle>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, i) => {
          const Icon = program.icon;
          return (
            <Reveal key={program.title} delay={(i % 3) * 0.08} className="h-full">
            <Card padding="lg" hover className="h-full">
              <div
                className={cn(
                  "mb-5 flex h-12 w-12 items-center justify-center rounded-xl",
                  program.bg
                )}
              >
                <Icon className={cn("h-6 w-6", program.color)} />
              </div>
              <h3 className="text-xl font-semibold text-navy-900">
                {program.title}
              </h3>
              <p className="mt-2 text-text-secondary leading-relaxed">
                {program.description}
              </p>
              <Link
                href={program.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
