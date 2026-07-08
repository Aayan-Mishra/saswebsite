"use client";

import { useState } from "react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { faqSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What are your fees and how do payment plans work?",
    answer:
      "Fees vary by program, year level, and session format (group or individual). We offer flexible fortnightly and monthly payment plans to make quality tutoring accessible. Contact us for a personalised fee schedule tailored to your child's needs.",
  },
  {
    question: "Do you offer small group or one-on-one tutoring?",
    answer:
      "Both. We provide small group sessions for collaborative learning, as well as dedicated one-on-one tutoring for students who need individual attention. Many families choose a mix of both formats across different subjects.",
  },
  {
    question: "Can we try a lesson before committing?",
    answer:
      "Absolutely. We offer a no-obligation trial lesson so you and your child can experience our teaching approach firsthand. There's no commitment — just a chance to meet the tutor and see if it's the right fit.",
  },
  {
    question: "What year levels and subjects do you cover?",
    answer:
      "We tutor Kindergarten through Year 12 across all core subjects including English, Mathematics, Science, and Humanities. We also offer specialised programs for OC, NAPLAN, and Selective School exam preparation.",
  },
  {
    question: "What happens if my child misses a lesson?",
    answer:
      "We understand life gets busy. You can reschedule with at least 24 hours' notice at no extra cost. For unforeseen circumstances, we work with families to find a suitable make-up time or provide session materials to keep progress on track.",
  },
];

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq">
      <JsonLd data={faqSchema(faqs)} />
      <div className="text-center mb-12">
        <SectionTitle>Got Questions?</SectionTitle>
        <SectionSubtitle className="mx-auto">
          Quick answers to the most common questions about our programs.
        </SectionSubtitle>
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-border bg-white overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-secondary"
              >
                <span className="text-base font-semibold text-navy-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/marketing/faq"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          View All FAQs
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Link>
      </div>
    </Section>
  );
}
