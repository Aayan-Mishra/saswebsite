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
  Trophy,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import content from "@/text/home.json";

const c = content.programs;

const programs = [
  {
    icon: Baby,
    title: c.kindergartenTitle,
    description: c.kindergartenDescription,
    color: "text-primary-500",
    bg: "bg-primary-100",
    href: "/marketing/programs",
  },
  {
    icon: BookOpen,
    title: c.primaryTitle,
    description: c.primaryDescription,
    color: "text-secondary-500",
    bg: "bg-secondary-100",
    href: "/marketing/programs",
  },
  {
    icon: Target,
    title: c.ocTitle,
    description: c.ocDescription,
    color: "text-orange-500",
    bg: "bg-orange-100",
    href: "/marketing/oc-preparation",
  },
  {
    icon: BarChart3,
    title: c.naplanTitle,
    description: c.naplanDescription,
    color: "text-navy-500",
    bg: "bg-navy-100",
    href: "/marketing/naplan-preparation",
  },
  {
    icon: Award,
    title: c.selectiveTitle,
    description: c.selectiveDescription,
    color: "text-gold-500",
    bg: "bg-gold-100",
    href: "/marketing/selective-preparation",
  },
  {
    icon: GraduationCap,
    title: c.highSchoolTitle,
    description: c.highSchoolDescription,
    color: "text-primary-500",
    bg: "bg-primary-100",
    href: "/marketing/programs",
  },
  {
    icon: Trophy,
    title: c.hscTitle,
    description: c.hscDescription,
    color: "text-orange-500",
    bg: "bg-orange-100",
    href: "/marketing/programs",
  },
];

export function ProgramsGrid() {
  return (
    <Section id="programs">
      <div className="text-center mb-12">
        <SectionTitle>{c.title}</SectionTitle>
        <SectionSubtitle className="mx-auto">
          {c.subtitle}
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
