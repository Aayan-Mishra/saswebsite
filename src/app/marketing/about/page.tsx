import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Heart,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Shield,
  Award,
} from "lucide-react";

const teamMembers = [
  {
    name: "Lisa Duong",
    role: "Founder & Head of Curriculum",
    initials: "LD",
    color: "bg-primary-100 text-primary-700",
  },
  {
    name: "James Chen",
    role: "Director of Operations",
    initials: "JC",
    color: "bg-gold-100 text-gold-800",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Mathematics",
    initials: "ER",
    color: "bg-secondary-100 text-secondary-700",
  },
  {
    name: "Michael Thompson",
    role: "Head of English & Writing",
    initials: "MT",
    color: "bg-navy-100 text-navy-800",
  },
  {
    name: "Priya Sharma",
    role: "Head of OC & Selective",
    initials: "PS",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "David Kim",
    role: "Head of Science & HSC",
    initials: "DK",
    color: "bg-primary-100 text-primary-700",
  },
];

const stats = [
  { value: "2,500+", label: "Students Taught", icon: GraduationCap },
  { value: "12+", label: "Years of Excellence", icon: Award },
  { value: "98%", label: "Parent Satisfaction", icon: Heart },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "50+", label: "Expert Tutors", icon: Users },
  { value: "3", label: "Campuses Across Sydney", icon: Shield },
];

const values = [
  {
    icon: Lightbulb,
    title: "Academic Rigour",
    description:
      "We hold students to high standards because we know they can rise to meet them. Every lesson is designed to stretch thinking and deepen understanding.",
  },
  {
    icon: Heart,
    title: "Genuine Care",
    description:
      "We invest in every student as an individual. Their confidence, wellbeing, and love of learning matter as much as their test scores.",
  },
  {
    icon: Target,
    title: "Results Orientation",
    description:
      "Everything we do is measured against one question: is this helping our students launch ahead? If not, we change it.",
  },
  {
    icon: Users,
    title: "Partnership with Families",
    description:
      "We believe education is a team effort. Regular communication, detailed progress reports, and open dialogue keep families fully in the loop.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "About Us | Western Sydney's OC & Selective Tutors",
  description:
    "Meet Success at School — specialist OC, NAPLAN and Selective tutors serving Plumpton, Hassall Grove and Quakers Hill. Our mission, approach and proven student results.",
  path: "/marketing/about",
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/marketing/about" },
        ])}
      />
      <PageHeader
        title="About Success at School"
        description="We exist to help students launch ahead — academically, confidently, and with a genuine love for learning. Here is our story."
      />

      {/* Our Story */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" size="md" className="mb-4">
              Our Story
            </Badge>
            <SectionTitle>Built from a Belief That Every Student Can Excel</SectionTitle>
            <SectionSubtitle className="max-w-none">
              Success at School was founded in 2003 by Lisa Duong, a classroom teacher who saw too many
              bright students fall through the cracks.
            </SectionSubtitle>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Lisa noticed that the students who thrived were not necessarily the most naturally gifted — they were
                the ones who had learned how to learn. They had strategies, they had confidence, and they had someone
                who believed in their potential.
              </p>
              <p>
                That insight became the foundation of Success at School. We built a tutoring model that combines
                academic rigour with genuine mentorship, small-group dynamics with personalised attention, and proven
                methodology with innovative teaching.
              </p>
              <p>
                Over a decade later, we have helped thousands of students achieve outcomes they once thought
                impossible — selective school placements, top-band NAPLAN results, HSC scores that open doors, and
                most importantly, a belief in their own ability.
              </p>
            </div>
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 md:p-12 text-white">
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
              &ldquo;Every student deserves to know what it feels like to be truly capable. Our job is not just to
              teach — it is to unlock that realisation.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center font-bold text-lg">
                LD
              </div>
              <div>
                <p className="font-semibold">Lisa Duong</p>
                <p className="text-sm text-navy-200">Founder, Success at School</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Mission */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="gold" size="md" className="mb-4">
            Our Mission
          </Badge>
          <SectionTitle>To Accelerate Every Student&apos;s Potential</SectionTitle>
          <SectionSubtitle className="mx-auto">
            We are on a mission to transform the way students experience academic support — from something they
            need to something they want.
          </SectionSubtitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} hover padding="lg" className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-7 w-7 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{value.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="primary">
        <div className="text-center mb-12">
          <Badge variant="gold" size="md" className="mb-4 text-navy-900">
            By the Numbers
          </Badge>
          <SectionTitle className="text-white">Our Impact</SectionTitle>
          <SectionSubtitle className="text-primary-100 mx-auto">
            The numbers tell a story of consistent, life-changing outcomes.
          </SectionSubtitle>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-gold-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-primary-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The Team */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="navy" size="md" className="mb-4">
            Meet the Team
          </Badge>
          <SectionTitle>The People Behind the Results</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Our tutors are more than teachers — they are mentors, motivators, and masters of their craft.
          </SectionSubtitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} hover padding="lg" className="text-center">
              <div
                className={`w-20 h-20 rounded-2xl ${member.color} flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}
              >
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-navy-900">{member.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{member.role}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-text-secondary mb-4">
            Our full team includes 50+ subject-specialist tutors across all key learning areas.
          </p>
          <Link href="/marketing/contact">
            <Button variant="outline" size="lg">
              Meet Our Full Team
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Our Approach */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" size="md" className="mb-4">
              Our Approach
            </Badge>
            <SectionTitle>How We Help Students Launch Ahead</SectionTitle>
            <SectionSubtitle className="max-w-none">
              Our methodology is built on three pillars: diagnostic precision, expert instruction, and continuous
              feedback.
            </SectionSubtitle>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">Diagnose First</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    We never guess. Every student starts with a comprehensive assessment that identifies strengths,
                    gaps, and learning style. This becomes the blueprint for their journey.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">Teach with Purpose</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Every lesson is intentional, structured, and engaging. Our tutors bring deep subject knowledge
                    and a genuine passion for teaching that inspires students to do their best.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">Measure and Adapt</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Progress is tracked weekly, with detailed reports sent to families. We adapt our approach based
                    on data, ensuring every minute of tuition delivers maximum impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card padding="lg" className="bg-navy-50 border-navy-100">
            <h3 className="text-xl font-bold text-navy-900 mb-4">The Success at School Difference</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Research-Backed Curriculum</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Every lesson is informed by the latest cognitive science and syllabus requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Small Class Guarantee</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Small classes ensure every child gets the attention they deserve.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Holistic Development</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    We build confidence, resilience, and a growth mindset alongside academic skills.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Family Partnership</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Weekly updates, parent portals, and open communication keep everyone aligned.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle className="text-white">Ready to Join the Success at School Community?</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Whether you are exploring options or ready to enrol, we would love to meet you and your child.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                Book a Free Assessment
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
