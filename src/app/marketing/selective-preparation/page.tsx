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
  Brain,
  BookOpen,
  FileCheck,
  Target,
  Clock,
  Users,
  CheckCircle2,
  Star,
  TrendingUp,
  Award,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Exam Technique",
    description:
      "We teach students how to decode questions, eliminate incorrect options, structure written responses, and maximise marks — skills that transfer to every future exam.",
  },
  {
    icon: Clock,
    title: "Time Management",
    description:
      "With tight time limits across four test components, strategic pacing is critical. Students practise under timed conditions and learn to allocate time effectively.",
  },
  {
    icon: FileCheck,
    title: "Full-Length Mock Tests",
    description:
      "Students sit regular mock exams that replicate the Selective test exactly — same format, same timing, same pressure. Detailed performance reports follow every test.",
  },
  {
    icon: BookOpen,
    title: "Subject Mastery",
    description:
      "Our curriculum covers all test domains: Reading, Mathematical Reasoning, Thinking Skills, and Writing. Each subject is taught by a specialist tutor who knows the content deeply.",
  },
  {
    icon: Users,
    title: "Small Group Tuition",
    description:
      "With max 8 students per class, every child receives individual attention. Tutors know each student&apos;s strengths, weaknesses, and progress trajectory.",
  },
  {
    icon: Brain,
    title: "Thinking Skills Focus",
    description:
      "The Selective Test places heavy weight on critical thinking. We dedicate substantial lesson time to logic puzzles, pattern recognition, and abstract reasoning.",
  },
];

const stats = [
  { value: "94%", label: "of students receive an offer" },
  { value: "87%", label: "get their first or second preference" },
  { value: "2,500+", label: "students prepared since 2018" },
  { value: "98%", label: "of parents would recommend us" },
];

const faqs = [
  {
    question: "What is the Selective High School Placement Test?",
    answer:
      "The Selective High School Placement Test is an annual assessment for entry into NSW government selective high schools in Year 7. It tests reading, mathematical reasoning, thinking skills, and writing.",
  },
  {
    question: "When should my child start Selective preparation?",
    answer:
      "Most successful students begin preparation in Year 4 or early Year 5. Earlier starts allow for deeper skill development and less pressure as the test approaches.",
  },
  {
    question: "What are the test components?",
    answer:
      "The test has four components: Reading (multiple-choice), Mathematical Reasoning (multiple-choice), Thinking Skills (multiple-choice), and Writing (one extended response). Total testing time is just under 3 hours.",
  },
  {
    question: "How competitive is entry?",
    answer:
      "Selective school placement is highly competitive, with some schools receiving over 10 applicants per place. Strategic preparation can make the difference between an offer and a disappointment.",
  },
  {
    question: "Do you offer mock selective tests?",
    answer:
      "Yes. Students sit full mock exams every 4-6 weeks, including a comprehensive mid-program diagnostic and a final benchmark test. All tests are marked with detailed written feedback.",
  },
  {
    question: "What is the cost of the Selective program?",
    answer:
      "Our Selective program is $560 per term (10 weeks). This includes weekly 2-hour sessions, all materials, mock tests, and detailed progress reports. Holiday intensives are available separately.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Selective School Test Preparation | Year 6 Tutoring",
  description:
    "Selective High School placement test preparation for Year 6 students across Western Sydney. Master thinking skills, mathematical reasoning, reading and writing. Book an assessment.",
  path: "/marketing/selective-preparation",
  keywords: [
    "selective school preparation",
    "selective test tutoring",
    "selective high school placement test",
    "Year 6 selective tutoring",
    "selective school Western Sydney",
  ],
});

export default function SelectivePreparationPage() {
  return (
    <main>
      <JsonLd
        data={courseSchema({
          name: "Selective High School Test Preparation",
          description:
            "Year 6 Selective High School placement test preparation covering thinking skills, mathematical reasoning, reading and writing.",
          path: "/marketing/selective-preparation",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/marketing/programs" },
          { name: "Selective Preparation", path: "/marketing/selective-preparation" },
        ])}
      />
      <PageHeader
        title="Selective Preparation"
        description="Your child&apos;s journey to a selective high school placement starts here. Our proven program delivers the academic rigour, strategic insight, and personal support needed to succeed."
      />

      {/* What is the Selective Test? */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="navy" size="md" className="mb-4">
              Selective High Schools
            </Badge>
            <SectionTitle>What Is the Selective Test?</SectionTitle>
            <SectionSubtitle className="max-w-none">
              The Selective High School Placement Test is NSW&apos;s most competitive academic assessment.
            </SectionSubtitle>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Held annually for entry into Year 7 at NSW government selective high schools, the test assesses
                reading, mathematical reasoning, thinking skills, and written expression. With some schools receiving
                over 2,000 applications for fewer than 200 places, competition is fierce.
              </p>
              <p>
                Success demands more than natural ability — it requires strategic preparation, consistent practice, and
                the guidance of expert tutors who understand the test intimately. At Success at School, we have built
                a program that consistently delivers outstanding results.
              </p>
              <p>
                Placement and applications are managed by the{" "}
                <a
                  href="https://education.nsw.gov.au/public-schools/selective-high-schools-and-opportunity-classes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
                >
                  NSW Department of Education
                </a>
                , with the test itself set against the{" "}
                <a
                  href="https://educationstandards.nsw.edu.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
                >
                  NSW Education Standards Authority
                </a>{" "}
                curriculum.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Reading
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
                Writing
              </div>
            </div>
          </div>

          {/* Success Stats Card */}
          <Card padding="lg" className="border-navy-200 border-2 bg-navy-50/50">
            <Badge variant="navy" size="md" className="mb-4">
              Our Track Record
            </Badge>
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Results That Speak</h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-navy-900">{stat.value}</div>
                  <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-navy-200">
              <Link href="/enrol">
                <Button variant="primary" size="lg" className="w-full">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* Our Selective Program Features */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="navy" size="md" className="mb-4">
            How We Build Selectives Success
          </Badge>
          <SectionTitle>Our Selective Program</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Every component of our program is engineered to maximise performance on test day.
          </SectionSubtitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} hover padding="lg">
              <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-navy-700" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Success Stats Full */}
      <Section background="navy">
        <div className="text-center mb-12">
          <Badge variant="gold" size="md" className="mb-4 text-navy-900">
            Proven Excellence
          </Badge>
          <SectionTitle className="text-white">Why Families Trust Us</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Our results are built on a methodology that combines academic excellence with genuine care.
          </SectionSubtitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">94%</div>
            <p className="text-navy-200 text-sm">Offer success rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">2,500+</div>
            <p className="text-navy-200 text-sm">Students prepared</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">98%</div>
            <p className="text-navy-200 text-sm">Parent satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">12+</div>
            <p className="text-navy-200 text-sm">Years of expertise</p>
          </div>
        </div>
      </Section>

      {/* Program Structure */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="gold" size="md" className="mb-4">
            Program Structure
          </Badge>
          <SectionTitle>Built for Success</SectionTitle>
          <SectionSubtitle className="mx-auto">
            A comprehensive program that leaves no stone unturned.
          </SectionSubtitle>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card padding="lg" className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-primary-600">1</span>
            </div>
            <div>
              <h3 className="font-bold text-navy-900">Diagnostic Assessment</h3>
              <p className="text-sm text-text-secondary mt-1">
                We start with a comprehensive diagnostic to establish baseline performance across all four test domains
                and create a personalised study plan.
              </p>
            </div>
          </Card>
          <Card padding="lg" className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-primary-600">2</span>
            </div>
            <div>
              <h3 className="font-bold text-navy-900">Weekly Mastery Sessions</h3>
              <p className="text-sm text-text-secondary mt-1">
                Two-hour weekly sessions rotate through all test domains, with each subject taught by a specialist
                tutor who understands the content and the exam.
              </p>
            </div>
          </Card>
          <Card padding="lg" className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-primary-600">3</span>
            </div>
            <div>
              <h3 className="font-bold text-navy-900">Mock Test Cycle</h3>
              <p className="text-sm text-text-secondary mt-1">
                Regular full-length mock tests with detailed performance analytics. Each test is followed by a
                feedback session that turns mistakes into learning opportunities.
              </p>
            </div>
          </Card>
          <Card padding="lg" className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-primary-600">4</span>
            </div>
            <div>
              <h3 className="font-bold text-navy-900">Final Sprint &amp; Exam Readiness</h3>
              <p className="text-sm text-text-secondary mt-1">
                In the final weeks, we intensify focus on exam strategy, confidence building, and peak performance.
                Students enter test day fully prepared and calm.
              </p>
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
          <SectionTitle>Selective Program FAQs</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Everything you need to know about our Selective Preparation program.
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
            <Award className="h-8 w-8 text-gold-400" />
          </div>
          <SectionTitle className="text-white">Secure Your Child&apos;s Future</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Selective placement is life-changing. Let us help your child earn their spot.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                Enrol Now
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="secondary" size="lg">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
