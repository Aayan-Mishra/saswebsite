import { Section, SectionTitle } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Users, Star, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,000+",
    label: "Students Tutored",
    color: "text-primary-500",
    bg: "bg-primary-100",
  },
  {
    icon: Star,
    value: "98%",
    label: "Parent Satisfaction",
    color: "text-gold-500",
    bg: "bg-gold-100",
  },
  {
    icon: Clock,
    value: "15+",
    label: "Years Experience",
    color: "text-navy-500",
    bg: "bg-navy-100",
  },
  {
    icon: TrendingUp,
    value: "92%",
    label: "Improvement Rate",
    color: "text-secondary-500",
    bg: "bg-secondary-100",
  },
];

export function TrustStats() {
  return (
    <Section background="muted">
      <div className="text-center mb-12">
        <SectionTitle className="text-2xl md:text-3xl">
          Trusted by Families Across Sydney
        </SectionTitle>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              padding="lg"
              className="text-center"
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
          );
        })}
      </div>
    </Section>
  );
}
