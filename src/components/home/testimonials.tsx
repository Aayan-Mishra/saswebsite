import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import content from "@/text/home.json";

const c = content.testimonials;

const testimonials = [
  {
    initials: "LM",
    name: c.t1Name,
    role: c.t1Role,
    rating: 5,
    quote: c.t1Quote,
    outcome: c.t1Outcome,
    color: "bg-primary-100 text-primary-700",
  },
  {
    initials: "JP",
    name: c.t2Name,
    role: c.t2Role,
    rating: 5,
    quote: c.t2Quote,
    outcome: c.t2Outcome,
    color: "bg-gold-100 text-gold-800",
  },
  {
    initials: "LC",
    name: c.t3Name,
    role: c.t3Role,
    rating: 5,
    quote: c.t3Quote,
    outcome: c.t3Outcome,
    color: "bg-secondary-100 text-secondary-700",
  },
  {
    initials: "RT",
    name: c.t4Name,
    role: c.t4Role,
    rating: 4,
    quote: c.t4Quote,
    outcome: c.t4Outcome,
    color: "bg-navy-100 text-navy-800",
  },
];

export function Testimonials() {
  return (
    <Section background="muted">
      <div className="text-center mb-12">
        <SectionTitle>{c.title}</SectionTitle>
        <SectionSubtitle className="mx-auto">
          {c.subtitle}
        </SectionSubtitle>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <Card key={t.name} padding="lg" hover>
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
              >
                {t.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-900">{t.name}</p>
                <p className="text-sm text-text-secondary">{t.role}</p>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating
                        ? "fill-gold-400 text-gold-400"
                        : "fill-navy-200 text-navy-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 inline-flex items-center rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              {t.outcome}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
