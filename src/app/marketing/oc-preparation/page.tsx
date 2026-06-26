import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, courseSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileCheck,
  Clock,
  Users,
  Target,
  Brain,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description:
      "Our OC program follows a carefully sequenced syllabus that covers all test domains: reading, mathematical reasoning, thinking skills, and writing.",
  },
  {
    icon: FileCheck,
    title: "Regular Mock Tests",
    description:
      "Students sit full-length simulated exams under timed conditions, building stamina and familiarity with the real test format.",
  },
  {
    icon: Clock,
    title: "Exam Strategy Mastery",
    description:
      "We teach students how to manage time, eliminate distractors, and approach each question type with a proven methodical strategy.",
  },
  {
    icon: Users,
    title: "Small Group Classes",
    description:
      "With a maximum of 8 students per group, every child receives personalised attention and targeted feedback from their tutor.",
  },
  {
    icon: Brain,
    title: "Thinking Skills Focus",
    description:
      "The new OC test emphasises critical thinking. Our curriculum develops logic, pattern recognition, and abstract reasoning through daily practice.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Detailed performance reports after every mock test track growth across every domain, so families always know where to focus.",
  },
];

const faqs = [
  {
    question: "What is the OC Test and who is it for?",
    answer:
      "The Opportunity Class (OC) Test is a statewide assessment for Year 4 students in NSW seeking placement in an OC class for Years 5 and 6. It assesses reading, mathematical reasoning, thinking skills, and writing.",
  },
  {
    question: "When should my child start OC preparation?",
    answer:
      "We recommend beginning preparation in Term 1 of Year 4, though many successful students start in Year 3. Early exposure builds confidence and reduces test anxiety.",
  },
  {
    question: "How are OC classes different from regular classes?",
    answer:
      "OC classes offer a enriched curriculum with greater depth, faster pacing, and exposure to more complex concepts. They are designed for gifted and high-potential students.",
  },
  {
    question: "What is the OC test format?",
    answer:
      "The OC Placement Test consists of multiple-choice questions across reading, mathematical reasoning, and thinking skills, plus a written expression task. Total testing time is approximately 90 minutes.",
  },
  {
    question: "How long is your OC program?",
    answer:
      "Our comprehensive program runs for 20-30 weeks leading up to the test. We also offer intensive holiday workshops and a 10-week express program for late starters.",
  },
  {
    question: "Do you offer mock OC tests?",
    answer:
      "Yes. Students sit full-length mock tests every 4-6 weeks under exam conditions. Each test is marked by our team with detailed feedback and a percentile ranking.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "OC Test Preparation Tutoring | Year 4 Opportunity Class Prep",
  description:
    "Opportunity Class (OC) test preparation for Year 4 students across Western Sydney. Targeted coaching in thinking skills, reading and mathematical reasoning. Book a free assessment.",
  path: "/marketing/oc-preparation",
  keywords: [
    "OC preparation",
    "OC test tutoring",
    "Opportunity Class test",
    "Year 4 OC tutoring",
    "OC test Western Sydney",
  ],
});

export default function OCPreparationPage() {
  return (
    <main>
      <JsonLd
        data={courseSchema({
          name: "OC (Opportunity Class) Test Preparation",
          description:
            "Year 4 Opportunity Class placement test preparation covering thinking skills, reading and mathematical reasoning.",
          path: "/marketing/oc-preparation",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/marketing/programs" },
          { name: "OC Preparation", path: "/marketing/oc-preparation" },
        ])}
      />
      <PageHeader
        title="OC Preparation"
        description="Give your child the edge they need to succeed in the Opportunity Class Placement Test. Our expert program builds skills, confidence, and a love of learning."
      />

      {/* What is the OC Test? */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="gold" size="md" className="mb-4">
              Opportunity Class
            </Badge>
            <SectionTitle>What Is the OC Test?</SectionTitle>
            <SectionSubtitle className="max-w-none">
              The Opportunity Class Placement Test is the gateway to NSW&apos;s most academically enriched primary school
              environment.
            </SectionSubtitle>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Held annually for current Year 4 students, the OC Test assesses reading comprehension, mathematical
                reasoning, critical thinking skills, and written expression. Success opens the door to a learning
                environment that challenges and accelerates high-potential students.
              </p>
              <p>
                With competition intensifying each year, targeted preparation is no longer optional — it is essential.
                At Success at School, we have helped hundreds of students secure coveted OC placements through a
                program that balances rigorous academics with genuine intellectual engagement.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Reading Comprehension
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Mathematical Reasoning
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Thinking Skills
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Written Expression
              </div>
            </div>
          </div>

          {/* Pricing / Format Card */}
          <Card padding="lg" className="border-primary-100 border-2">
            <Badge variant="primary" size="md" className="mb-4">
              Program Details
            </Badge>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Program Format &amp; Pricing</h3>
            <div className="space-y-4 divide-y divide-border">
              <div className="flex justify-between items-center pt-1">
                <span className="text-text-secondary">Duration</span>
                <span className="font-semibold text-navy-900">20 or 30 weeks</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Sessions per week</span>
                <span className="font-semibold text-navy-900">1 or 2 sessions</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Session length</span>
                <span className="font-semibold text-navy-900">90 minutes</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Class size</span>
                <span className="font-semibold text-navy-900">Max 8 students</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Mock tests</span>
                <span className="font-semibold text-navy-900">4-6 full-length</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-text-secondary">Investment (per term)</span>
                <span className="text-2xl font-bold text-primary-600">$520</span>
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
                First session free. Full refund within 14 days if not completely satisfied.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Our OC Program Features */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="gold" size="md" className="mb-4">
            How We Accelerate Success
          </Badge>
          <SectionTitle>Our OC Program</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Every element of our program is designed to launch your child ahead — academically, strategically, and
            emotionally.
          </SectionSubtitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} hover padding="lg">
              <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-gold-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="muted" id="faq">
        <div className="text-center mb-12">
          <Badge variant="navy" size="md" className="mb-4">
            Got Questions?
          </Badge>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Everything you need to know about our OC Preparation program.
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
          <SectionTitle className="text-white">Ready to Launch Your Child Ahead?</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Give your child the preparation they deserve. Limited places available each term.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                Secure Your Spot
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="secondary" size="lg">
                Ask a Question
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
