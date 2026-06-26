import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  BookOpen,
  FileCheck,
  Target,
  Users,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronDown,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Test-Specific Practice",
    description:
      "Students work through past NAPLAN-style questions and full-length practice tests that mirror the real assessment in format, timing, and difficulty.",
  },
  {
    icon: Target,
    title: "Targeted Skill Gaps",
    description:
      "Every practice test generates a diagnostic profile. Tutors use this data to zero in on weak areas and accelerate improvement where it matters most.",
  },
  {
    icon: BookOpen,
    title: "Writing Mastery",
    description:
      "NAPLAN writing is unique. We teach the specific text types, structure, and techniques that markers look for — narrative and persuasive, with real-time feedback.",
  },
  {
    icon: Clock,
    title: "Time Management Strategies",
    description:
      "Students learn how to pace themselves, allocate time per question, and avoid common traps — skills that pay dividends well beyond NAPLAN.",
  },
  {
    icon: Users,
    title: "Small Group & Individual",
    description:
      "Choose between focused small-group sessions or one-on-one coaching. Either way, your child receives the personalised attention they deserve.",
  },
  {
    icon: Layers,
    title: "Cross-Year Consistency",
    description:
      "Our program spans Years 3, 5, 7, and 9, ensuring a seamless progression of skills as students move through each NAPLAN milestone.",
  },
];

const yearLevels = [
  {
    year: "Year 3",
    description:
      "The first NAPLAN experience. We build foundational test-taking skills, reading fluency, and basic numeracy confidence in a supportive environment.",
    focus: ["Basic numeracy", "Reading comprehension", "Simple persuasive writing", "Test familiarity"],
  },
  {
    year: "Year 5",
    description:
      "With greater cognitive maturity, Year 5 students tackle more complex problems. We deepen analytical skills and writing sophistication.",
    focus: ["Advanced numeracy", "Critical reading", "Narrative & persuasive writing", "Time management"],
  },
  {
    year: "Year 7",
    description:
      "The jump to secondary school brings new expectations. Our Year 7 program reinforces foundational skills while introducing secondary-level thinking.",
    focus: ["Algebra & geometry", "Analytical reading", "Evidence-based writing", "Exam stamina"],
  },
  {
    year: "Year 9",
    description:
      "The most challenging NAPLAN stage. Students need sophisticated language skills and higher-order mathematical reasoning to excel.",
    focus: ["Complex problem-solving", "Critical interpretation", "Persuasive sophistication", "Peak performance"],
  },
];

const faqs = [
  {
    question: "What is NAPLAN and why does it matter?",
    answer:
      "NAPLAN is a national assessment that measures student proficiency in literacy and numeracy across Years 3, 5, 7, and 9. While it does not count towards school grades, strong results build confidence, identify learning gaps, and can influence subject placement in senior years.",
  },
  {
    question: "When should my child start NAPLAN preparation?",
    answer:
      "We recommend beginning 8-12 weeks before the test. This provides enough time to refresh core skills, practise test techniques, and build confidence without burnout.",
  },
  {
    question: "What domains does NAPLAN cover?",
    answer:
      "NAPLAN assesses four domains: Reading, Writing, Language Conventions (spelling, grammar, punctuation), and Numeracy. Our program covers all four with equal rigour.",
  },
  {
    question: "Do you offer practice tests under real conditions?",
    answer:
      "Absolutely. Students sit full-length mock tests in a timed setting that replicates the actual NAPLAN experience, complete with the online testing platform where applicable.",
  },
  {
    question: "Can you help if my child is behind in a specific area?",
    answer:
      "Yes. Our diagnostic approach identifies exact skill gaps, and we tailor sessions to close them rapidly. Whether it is fractions, persuasive writing, or grammar, we address it directly.",
  },
  {
    question: "What results can I expect from your program?",
    answer:
      "Our students consistently achieve results in the top two NAPLAN bands. More importantly, they leave the program with stronger foundational skills and genuine academic confidence.",
  },
];

export default function NAPLANPreparationPage() {
  return (
    <main>
      <PageHeader
        title="NAPLAN Success"
        description="Approach NAPLAN with confidence, not anxiety. Our targeted program builds the skills, strategies, and mindset needed to achieve outstanding results."
      />

      {/* What is NAPLAN? */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" size="md" className="mb-4">
              National Assessment
            </Badge>
            <SectionTitle>What Is NAPLAN?</SectionTitle>
            <SectionSubtitle className="max-w-none">
              The National Assessment Program — Literacy and Numeracy is Australia&apos;s benchmark for core academic
              skills.
            </SectionSubtitle>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                NAPLAN tests are administered every May to students in Years 3, 5, 7, and 9. The assessments measure
                proficiency in reading, writing, language conventions, and numeracy — the foundational capabilities that
                underpin all future learning.
              </p>
              <p>
                Strong NAPLAN results build confidence and open doors. They provide an objective measure of progress,
                highlight areas for growth, and give schools valuable data to support each student&apos;s learning journey.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Reading
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Writing
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Language Conventions
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Numeracy
              </div>
            </div>
          </div>

          {/* Program Stats / Quick Facts Card */}
          <Card padding="lg" className="border-primary-100 border-2">
            <Badge variant="primary" size="md" className="mb-4">
              Quick Facts
            </Badge>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">NAPLAN Success Program</h3>
            <div className="space-y-4 divide-y divide-border">
              <div className="flex justify-between items-center pt-1">
                <span className="text-text-secondary">Duration</span>
                <span className="font-semibold text-navy-900">8 or 12 weeks</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Sessions per week</span>
                <span className="font-semibold text-navy-900">1 session</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Session length</span>
                <span className="font-semibold text-navy-900">90 minutes</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Practice tests</span>
                <span className="font-semibold text-navy-900">3-5 full-length</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Format</span>
                <span className="font-semibold text-navy-900">Online &amp; in-person</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Investment (total)</span>
                <span className="text-2xl font-bold text-primary-600">$420</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Link href="/enrol">
                <Button variant="primary" size="lg" className="w-full">
                  Enrol Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-xs text-text-tertiary text-center">
                First session free. Full refund within 14 days.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Our NAPLAN Program Features */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="primary" size="md" className="mb-4">
            How We Build Success
          </Badge>
          <SectionTitle>Our NAPLAN Program</SectionTitle>
          <SectionSubtitle className="mx-auto">
            A structured approach that combines rigorous practice with targeted skill development.
          </SectionSubtitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} hover padding="lg">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Year-Specific Info */}
      <Section background="muted">
        <div className="text-center mb-12">
          <Badge variant="orange" size="md" className="mb-4">
            Tailored by Year
          </Badge>
          <SectionTitle>A Program for Every Stage</SectionTitle>
          <SectionSubtitle className="mx-auto">
            NAPLAN demands different skills at each year level. Our curriculum adapts to meet students exactly where
            they are.
          </SectionSubtitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {yearLevels.map((level) => (
            <Card key={level.year} hover padding="lg">
              <Badge variant="orange" size="md" className="mb-3">
                {level.year}
              </Badge>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{level.description}</p>
              <ul className="space-y-2">
                {level.focus.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-navy-800">
                    <CheckCircle2 className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Practice Test Info */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="gold" size="md" className="mb-4">
              Mock Tests
            </Badge>
            <SectionTitle>Practice That Mirrors the Real Thing</SectionTitle>
            <SectionSubtitle className="max-w-none">
              Our practice tests are designed to replicate the official NAPLAN experience in every detail.
            </SectionSubtitle>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Students sit mock tests under timed conditions using past paper formats and the official online testing
                platform interface. Every test is marked by our expert tutors, who provide detailed feedback broken down
                by skill domain.
              </p>
              <p>
                Performance data feeds directly into lesson planning, ensuring every session targets the areas that will
                deliver the greatest improvement.
              </p>
            </div>
          </div>
          <Card padding="lg" className="bg-navy-50 border-navy-100">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">Realistic Conditions</h4>
                  <p className="text-sm text-text-secondary">Timed, invigilated tests that build exam stamina</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">Detailed Analytics</h4>
                  <p className="text-sm text-text-secondary">Domain-level breakdown with growth tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">Actionable Feedback</h4>
                  <p className="text-sm text-text-secondary">Personalised study plans based on performance data</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="muted" id="faq">
        <div className="text-center mb-12">
          <Badge variant="navy" size="md" className="mb-4">
            Got Questions?
          </Badge>
          <SectionTitle>NAPLAN FAQs</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Everything you need to know about our NAPLAN Success program.
          </SectionSubtitle>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white rounded-xl border border-border overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none text-navy-900 font-semibold hover:bg-navy-50/50 transition-colors">
                {faq.question}
                <ChevronDown className="h-5 w-5 text-text-tertiary group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <Star className="h-8 w-8 text-gold-400" />
          </div>
          <SectionTitle className="text-white">Ready to Ace NAPLAN?</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Give your child the structured preparation they need to perform at their best.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                Enrol Today
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="secondary" size="lg">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
