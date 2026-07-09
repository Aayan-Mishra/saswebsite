"use client";

import { useState } from "react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { faqSchema } from "@/lib/seo";
import content from "@/content/site.json";

const c = content.home.faq;

const faqs = [
  { question: c.q1Question, answer: c.q1Answer },
  { question: c.q2Question, answer: c.q2Answer },
  { question: c.q3Question, answer: c.q3Answer },
  { question: c.q4Question, answer: c.q4Answer },
  { question: c.q5Question, answer: c.q5Answer },
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
        <SectionTitle>{c.title}</SectionTitle>
        <SectionSubtitle className="mx-auto">
          {c.subtitle}
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
          {c.viewAllLabel}
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Link>
      </div>
    </Section>
  );
}
