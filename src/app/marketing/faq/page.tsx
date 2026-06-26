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
import { faqCategories as categories, faqItems } from "@/lib/faq-data";

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
