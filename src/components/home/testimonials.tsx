import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "SM",
    name: "Lisa Mitchell",
    role: "Parent of Year 5 Student",
    rating: 5,
    quote:
      "The transformation in our daughter's confidence has been remarkable. She went from dreading maths to actually looking forward to her tutoring sessions. The personalised approach made all the difference.",
    outcome: "Achieved 95% in OC Placement Test",
    color: "bg-primary-100 text-primary-700",
  },
  {
    initials: "JP",
    name: "James & Priya Patel",
    role: "Parents of Year 3 & Year 7",
    rating: 5,
    quote:
      "Both our children attend for different programs and the progress tracking portal keeps us informed every step of the way. The tutors are genuinely invested in each child's success.",
    outcome: "Both children improved by 2+ grade levels",
    color: "bg-gold-100 text-gold-800",
  },
  {
    initials: "LC",
    name: "Lisa Chen",
    role: "Parent of Year 9 Student",
    rating: 5,
    quote:
      "Selective preparation felt overwhelming until we found Success at School. Their structured approach and mock test strategy gave our son the edge he needed. Couldn't be happier with the outcome.",
    outcome: "Offered placement at Sydney Boys High",
    color: "bg-secondary-100 text-secondary-700",
  },
  {
    initials: "RT",
    name: "Robert Thompson",
    role: "Parent of Kindergarten Student",
    rating: 4,
    quote:
      "Starting school can be daunting but the Kindergarten program made it a joy. Our son's reading improved dramatically and he loves going to his sessions. The foundation built here is invaluable.",
    outcome: "Reading at Year 1 level by term 3",
    color: "bg-navy-100 text-navy-800",
  },
];

export function Testimonials() {
  return (
    <Section background="muted">
      <div className="text-center mb-12">
        <SectionTitle>Real Results, Real Families</SectionTitle>
        <SectionSubtitle className="mx-auto">
          Hear from parents and students who have experienced the Success at
          School difference.
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
