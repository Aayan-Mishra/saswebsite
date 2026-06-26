"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Search,
  BookOpen,
  GraduationCap,
  DollarSign,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";

const categories = ["All", "Enrolment", "Programs", "Fees", "Sessions", "Policies"] as const;

const faqItems = [
  {
    question: "How much do your tutoring programs cost?",
    answer:
      "Program fees range from $420 to $560 per term depending on the subject and program type. We also offer holiday intensives and one-on-one sessions at separate rates. All prices include lesson materials, progress reports, and access to our online learning portal.",
    category: "Fees",
  },
  {
    question: "What class formats do you offer?",
    answer:
      "We offer small-group classes (max 8 students per group), one-on-one private tutoring, and intensive holiday workshops. Each format is designed to suit different learning styles, goals, and schedules. Our team can help you choose the right format for your child.",
    category: "Programs",
  },
  {
    question: "Can my child try a session before enrolling?",
    answer:
      "Absolutely. We offer a free first session with no obligation. This gives your child the chance to meet their tutor, experience our teaching approach, and decide if we are the right fit — all before any commitment.",
    category: "Enrolment",
  },
  {
    question: "What year levels do you cater for?",
    answer:
      "We support students from Kindergarten through to Year 12. Our programs span early literacy and numeracy foundations through to HSC preparation. Each program is tailored to the specific developmental stage and academic requirements of the year level.",
    category: "Programs",
  },
  {
    question: "Do you help with OC Test preparation?",
    answer:
      "Yes. Our OC Preparation program is one of our flagship offerings. It covers all four test domains — reading, mathematical reasoning, thinking skills, and writing — with structured curriculum, regular mock tests, and personalised feedback. Many of our students secure placements at leading OC schools.",
    category: "Programs",
  },
  {
    question: "Do you prepare students for NAPLAN?",
    answer:
      "Our NAPLAN Success program targets students in Years 3, 5, 7, and 9. We provide test-specific practice, skill gap analysis, writing mastery coaching, and time management strategies. Our goal is not just strong results but genuine skill development that lasts beyond the test.",
    category: "Programs",
  },
  {
    question: "What about Selective High School preparation?",
    answer:
      "Our Selective Preparation program is our most comprehensive offering. It includes weekly 2-hour mastery sessions, full-length mock tests every 4-6 weeks, detailed performance analytics, and targeted feedback. With a 94% offer success rate, it is our most proven program.",
    category: "Programs",
  },
  {
    question: "What happens if my child misses a session?",
    answer:
      "We understand that life happens. Students can attend a make-up session in another class of the same level, subject to availability. We also provide lesson catch-up materials and summaries so no learning is lost. Please notify us at least 24 hours in advance where possible.",
    category: "Sessions",
  },
  {
    question: "Do you have a parent portal?",
    answer:
      "Yes. All enrolled families receive access to our online parent portal, where you can view lesson schedules, progress reports, performance data, invoices, and communicate directly with your child's tutor. We believe transparency is key to a successful tutoring partnership.",
    category: "Policies",
  },
  {
    question: "What is your refund and cancellation policy?",
    answer:
      "We offer a full 14-day satisfaction guarantee from the start of your first term. After this period, cancellations require 2 weeks notice. Refunds for remaining prepaid sessions are processed within 5 business days. Holiday programs and intensives have a separate cancellation policy outlined at enrolment.",
    category: "Policies",
  },
  {
    question: "What qualifications do your tutors have?",
    answer:
      "All our tutors hold at minimum a bachelor's degree in their teaching subject, and many hold postgraduate qualifications. Each tutor undergoes a rigorous selection process, background checks, and ongoing professional development. Many are current or former classroom teachers who bring real school experience.",
    category: "Programs",
  },
  {
    question: "How much homework do students receive?",
    answer:
      "Students receive targeted homework after each session, typically requiring 30-60 minutes depending on the program and year level. Homework reinforces lesson content and builds independent study habits. We are mindful of balance and never assign busy work.",
    category: "Sessions",
  },
  {
    question: "How do you track and report student progress?",
    answer:
      "We provide detailed progress reports every term, including performance data, skill domain breakdowns, tutor comments, and recommended focus areas. Parents also receive weekly lesson summaries and can access real-time updates through the parent portal at any time.",
    category: "Sessions",
  },
  {
    question: "Do you run programs during school holidays?",
    answer:
      "Yes. We offer intensive holiday workshops that condense key learning into focused multi-day sessions. These are particularly popular for exam preparation (OC, Selective, NAPLAN) and for students who want to get ahead before the next term. Holiday programs are announced 6 weeks before each break.",
    category: "Programs",
  },
  {
    question: "How do I enrol my child?",
    answer:
      "Enrolling is simple. You can enrol online through our website, call our team, or visit any campus. We recommend booking a free assessment first so we can place your child in the right program and level. Start by booking a free session through our enrolment page.",
    category: "Enrolment",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main>
      <PageHeader
        title="Frequently Asked Questions"
        description="Quick answers to the most common questions about our programs, fees, and policies. Cannot find what you are looking for? Get in touch."
      />

      <Section background="muted">
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-2 border-border bg-white pl-12 pr-4 py-3 text-text placeholder:text-text-tertiary transition-all duration-200 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-navy-900 text-white shadow-md"
                  : "bg-white text-text-secondary border border-border hover:border-navy-300 hover:text-navy-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-text-secondary">
              No questions match your search. Try a different keyword or browse all categories.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFAQs.map((item, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-border overflow-hidden transition-all duration-200 hover:border-primary-200"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none text-navy-900 font-semibold hover:bg-navy-50/50 transition-colors gap-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        item.category === "Enrolment"
                          ? "primary"
                          : item.category === "Fees"
                          ? "gold"
                          : item.category === "Sessions"
                          ? "orange"
                          : item.category === "Policies"
                          ? "navy"
                          : "outline"
                      }
                      size="sm"
                    >
                      {item.category}
                    </Badge>
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-text-tertiary group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-border pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        )}
      </Section>

      {/* Still Have Questions? */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle className="text-white">Still Have Questions?</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Our team is here to help. Reach out and we will get back to you within 24 hours.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/marketing/contact">
              <Button variant="gold" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link href="/enrol">
              <Button variant="secondary" size="lg">
                Book a Free Session
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
