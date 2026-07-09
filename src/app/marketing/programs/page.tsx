"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Sparkles,
  BookOpen,
  GraduationCap,
  Target,
  BarChart3,
  Brain,
  Calculator,
  Beaker,
  Globe,
  ArrowRight,
} from "lucide-react";
import content from "@/text/programs.json";

const p = content.programs;

const yearLevels = ["All", "Early Years", "Years 1-2", "Years 3-4", "Years 5-6", "Years 7-8", "Years 9-10", "Years 11-12"];

const programTypes = ["All", "Foundation", "Exam Prep", "Core Subjects", "Subject Specialist"];

const programs = [
  {
    title: p.kindergartenTitle,
    years: "Early Years",
    type: "Foundation",
    icon: Sparkles,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: p.kindergartenDescription,
    href: "/enrol",
  },
  {
    title: p.primaryTitle,
    years: "Years 1-4",
    type: "Core Subjects",
    icon: BookOpen,
    color: "text-primary-500",
    bgColor: "bg-primary-50",
    description: p.primaryDescription,
    href: "/enrol",
  },
  {
    title: p.ocTitle,
    years: "Years 3-4",
    type: "Exam Prep",
    icon: Target,
    color: "text-gold-500",
    bgColor: "bg-gold-50",
    description: p.ocDescription,
    href: "/marketing/oc-preparation",
  },
  {
    title: p.naplanTitle,
    years: "Years 3, 5, 7, 9",
    type: "Exam Prep",
    icon: BarChart3,
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
    description: p.naplanDescription,
    href: "/marketing/naplan-preparation",
  },
  {
    title: p.selectiveTitle,
    years: "Years 5-6",
    type: "Exam Prep",
    icon: Brain,
    color: "text-navy-700",
    bgColor: "bg-navy-50",
    description: p.selectiveDescription,
    href: "/marketing/selective-preparation",
  },
  {
    title: p.highSchoolTitle,
    years: "Years 7-10",
    type: "Core Subjects",
    icon: GraduationCap,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    description: p.highSchoolDescription,
    href: "/enrol",
  },
  {
    title: p.hscTitle,
    years: "Years 11-12",
    type: "Exam Prep",
    icon: Target,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: p.hscDescription,
    href: "/enrol",
  },
  {
    title: p.subjectSpecialistTitle,
    years: "Years 7-12",
    type: "Subject Specialist",
    icon: Beaker,
    color: "text-gold-600",
    bgColor: "bg-gold-50",
    description: p.subjectSpecialistDescription,
    href: "/enrol",
  },
];

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        !searchQuery ||
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "All" || program.years.includes(selectedYear);
      const matchesType = selectedType === "All" || program.type === selectedType;
      return matchesSearch && matchesYear && matchesType;
    });
  }, [searchQuery, selectedYear, selectedType]);

  return (
    <main>
      <PageHeader
        title={content.pageHeader.title}
        description={content.pageHeader.description}
      />

      <Section background="muted">
        {/* Search and Filter Bar */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
            <input
              type="text"
              placeholder={content.ui.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-border bg-white pl-12 pr-4 py-3 text-text placeholder:text-text-tertiary transition-all duration-200 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-secondary mr-1">{content.ui.yearLevelLabel}</span>
              {yearLevels.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedYear === year
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-white text-text-secondary border border-border hover:border-primary-200 hover:text-primary-600"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-medium text-text-secondary mr-1">{content.ui.programTypeLabel}</span>
            {programTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedType === type
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-white text-text-secondary border border-border hover:border-navy-300 hover:text-navy-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Program Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-text-secondary">{content.ui.emptyState}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.title} hover padding="lg" className="flex flex-col h-full">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl ${program.bgColor} flex items-center justify-center mb-4`}>
                    <program.icon className={`h-7 w-7 ${program.color}`} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="navy" size="sm">
                      {program.years}
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {program.type}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">{program.title}</h3>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-text-secondary leading-relaxed flex-1">{program.description}</p>
                  <div className="mt-6">
                    <Link href={program.href}>
                      <Button variant="outline" size="md" className="w-full">
                        {content.ui.exploreButton}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* Bottom CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle className="text-white">{content.bottomCta.title}</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            {content.bottomCta.subtitle}
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                {content.bottomCta.primaryButton}
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="secondary" size="lg">
                {content.bottomCta.secondaryButton}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
