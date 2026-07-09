import { Section, SectionTitle } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Users, Star, Clock, TrendingUp } from "lucide-react";
import content from "@/text/home.json";

const c = content.trustStats;

const stats = [
  {
    icon: Users,
    value: c.studentsTutoredValue,
    label: c.studentsTutoredLabel,
    color: "text-primary-500",
    bg: "bg-primary-100",
  },
  {
    icon: Star,
    value: c.parentSatisfactionValue,
    label: c.parentSatisfactionLabel,
    color: "text-gold-500",
    bg: "bg-gold-100",
  },
  {
    icon: Clock,
    value: c.yearsExperienceValue,
    label: c.yearsExperienceLabel,
    color: "text-navy-500",
    bg: "bg-navy-100",
  },
  {
    icon: TrendingUp,
    value: c.improvementRateValue,
    label: c.improvementRateLabel,
    color: "text-secondary-500",
    bg: "bg-secondary-100",
  },
];

export function TrustStats() {
  return (
    <Section background="muted">
      <div className="text-center mb-12">
        <SectionTitle className="text-2xl md:text-3xl">
          {c.title}
        </SectionTitle>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
            <Card
              padding="lg"
              className="text-center h-full"
              hover
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bg}`}
              >
                <Icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-navy-900">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-text-secondary">
                {stat.label}
              </p>
            </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
